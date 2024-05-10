import { getPostsByUser } from "@/actions/post";
import { PostComponent } from "./post";
import { PostInterface } from "./types";
import { getUserNome } from "@/actions/user";
import { currentUser } from "@clerk/nextjs/server";

import Link from "next/link";

export const MeusComponent = async () => {
  const user = await currentUser();

  const userNome = await getUserNome(user?.id as string);

  const myPosts = (await getPostsByUser(user?.id as string)) as PostInterface[];

  return (
    <div className="my-6 flex flex-col gap-y-4 w-full mx-12 md:mx-44">
      <div className="w-full flex justify-end underline-offset-4 hover:text-slate-600 transition-all">
        <Link className="underline" href={"/criar-post"}>
          + Novo Post
        </Link>
      </div>
      {myPosts?.map((post) => {
        return (
          <div key={post.id}>
            <PostComponent
              id={post.id}
              authorId={post.authorId}
              isEditable
              body={post.body}
              title={post.title}
              contact={post.contact}
              date={post.date}
              nome={userNome as string}
            />
          </div>
        );
      })}
    </div>
  );
};
