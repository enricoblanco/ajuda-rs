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

  return <PostPageComponent searchParams={{ search }} tipo={tipo} />;
};

export default PostPage;
