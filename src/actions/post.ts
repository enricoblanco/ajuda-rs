'use server'

import { db } from "@/lib/db";
import { getUserByClerkId, getUserById } from "./user";
import { CreatePostSchema, UpdatePostSchema } from "@/schemas";
import { z } from "zod";
import { Role } from "@prisma/client";

export const createPost = async (values: z.infer<typeof CreatePostSchema>, clerkId: string) => {
  const validatedFields = CreatePostSchema.safeParse(values)
  if (!validatedFields.success) {
    return {
      errors: 'Campos inválidos'
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
    const posts = await db.post.findMany({
        orderBy: {
          date: 'desc'
        }
      }
    )
    return posts
  } catch (err) {
    console.error(err)
  }
}

export const getPosts = async (skip: number, take: number) => {
  try {
    await db.$connect()
    const posts = await db.post.findMany({
      skip: skip, 
      take: take,
        orderBy: {
          date: 'desc'
        }
      }
    )
    return posts
  } catch (err) {
    console.error(err)
  }
}

export const getPedidos = async ( skip: number, take: number ) => {
  try {
    await db.$connect()
    const posts = await db.post.findMany({
      skip: skip,
      take: take,
      orderBy: {
          date: 'desc'
        },
      where: {
        role: Role.AJUDADO
      }
    })
    return posts
  } catch (err) {
    console.error(err)
  }
}

export const getAllPedidos = async () => {
  try {
    await db.$connect()
    const posts = await db.post.findMany({
      orderBy: {
          date: 'desc'
        },
      where: {
        role: Role.AJUDADO
      }
    })
    return posts
  } catch (err) {
    console.error(err)
  }
}

export const getServicos = async (skip : number, take: number) => {
  try {
    await db.$connect()
    const posts = await db.post.findMany({
      skip: skip,
      take: take,
      orderBy: {
          date: 'desc'
        },
      where: {
        role: Role.AJUDANTE
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
      orderBy: {
          date: 'desc'
        },
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

    const posts = await getAllServicos();

    if(!posts || posts.length === 0) {
      return null
    }

      const filteredPosts = posts.filter(post => 
      post.title.toLowerCase().includes(search.toLowerCase()) || 
      post.body.toLowerCase().includes(search.toLowerCase())
    );

  
    return filteredPosts
  } catch (err) {
    console.error(err)
  }
}

export const searchPedidos = async (search: string) => {
  try {
    await db.$connect();
    const posts = await getAllPedidos();

    if (!posts || posts.length === 0) { // Verifica se não há posts 
      return null 
    }

    // Filtra os posts cujo título ou corpo contenham a string de pesquisa (ignorando maiúsculas e minúsculas)
    const filteredPosts = posts.filter(post => 
      post.title.toLowerCase().includes(search.toLowerCase()) || 
      post.body.toLowerCase().includes(search.toLowerCase())
    );

    return filteredPosts; // Retorna os posts filtrados
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getPostsByUser = async (clerkId: string) => {
  try {
    await db.$connect()
    const user = await getUserByClerkId(clerkId)

    if(!user) {
      return([{error: 'Usuário não encontrado'}])
    }

    const posts = db.post.findMany({
      where:{
        authorId: user.id
      }
    })

    return posts
    
  } catch (err) {
      console.error(err)
  }
}

export const deletePost = async (postId: string, userId: string) => {
  try {
    await db.$connect()
    const user = await getUserById(userId)

    if(!user) {
      return({error: 'Usuário não encontrado'})
    }

    const post = await db.post.findUnique({
      where: {
        id: postId
      }
    })

    if(!post) {
      return({error: 'Post não encontrado'})
    }

    if(post.authorId !== user.id) {
      return({error: 'Usuário não autorizado'})
    }

    await db.post.delete({
      where: {
        id: postId
      }
    })

    return({success: 'Post deletado com sucesso'})
    
  } catch (err) {
      console.error(err)
  }
}

const getPostById = async (postId: string) => {
  try {
    await db.$connect()
    const post = await db.post.findUnique({
      where: {
        id: postId
      }
    })
    return post
  } catch (err) {
    console.error(err)
  }
}

export const updatePost = async (postId: string, clerkId: string, values: z.infer<typeof UpdatePostSchema>) => {
  const validatedFields = CreatePostSchema.safeParse(values)
  if (!validatedFields.success) {
    return {
      errors: 'Campos inválidos'  }
  }

  const { title, body, contact } = validatedFields.data

  const post = await getPostById(postId)

  if(!post) {
    return({error: 'Post não encontrado'})
  }

  const user = await getUserByClerkId(clerkId);

    if (!user) {
      return {error: "Usuário não encontrado"};
    }

    await db.post.update({
      where: {
        id: postId
      },
      data: {
        title,
        body,
        contact,
        authorId: user.id,
        role: user.role as Role
      }
    })

    return {
      success: 'Post atualizado com sucesso'
    }

}

export const getAllPostsNumber = async () => {
  try {
    await db.$connect()
    const posts = await db.post.count()
    return posts
  } catch (err) {
    console.error(err)
  }
}

export const getServicosPostsNumber = async () => {
  try {
    await db.$connect()
    const posts = await db.post.count({
      where: {
        role: Role.AJUDANTE
      }
    })
    return posts
  } catch (err) {
    console.error(err)
  }
}

export const getPedidosPostsNumber = async () => {
  try {
    await db.$connect()
    const posts = await db.post.count({
      where: {
        role: Role.AJUDADO
      }
    })
    return posts
  } catch (err) {
    console.error(err)
  }
}
