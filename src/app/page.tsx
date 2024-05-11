import { getAllPosts } from "@/actions/post";
import { getUserById } from "@/actions/user";
import { PostComponent } from "@/components/post";

export default async function Home() {
  const posts = await getAllPosts();

  const getUserName = async (id: string) => {
    const user = await getUserById(id);
    return user?.name as string;
  };
  return (
    <div className="my-6 flex flex-col gap-y-6 w-full">
      <div className="flex flex-col text-middle md:text-left mx-12 md:mx-48 font-bold">
        <div className="text-xl">AjudaRS</div>
        <div className="text-sm font-normal">
          AjudaRS conecta pessoas afetadas por enchentes no RS a voluntários
          dispostos a ajudar gratuitamente.
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        {posts
          ?.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          ) // Ordenar os posts por data
          .map((post) => {
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
    </div>
  );
}
