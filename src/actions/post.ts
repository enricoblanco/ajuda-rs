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

export const getAllPedidos = async () => {
  try {
    await db.$connect()
    const posts = await db.post.findMany({
      where: {
        role: Role.AJUDADO
      }
    })
    return posts
  } catch (err) {
    console.error(err)
  }
}

export const getAllServicos = async () => {
  try {
    await db.$connect()
    const posts = await db.post.findMany({
      where: {
        role: Role.AJUDANTE
      }
    })
    return posts
  } catch (err) {
    console.error(err)
  }
}

export const searchServicos = async (search: string) => {
  try {
    await db.$connect()
    const posts = await db.post.findMany({
      where: {
        role: Role.AJUDANTE,
        OR: [
          {
            title: {
              contains: search
            }
          },
          {
            body: {
              contains: search
            }
          }
        ]
      }
    })
    return posts
  } catch (err) {
    console.error(err)
  }
}
export const searchPedidos = async (search: string) => {
  try {
    await db.$connect();
    const posts = await getAllPedidos();

    if (!posts || posts.length === 0) { // Verifica se não há posts ou se o array de posts está vazio
      return [{ error: 'Nenhum pedido encontrado' }]; // Retorna um array com um objeto de erro
    }

    // Filtra os posts cujo título ou corpo contenham a string de pesquisa (ignorando maiúsculas e minúsculas)
    const filteredPosts = posts.filter(post => 
      post.title.toLowerCase().includes(search.toLowerCase()) || 
      post.body.toLowerCase().includes(search.toLowerCase())
    );

    return filteredPosts; // Retorna os posts filtrados
  } catch (err) {
    console.error(err);
    return [{ error: 'Erro ao buscar pedidos' }]; // Retorna um array com um objeto de erro em caso de falha
  }
};
