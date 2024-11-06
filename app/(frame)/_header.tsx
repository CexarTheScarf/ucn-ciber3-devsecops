import { LogoTextless } from "@/components/logo";
import { cn } from "@/lib/utils";
import { PATH_SOURCES } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import type { ReactNode } from "react";

export default function Header(): ReactNode {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex justify-between p-4 px-10 shadow-md",
        "bg-gradient-to-r from-[#151f2e] to-[#1b2839]",
      )}
    >
      <a
        href="/"
        className="flex flex-row items-end gap-3 text-3xl font-bold text-white"
      >
        <LogoTextless />
        DevSecOps App
      </a>

      <nav className="flex flex-row items-center gap-12">
        <ul className="flex">
          <li>
            <a
              href={PATH_SOURCES.auth}
              className={cn(
                buttonVariants({ variant: "default" }),
                "border border-primary-button bg-primary-button hover:border-white hover:bg-transparent",
              )}
            >
              INICIO SESIÓN
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
