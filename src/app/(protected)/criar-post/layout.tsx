const CriarPostLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="mt-6 w-full">{children}</div>;
};

export default CriarPostLayout;
