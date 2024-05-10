"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/clerk-react";
import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetClose,
} from "@/components/ui/sheet";

const navigation = [
  { name: "Início", href: "/" },
  { name: "Pedidos", href: "/posts/pedidos" },
  { name: "Serviços", href: "/posts/servicos" },
  { name: "Entrar", href: "/auth/sign-in" },
  { name: "Cadastro", href: "/auth/sign-up" },
];

const loggedNavigation = [
  { name: "Início", href: "/" },
  { name: "Pedidos", href: "/posts/pedidos" },
  { name: "Serviços", href: "/posts/servicos" },
  { name: "Perfil", href: "/user-profile" },
];

const nvabarItemClasses =
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50";

const navbarMobileItemClasses =
  "flex w-full items-center py-2 text-lg font-semibold";

export const Navbar = () => {
  const { userId } = useAuth();
  const isAuth = !!userId;

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-white">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="outline">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link className="mr-6 hidden lg:flex" href="#">
            AjudaRS
          </Link>
          <div className="grid gap-2 py-6">
            {isAuth
              ? loggedNavigation.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <Link className={navbarMobileItemClasses} href={item.href}>
                      {item.name}
                    </Link>
                  </SheetClose>
                ))
              : navigation.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <Link className={navbarMobileItemClasses} href={item.href}>
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
          </div>
        </SheetContent>
      </Sheet>
      <Link className="mr-6 hidden lg:flex font-bold" href="#">
        AjudaRS
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        {isAuth
          ? loggedNavigation.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className={nvabarItemClasses}
              >
                {item.name}
              </Link>
            ))
          : navigation.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className={nvabarItemClasses}
              >
                {item.name}
              </Link>
            ))}
        {isAuth && <UserButton />}
      </nav>
    </header>
  );
};

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
