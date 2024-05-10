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
    <div className="mt-6 flex flex-col gap-y-4 w-full">
      {posts?.map((post) => {
        return (
          <div className="mx-32" key={post.id}>
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
}
