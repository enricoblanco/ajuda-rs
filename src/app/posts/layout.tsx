const PostsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="my-6 flex flex-col gap-y-4 w-full h-full">{children}</div>
  );
};

export default PostsLayout;
