import { PostPageComponent } from "@/components/post/post-page";

const PostPage = ({
  params,
  searchParams,
}: {
  params: { tipo: "pedidos" | "servicos" };
  searchParams: { search: string; page: string };
}) => {
  const { tipo } = params;
  const { search, page } = searchParams;

  return <PostPageComponent searchParams={{ search, page }} tipo={tipo} />;
};

export default PostPage;
