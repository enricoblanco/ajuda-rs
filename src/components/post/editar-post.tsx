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
import { UpdatePostSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../ui/card";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { useUser } from "@clerk/nextjs";
import { createPost, updatePost } from "@/actions/post";
import { useRouter } from "next/navigation";

interface EditarPostFormProps {
  title: string;
  body: string;
  contact: string;
  onVoltar: () => void;
  postId: string;
}

export const EditarPostForm = ({
  title,
  body,
  contact,
  onVoltar,
  postId,
}: EditarPostFormProps) => {
  const { user } = useUser();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSucces] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof UpdatePostSchema>>({
    resolver: zodResolver(UpdatePostSchema),
    defaultValues: {
      title: title,
      body: body,
      contact: contact,
    },
  });

  const onSubmit = (values: z.infer<typeof UpdatePostSchema>) => {
    setError("");
    setSucces("");

    startTransition(() => {
      updatePost(postId, user?.id as string, values).then((data) => {
        setError(data.error);
        setSucces(data.success);
      });
    });
  };

  return (
    <Card className="shadow-md py-4">
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
                    <FormControl>
                      <Input
                        className="text-xs"
                        disabled={isPending}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
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
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        className="text-xs pb-20 pt-4 md:pb-32"
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
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        className="text-xs"
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
            <div className="flex flex-row gap-x-4">
              <Button
                onClick={onVoltar}
                disabled={isPending}
                className="w-full my-4"
              >
                Voltar
              </Button>
              <Button
                disabled={isPending}
                className="w-full my-4"
                type="submit"
              >
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
