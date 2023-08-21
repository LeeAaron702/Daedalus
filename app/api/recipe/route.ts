import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { hungerFor, allergies } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }
    if (!hungerFor) {
      return new NextResponse("Please specify what you're hungry for", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired", { status: 403 });
    }

    // Construct a prompt for OpenAI to generate a tailored 5-star Michelin recipe.
    const completeRecipePrompt = `You are a 5-star Michelin chef. 
    Given someone's cravings and their allergies, suggest a gourmet recipe that will satisfy their craving while ensuring it's safe for them to eat.
    Please create both a grocery shopping list and recipes. 
    !IMPORTANT Data is formatted using ReactMarkdown 
    Please format the response accordingly so that the title of the Recipe shows as a heading, the Shopping List and Recipe instructions are in a bulleted or numbered list.
    Please provide all temperatures and measurement units for USA`;

    const response = await openai.createChatCompletion({
      messages: [
        { 
          role: "system", 
          content: completeRecipePrompt,
        },
        {
          role: 'user',
          content: `I'm craving: ${hungerFor}. Allergies: ${allergies ? allergies : "None"}. Please suggest a gourmet recipe and shopping list for all the items.`,
        },
      ],
      model: "gpt-4",
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    if (!response.data || !response.data.choices || response.data.choices.length === 0 || !response.data.choices[0].message) {
      throw new Error("Invalid response from OpenAI");
    }

    const recipe = response.data.choices[0].message.content;

    return NextResponse.json({ recipe });
  } catch (error) {
    console.log("[RECIPE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
