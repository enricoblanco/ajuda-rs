import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin-ext"],
  weight: ["600"],
});

interface HeaderProps {
  title: string;
  label: string | React.ReactNode;
}

export const Header = ({ label, title }: HeaderProps) => {
  return (
    <header
      className={"w-full flex flex-col gap-y-4 justify-center items-center "}
    >
      <h1 className={cn("md:text-3xl text-xl font-semibold", font.className)}>
        {title}
      </h1>
      <div className="text-muted-foreground md:text-sm text-xs">{label}</div>
    </header>
  );
};
