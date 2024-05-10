"use client";

import { getUserRole } from "@/actions/user";
import { useEffect, useState } from "react";

export const useUserRole = (userClerkId: string) => {
  const [role, setRole] = useState();

  useEffect(() => {
    const fetchRole = async () => {
      const role = await getUserRole(userClerkId);
      setRole(role as any);
    };

    fetchRole();
  }, [userClerkId]);

  return { role };
};
