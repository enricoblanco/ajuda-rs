"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface ProcurarProps {
  tipo: "servicos" | "pedidos";
}

export const Procurar = ({ tipo }: ProcurarProps) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  return (
    <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4 mx-16 md:mx-44">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Procurar"
      />
      <Button
        onClick={() => {
          router.push(`/posts/${tipo}?search=${search}`);
        }}
      >
        Procurar
      </Button>
    </div>
  );
};
