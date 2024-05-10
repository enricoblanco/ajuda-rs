"use client";

import { setUserRole } from "@/actions/user";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SelecionePerfil = () => {
  const user = useUser();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  return (
    <Card className="shadow-md mx-4">
      <CardContent>
        <div className="flex flex-col gap-y-4">
          <h1 className="text-2xl font-semibold">Selecione seu perfil</h1>
          <div className="flex flex-row gap-x-4">
            <div className="flex flex-col">
              <Button
                onClick={() =>
                  setUserRole(user.user?.id as string, Role.AJUDANTE).then(
                    (res) => {
                      if (res.error) {
                        setError(res.error);
                      } else {
                        router.push("/criar-post");
                      }
                    }
                  )
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
                  setUserRole(user.user?.id as string, Role.AJUDADO).then(
                    (res) => {
                      if (res.error) {
                        setError(res.error);
                      } else {
                        router.push("/criar-post");
                      }
                    }
                  )
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
      <CardFooter>
        <div className="flex justify-center text-xs text-red-500 w-full">
          {error}
        </div>
      </CardFooter>
    </Card>
  );
};
