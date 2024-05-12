"use client";

import { useForm } from "react-hook-form";

import * as z from "zod";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
  Form,
} from "@/components/ui/form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { useUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { createPost } from "@/actions/post";
import { useRouter } from "next/navigation";

interface CriarPostFormProps {
  tipo: "AJUDANTE" | "AJUDADO";
}

export const CriarPostForm = ({ tipo }: CriarPostFormProps) => {
  const { user } = useUser();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSucces] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      body: "",
      contact: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CreatePostSchema>) => {
    setError("");
    setSucces("");

    startTransition(() => {
      createPost(values, user?.id as string).then((data) => {
        setError(data.error);
        setSucces(data.success);

        if (data.success) {
          form.reset();
          router.refresh();
        }
      });
    });
  };

  return (
    <Card className="shadow-md md:mx-44 mx-12 py-4">
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 md:text-left text-center">
              <FormField
                control={form.control}
                name="title"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {tipo === Role.AJUDANTE
                        ? "Serviço oferecido"
                        : "Serviço necessitado"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-xs"
                        disabled={isPending}
                        {...field}
                        placeholder="Título do anúncio"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {tipo === Role.AJUDANTE
                        ? "Decreva o seu serviço"
                        : "Decreva a sua necessidade"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        className="text-xs pb-20 pt-4 md:pb-32"
                        placeholder="Descreva seu serviço aqui"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact"
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contato</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        className="text-xs"
                        placeholder="(00) 00000-0000"
                        type="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} className="w-full my-4" type="submit">
              Criar anúncio
            </Button>
          </form>
        </Form>
      </CardContent>
      {tipo === Role.AJUDADO && (
        <CardFooter className="text-xs text-left flex flex-row gap-1 items-start">
          <div>*</div>
          <div>
            Lembre-se de excluir seu pedido quando sua necessidade for atendida.
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
