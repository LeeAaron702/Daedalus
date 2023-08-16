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
    const { resume, jobDescription } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }
    if (!resume) {
      return new NextResponse("Resume is required", { status: 400 });
    }
    if (!jobDescription) {
      return new NextResponse("Job Description is required", { status: 400 });
    }
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired", { status: 403 });
    }

    // Construct a prompt for OpenAI to generate a tailored cover letter.
    const prompt = `
    Given the resume details and the job description, generate a 3-paragraph cover letter suitable for a job application. 
    Carefully review the resume and timelines on the resume. When writing the cover letter you must only include what is on the resume and you cannot make up information or create assumptions
    that is not on the resume.

Resume:
${resume}

Job Description:
${jobDescription}

---

Dear Hiring Manager

[Paragraph 1: Introduction and expressing interest in the position.]

[Paragraph 2: Highlighting specific qualifications from the resume that match the job description and why they make you a great fit for the job.]

[Paragraph 3: Expressing enthusiasm, any additional relevant information, and closing remarks.]

Sincerely,
[Your Name]

`;

    // const response = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: prompt,
    //   max_tokens: 500, // You can adjust this value based on your needs.
    //   temperature: .8,
    // });
    const response = await openai.createChatCompletion({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-4",
    });
  

    if (!isPro) {
      await increaseApiLimit();
    }
    
    if (!response.data || !response.data.choices || response.data.choices.length === 0 || !response.data.choices[0].message) {
      throw new Error("Invalid response from OpenAI");
    }
    
    const coverLetter = response.data.choices[0].message.content;
    


    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.log("[COVER_LETTER_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
