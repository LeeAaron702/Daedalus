"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import * as z from "zod";
import { BookOpen, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { Input } from "@/components/ui/input";

import { formSchema } from "./constants";
import { useProModal } from "@/hooks/use-pro-modal";
import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const RecipeGeneratorPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [generatedRecipe, setGeneratedRecipe] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hungerFor: "",
      allergies: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/recipe", values);
      setGeneratedRecipe(response.data.recipe);
      toast.success("Recipe generated successfully!");
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="5-Star Michelin Recipe Generator"
        description="Experience the pinnacle of gastronomy with our 5-star Michelin recipe generator."
        icon={BookOpen}
        iconColor="text-yellow-700"
        bgColor="bg-orange-700/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm"
          >
            <h1 className="mb-2 text-lg">What are you hungry for?</h1>
            <FormField
              name="hungerFor"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <Input
                      className="text-md border focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="e.g. 'chocolate', 'seafood', 'beef'"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <label className="mb-2 text-lg">Any allergies?</label>

            <FormField
              name="allergies"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <Input
                      className="text-md border focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="e.g. 'nuts', 'shellfish', 'dairy'"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={isLoading}>Generate Recipe</Button>
          </form>
        </Form>
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader />
          </div>
        )}
      </div>
      <div className="px-4 lg:px-8">
        <div className="p-8 pb-3 mt-8 border rounded-lg">
          <h3 className="text-xl font-bold mb-4">Generated Recipe:</h3>
          <ReactMarkdown>{generatedRecipe}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default RecipeGeneratorPage;
