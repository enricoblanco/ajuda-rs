const PostsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="my-6 flex flex-col gap-y-6 w-full pb-12">{children}</div>
  );
};

export default PostsLayout;
