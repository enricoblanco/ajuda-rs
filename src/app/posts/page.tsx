import { getAllPosts, getAllPostsNumber, getPosts } from "@/actions/post";
import { getUserByClerkId, getUserById } from "@/actions/user";
import { PaginationComponent } from "@/components/pagination/pagination";
import { PostComponent } from "@/components/post";
import { currentUser } from "@clerk/nextjs/server";

const PostPage = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const { page } = searchParams;
  const posts = await getPosts((parseInt(page) - 1) * 10, 10);
  const postsNumber = await getAllPostsNumber();

  const userClerk = await currentUser();
  const user = await getUserByClerkId(userClerk?.id as string);

  const getUserName = async (id: string) => {
    const user = await getUserById(id);
    return user?.name as string;
  };
  return (
    <div className="my-6 flex flex-col gap-y-6 w-full pb-12">
      <div className="flex flex-col gap-y-4">
        {posts?.map((post) => (
          <div className="mx-12 md:mx-44" key={post.id}>
            <PostComponent
              body={post.body}
              title={post.title}
              contact={post.contact}
              date={post.date}
              nome={getUserName(post.authorId) as unknown as string}
              isEditable={user?.id === post.authorId}
            />
          </div>
        ))}
        <div className="flex absolute bottom-6 w-full justify-center">
          <PaginationComponent
            totalPosts={postsNumber as number}
            page="posts"
            currentPage={page}
          />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
