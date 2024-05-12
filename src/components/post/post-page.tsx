import {
  getAllPostsNumber,
  getPedidos,
  getServicos,
  searchPedidos,
  searchServicos,
} from "@/actions/post";
import { getUserByClerkId, getUserById } from "@/actions/user";
import { PostComponent } from "@/components/post";
import { Procurar } from "@/components/procurar/procruar";
import { PostInterface } from "./types";
import { PaginationComponent } from "../pagination/pagination";
import { currentUser } from "@clerk/nextjs/server";

export const PostPageComponent = async ({
  searchParams,
  tipo,
}: {
  searchParams: { search: string; page: string };
  tipo: "pedidos" | "servicos";
}) => {
  const userClerk = await currentUser();
  const user = await getUserByClerkId(userClerk?.id as string);

  const getUserName = async (id: string) => {
    const user = await getUserById(id);
    return user?.name as string;
  };

  const searchFunc = async (search: string, tipo: string) => {
    if (tipo === "pedidos") {
      const pedidos = await getPedidos((parseInt(page) - 1) * 10, 10);
      if (search === "" || search === undefined) {
        return pedidos as PostInterface[];
      }
      const posts = await searchPedidos(search);
      return posts as PostInterface[];
    } else {
      const servicos = await getServicos((parseInt(page) - 1) * 10, 10);
      if (search === "" || search === undefined) {
        return servicos as PostInterface[];
      }
      const posts = await searchServicos(search);
      return posts as PostInterface[];
    }
  };

  const { search, page } = searchParams;

  const searched = await searchFunc(search, tipo);

  const postsNumber = await getAllPostsNumber();

  return (
    <>
      <Procurar tipo={tipo} />
      <div className="flex flex-col gap-y-4">
        {searched?.map((post) => {
          return (
            <div className="mx-12 md:mx-44" key={post.id}>
              <PostComponent
                isEditable={user?.id === post.authorId}
                body={post.body}
                title={post.title}
                contact={post.contact}
                date={post.date}
                nome={getUserName(post.authorId) as unknown as string}
              />
            </div>
          );
        })}
        {search === undefined && (
          <div className="flex absolute bottom-6 w-full justify-center">
            <PaginationComponent
              totalPosts={postsNumber as number}
              page={`posts/${tipo}`}
              currentPage={page}
            />
          </div>
        )}
      </div>
    </>
  );
};
