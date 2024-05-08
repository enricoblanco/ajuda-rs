"use client";

import { setUserRole } from "@/actions/user";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";

export const SelecionePerfil = () => {
  const user = useUser();
  return (
    <Card className="shadow-md mx-4">
      <CardContent>
        <div className="flex flex-col gap-y-4">
          <h1 className="text-2xl font-semibold">Selecione seu perfil</h1>
          <div className="flex flex-row gap-x-4">
            <div className="flex flex-col">
              <Button
                onClick={() =>
                  setUserRole(user.user?.id as string, Role.AJUDANTE)
                }
                className="text-lg font-semibold"
              >
                Quero ajudar
              </Button>
              <p className="text-xs">Quero ajudar prestando algum serviço</p>
            </div>
            <div className="flex flex-col">
              <Button
                onClick={() =>
                  setUserRole(user.user?.id as string, Role.AJUDADO)
                }
                className="text-lg font-semibold"
              >
                Preciso de ajuda
              </Button>
              <p className="text-xs">Preciso de algum serviço</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  );
};
