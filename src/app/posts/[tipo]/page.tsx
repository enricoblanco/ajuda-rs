import { PostPageComponent } from "@/components/post/post-page";

const PostPage = ({
  params,
  searchParams,
}: {
  params: { tipo: "pedidos" | "servicos" };
  searchParams: { search: string };
}) => {
  const { tipo } = params;
  const { search } = searchParams;

  return (
    <div className="my-6 flex flex-col gap-y-4 w-full">
      <PostPageComponent searchParams={{ search }} tipo={tipo} />
    </div>
  );
};

export default PostPage;
