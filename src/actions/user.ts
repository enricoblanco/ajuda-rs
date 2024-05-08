'use server'


import { db } from '@/lib/db'
import { Role } from '@prisma/client'

export async function createUser(user: any) {
  try {
    await db.$connect()
    const newUser = await db.user.create({
        data: {
            clerkId: user.clerkId,
            email: user.email
        }
    })
    return JSON.parse(JSON.stringify(newUser))
    
  } catch (err) {
      console.error(err)
  }

}

export async function getUserById(userId: string) {
  try {
    await db.$connect()
    const user = await db.user.findUnique({
        where: {
            id: userId
        }
    })
    return JSON.parse(JSON.stringify(user))
    
  } catch (err) {
      console.error(err)
  }
}

export async function getUserByClerkId(clerkId: string) {
  try {
    await db.$connect()
    const user = await db.user.findUnique({
        where: {
            clerkId: clerkId
        }
    })
    return user
    
  } catch (err) {
      console.error(err)
  }
}

export const setUserRole = async (clerkId: string, role: Role) => {
  try {
    await db.$connect();
    const user = await getUserByClerkId(clerkId);

    if (!user) {
      return {error: "Usuário não encontrado"};
    }


    if (user.role) {
      return {error: "Usuário já possui um perfil"};
    }

    await db.user.update({
      where: {
        clerkId: clerkId,
      },
      data: {
        role: role,
      },
    });

    return {success: "Usuário atualizado com sucesso"};
    
  } catch (error) {
    throw new Error("Erro ao atualizar usuário: " + error);
  }
}
