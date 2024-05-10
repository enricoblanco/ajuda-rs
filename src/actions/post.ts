'use server'

import { db } from "@/lib/db";
import { getUserByClerkId } from "./user";
import { CreatePostSchema } from "@/schemas";
import { z } from "zod";
import { Role } from "@prisma/client";

export const createPost = async (values: z.infer<typeof CreatePostSchema>, clerkId: string) => {
  const validatedFields = CreatePostSchema.safeParse(values)
  if (!validatedFields.success) {
    return {
      errors: 'Invalid fields'
    }
  }

    const { title, body, contact } = validatedFields.data

    const user = await getUserByClerkId(clerkId);

    if (!user) {
      return {error: "Usuário não encontrado"};
    }

    await db.post.create({
      data: {
        title,
        body,
        contact,
        authorId: user.id,
        role: user.role as Role
      }
    })

    return {
      success: 'Post criado com sucesso'
    }

}

export async function getPostByUserRole(clerkId: string) {
  try {
    await db.$connect()
    const user = await getUserByClerkId(clerkId)


    if(!user) {
      return({error: 'Usuário não encontrado'})
    }

    const posts = db.post.findMany({
      where:{
        NOT:{
          role: user.role as Role
        }
      }
    })


    return posts
    
  } catch (err) {
      console.error(err)
  }
}

export const getAllPosts = async () => {
  try {
    await db.$connect()
    const posts = await db.post.findMany()
    return posts
  } catch (err) {
    console.error(err)
  }
}