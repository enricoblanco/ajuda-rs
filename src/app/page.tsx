import { getAllPosts, getAllPostsNumber, getPosts } from "@/actions/post";
import { getUserByClerkId, getUserById } from "@/actions/user";
import { PaginationComponent } from "@/components/pagination/pagination";
import { PostComponent } from "@/components/post";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function Home() {
  const posts = await getPosts(0, 10);
  const totalPosts = await getAllPostsNumber();
  const userClerk = await currentUser();
  const user = await getUserByClerkId(userClerk?.id as string);

  const getUserName = async (id: string) => {
    const user = await getUserById(id);
    return user?.name as string;
  };

  return (
    <div className="my-6 flex flex-col gap-y-6 w-full pb-12">
      <div className="flex flex-col text-middle md:text-left mx-12 md:mx-48 font-bold">
        <div className="flex flex-row justify-center items-center md:justify-start gap-x-2">
          <div className="text-xl">AjudaRS</div>
          <Image
            alt="Bandeira do Rio Grande do Sul"
            src="/svg/rsflagSVG.svg"
            width={20}
            height={40}
          />
        </div>
        <div className="text-sm font-normal">
          AjudaRS conecta pessoas afetadas por enchentes no RS a voluntários
          dispostos a ajudar gratuitamente.
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        {posts?.map((post) => (
          <div className="mx-12 md:mx-44" key={post.id}>
            <PostComponent
              body={post.body}
              title={post.title}
              contact={post.contact}
              date={post.date}
              id={post.id}
              authorId={post.authorId}
              nome={getUserName(post.authorId) as unknown as string}
              isEditable={user?.id === post.authorId}
            />
          </div>
        ))}
        <div className="flex absolute bottom-6 w-full justify-center">
          <PaginationComponent
            totalPosts={totalPosts as number}
            page="posts"
            currentPage={"1"}
          />
        </div>
      </div>
    </div>
  );
}
