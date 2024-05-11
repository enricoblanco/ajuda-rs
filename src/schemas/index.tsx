import * as z from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório" }),
  body: z.string().min(1, { message: "Descrição é obrigatório" }),
  contact: z
    .string()
    .min(11, { message: "Telefone é obrigatório" })
    .max(13, { message: "Telefone inválido (Máx. 13 dígitos)" }),
});

export const UpdatePostSchema = z.object({
  title: z.string().min(1, { message: "Título é obrigatório" }),
  body: z.string().min(1, { message: "Descrição é obrigatório" }),
  contact: z
    .string()
    .min(11, { message: "Telefone inválido (Mín. 11 dígitos)" })
    .max(13, { message: "Telefone inválido (Máx. 13 dígitos)" }),
});
