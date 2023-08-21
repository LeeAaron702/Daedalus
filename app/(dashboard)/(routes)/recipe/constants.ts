import * as z from "zod";

export const formSchema = z.object({
    hungerFor: z.string().min(1, {
        message: "Please specify what you're hungry for"
    }),
    allergies: z.string().optional(),
});
