"use client";

import { setUserRole } from "@/actions/user";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const SelecionePerfil = () => {
  const user = useUser();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  return (
    <Card className="shadow-md md:mx-44 mx-12 py-4">
      <CardContent>
        <div className="flex flex-col gap-y-8">
          <h1 className="text-2xl font-semibold">Selecione seu perfil</h1>
          <div className="flex flex-col gap-y-4 justify-center">
            <button
              onClick={() => {
                setLoading(true);
                setUserRole(user.user?.id as string, Role.AJUDANTE).then(
                  (res) => {
                    if (res.error) {
                      setError(res.error);
                      setLoading(false);
                    } else {
                      setLoading(false);
                      window.location.replace("/criar-post");
                    }
                  }
                );
              }}
              className="flex flex-col bg-slate-800 text-white md:mx-64 py-4 hover:bg-slate-600 rounded-lg transition-all text-center justify-center"
            >
              {loading ? (
                <div className="flex justify-center w-full">
                  <ClipLoader color="#FFF" />
                </div>
              ) : (
                <>
                  <div className="text-lg font-semibold flex flex-col gap-y-2 w-full">
                    Quero ajudar
                  </div>
                  <div className="text-xs w-full">
                    Quero ajudar prestando algum serviço
                  </div>
                </>
              )}
            </button>
            <hr />
            <button
              onClick={() => {
                setLoading(true);
                setUserRole(user.user?.id as string, Role.AJUDADO).then(
                  (res) => {
                    if (res.error) {
                      setError(res.error);
                      setLoading(false);
                    } else {
                      setLoading(false);
                      window.location.replace("/criar-post");
                    }
                  }
                );
              }}
              className="flex flex-col bg-slate-800 text-white md:mx-64 py-4 hover:bg-slate-600 rounded-lg transition-all"
            >
              {loading ? (
                <div className="flex justify-center w-full">
                  <ClipLoader color="#FFF" />
                </div>
              ) : (
                <>
                  <div className="text-lg font-semibold w-full">
                    Preciso de ajuda
                  </div>
                  <div className="text-xs w-full">Preciso de algum serviço</div>
                </>
              )}
            </button>
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
