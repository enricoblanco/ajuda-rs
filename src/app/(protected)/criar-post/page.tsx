import { getUserRole } from "@/actions/user";
import { CriarPostForm } from "@/components/post/criar-post";
import { currentUser } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";

const CriarPostPage = async () => {
  const user = await currentUser();
  const role = await getUserRole(user?.id as string);

  return <CriarPostForm tipo={role as Role} />;
};

export default CriarPostPage;
