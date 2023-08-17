"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import * as z from "zod";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";

import { formSchema } from "./constants";

import { useState } from "react";

import { useProModal } from "@/hooks/use-pro-modal";

const ConverLetterGeneratorPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resume: "",
      jobDescription: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const downloadCoverLetter = () => {
    const fileName = `CoverLetter_${new Date()
      .toISOString()
      .slice(0, 10)}_${generatedCoverLetter.slice(0, 10)}.txt`;
    const blob = new Blob([generatedCoverLetter], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/cvg", values);
      setGeneratedCoverLetter(response.data.coverLetter);
      toast.success("Cover letter generated successfully!");
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

  const handleReset = () => {
    form.reset({
      jobDescription: "",
    });
    setGeneratedCoverLetter("");
  };

  const handleEditToggle = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  return (
    <div>
      <Heading
        title="Cover Letter Generator"
        description="Our most advanced cover letter generator utilizing GPT-4 and the latest in prompt engineering."
        icon={MessageSquare}
        iconColor="text-teal-300"
        bgColor="bg-teal-500/10"
      />
        <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm"
          >
            <FormField
              name="resume"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormControl>
                    <div>
                      <label className="block mb-2">Your Resume</label>
                      <textarea
                        className="resize-vertical border rounded-md p-2 w-full"
                        placeholder="Paste your resume here"
                        {...field}
                        rows={10}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="jobDescription"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormControl>
                    <div>
                      <label className="block mb-2">Job Description</label>
                      <textarea
                        className="resize-vertical border rounded-md p-2 w-full"
                        placeholder="Paste the job description here"
                        {...field}
                        rows={10}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={isLoading}>Generate Cover Letter</Button>
            <Button
              type="button"
              className="bg-red-500 hover:bg-red-600 ml-5"
              onClick={handleReset}
            >
              Reset
            </Button>
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
          <h3 className="text-xl font-bold mb-4">Generated Cover Letter:</h3>
          {isEditing ? ( // If in edit mode, show the textarea
            <textarea
              className="resize-vertical border rounded-md p-2 w-full bg-gray-100"
              value={generatedCoverLetter}
              onChange={(e) => setGeneratedCoverLetter(e.target.value)}
              rows={15}
            />
          ) : (
            // If not in edit mode, show the preformatted cover letter
            <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-md border">
              {generatedCoverLetter}
            </pre>
          )}
          <div className="flex justify-start mt-2">
            <Button onClick={handleEditToggle}>
              {isEditing ? "Cancel" : "Edit Cover Letter"}
            </Button>
            {isEditing && (
              <Button
                onClick={handleEditToggle}
                className="bg-green-500 hover:bg-green-600 ml-4"
              >
                Save
              </Button>
            )}
            <Button
              onClick={downloadCoverLetter}
              className="bg-blue-500 hover:bg-blue-600 ml-4"
            >
              Download Cover Letter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConverLetterGeneratorPage;