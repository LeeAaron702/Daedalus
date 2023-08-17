import * as z from "zod";

export const formSchema = z.object({
    resume: z.string().min(1, {
        message: "Resume is required"
    }),
    jobDescription: z.string().min(1, {
        message: "Job Description is required"
    })
});
