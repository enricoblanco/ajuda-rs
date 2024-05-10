"use client";

import { getUserNome } from "@/actions/user";
import { useEffect, useState } from "react";

export const useUserName = (userClerkId: string) => {
  const [nome, setnome] = useState();

  useEffect(() => {
    const fetchnome = async () => {
      const nome = await getUserNome(userClerkId);
      setnome(nome as any);
    };

    fetchnome();
  }, [userClerkId]);

  return { nome };
};
