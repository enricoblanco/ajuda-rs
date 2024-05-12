"use client";

import { convertDateToBr } from "@/functions/convertDateToBr";
import { Card, CardContent, CardFooter } from "../ui/card";
import { telMask } from "@/functions/telMask";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { EditarPostForm } from "./editar-post";
import { deletePost } from "@/actions/post";
import { useRouter } from "next/navigation";

interface PostProps {
  id?: string;
  title: string;
  body: string;
  contact: string;
  nome: string;
  date: Date;
  isEditable?: boolean;
  authorId?: string;
}

export const PostComponent = ({
  title,
  body,
  contact,
  date,
  nome,
  isEditable,
  id,
  authorId,
}: PostProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  return isEditing ? (
    <EditarPostForm
      postId={id as string}
      onVoltar={() => {
        router.refresh();
        setIsEditing(false);
      }}
      title={title}
      body={body}
      contact={contact}
    />
  ) : (
    <Card className="w-full shadow-md">
      <CardContent className="">
        <div className="flex flex-col gap-y-4 text-left py-2">
          <div className="flex flex-col gap-y-1">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <span className="text-xs">Por: {nome}</span>
          </div>
          <div className="text-sm break-words w-full text-justify">{body}</div>
          <div className="flex flex-col gap-y-4 md:gap-x-4 md:flex-row">
            <div>
              <p className="text-sm">Contato: {telMask(contact)}</p>
            </div>
            <div>
              <p className="text-sm">
                Data: {convertDateToBr(date.toString())}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      {isEditable && (
        <CardFooter className="flex flex-row gap-x-3 w-full justify-end">
          <Pencil2Icon
            onClick={() => {
              setIsEditing(true);
            }}
            width={"18"}
            height={"18"}
            className="cursor-pointer hover:text-slate-600 transition-all"
          />
          <TrashIcon
            onClick={() => {
              deletePost(id as string, authorId as string);
              router.refresh();
            }}
            width={"18"}
            height={"18"}
            className="cursor-pointer hover:text-slate-600 transition-all"
          />
        </CardFooter>
      )}
    </Card>
  );
};
