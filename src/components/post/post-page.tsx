import {
  getAllPedidos,
  getAllServicos,
  searchPedidos,
  searchServicos,
} from "@/actions/post";
import { getUserById } from "@/actions/user";
import { PostComponent } from "@/components/post";
import { Procurar } from "@/components/procurar/procruar";
import { Key } from "react";

interface PostInterface {
  id: Key;
  body: string;
  title: string;
  contact: string;
  date: Date;
  authorId: string;
}

export const PostPageComponent = async ({
  searchParams,
  tipo,
}: {
  searchParams: { search: string };
  tipo: "pedidos" | "servicos";
}) => {
  const getUserName = async (id: string) => {
    const user = await getUserById(id);
    return user?.name as string;
  };

  const searchFunc = async (search: string, tipo: string) => {
    if (tipo === "pedidos") {
      const pedidos = await getAllPedidos();
      if (search === "" || search === undefined) {
        return pedidos as PostInterface[];
      }
      const posts = await searchPedidos(search);
      return posts as PostInterface[];
    } else {
      const servicos = await getAllServicos();
      if (search === "" || search === undefined) {
        return servicos as PostInterface[];
      }
      const posts = await searchServicos(search);
      return posts as PostInterface[];
    }
  };

  const { search } = searchParams;

  const searched = await searchFunc(search, tipo);

  return (
    <div className="my-6 flex flex-col gap-y-4 w-full">
      <Procurar tipo={tipo} />
      {searched?.map((post) => {
        return (
          <div className="mx-12 md:mx-44" key={post.id}>
            <PostComponent
              body={post.body}
              title={post.title}
              contact={post.contact}
              date={post.date}
              nome={getUserName(post.authorId) as unknown as string}
            />
          </div>
        );
      })}
    </div>
  );
};
