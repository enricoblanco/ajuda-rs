const SignInLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="my-6 w-full flex justify-center">{children}</div>;
};

export default SignInLayout;
