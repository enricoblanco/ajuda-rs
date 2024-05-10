import * as z from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  body: z.string().min(1, { message: "Content is required" }),
  contact: z.string().min(1, { message: "Contact is required" }),
});
