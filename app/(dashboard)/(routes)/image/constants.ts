import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Image prompt is required",
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const amountOptions = [
  {
    value: "1",
    label: "1 Photo",
  },
  {
    value: "2",
    label: "2 Photos",
  },
  {
    value: "3",
    label: "3 Photos",
  },
  {
    value: "4",
    label: "4 Photos",
  },
  {
    value: "5",
    label: "5 Photos",
  }
];

export const resolutionOptions = [
    {
        value: "256x256",
        label: "256 x 256",
    },
    {
        value: "512x512",
        label: "512 x 512",
    },
    {
        value: "1024x1024",
        label: "1024 x 1024",
    },
    {
        value: "3840x2160",
        label: "4K",
    }
]