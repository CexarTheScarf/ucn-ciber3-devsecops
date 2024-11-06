import { headers } from "next/headers";
import { LogoTextless } from "@/components/logo";
import { PATH_SOURCES } from "@/lib/constants";
import { getEnvValue } from "@/lib/env";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOutIcon, MenuIcon } from "lucide-react";

const components: AsideProps[] = [
  {
    title: "Mi usuario",
    href: PATH_SOURCES.my,
    description: "Información de mi usuario",
    hasSlug: true,
    children: [],
  },
];

export default function Aside() {
  const pathname = headers().get(getEnvValue("NEXT_PATHNAME_HEADER")) as string;

  return (
    <aside
      className={cn(
        "group sticky top-0 h-screen w-80 flex-col px-4 py-12 transition-all has-[:checked]:w-16",
        "bg-gradient-to-r from-gradient-primary via-gradient-secondary to-gradient-tertiary",
      )}
    >
      <div>
        <div className="relative -mt-5 mb-5 h-8 w-8">
          <input
            type="checkbox"
            className="peer/menu absolute top-0 z-10 h-8 w-8 appearance-none hover:cursor-pointer"
          />
          <MenuIcon className="absolute top-0 h-8 w-8 text-white transition-all peer-checked/menu:rotate-90" />
        </div>
      </div>

      <nav className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-end justify-between overflow-clip text-white">
            <LogoTextless className="w-[26.10966057%] transition-all group-has-[:checked]:w-full" />
            <span className="w-[70.49608355%] text-2xl font-bold transition-all group-has-[:checked]:collapse group-has-[:checked]:opacity-0">
              DevSecOps App
            </span>
          </div>
          {components.map((component) => (
            <div
              key={component.title}
              className="flex flex-col items-start py-2 transition-all group-has-[:checked]:invisible group-has-[:checked]:opacity-0"
            >
              <a
                href={component.href}
                title={component.description}
                className={cn(
                  buttonVariants({ variant: "link", size: "lg" }),
                  "block px-4 py-2 text-lg text-white",
                  {
                    "font-bold":
                      pathname === component.href ||
                      (component.hasSlug &&
                        pathname.startsWith(component.href) &&
                        !component.children?.find(
                          (child) =>
                            pathname === child.href ||
                            (child.hasSlug && pathname.startsWith(child.href)),
                        )),
                  },
                )}
              >
                {component.title}
              </a>
              {component.children &&
                component.children.map((child) => (
                  <a
                    key={child.title}
                    href={child.href}
                    title={child.description}
                    className={cn(
                      buttonVariants({ variant: "link", size: "default" }),
                      "block px-4 py-2 text-white",
                      {
                        "font-bold":
                          pathname === child.href ||
                          (component.hasSlug &&
                            pathname.startsWith(child.href)),
                      },
                    )}
                  >
                    {child.title}
                  </a>
                ))}
              <Separator className="my-2" />
            </div>
          ))}
        </div>

        <a
          href={PATH_SOURCES.logout}
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "flex gap-3 transition-all group-has-[:checked]:m-0 group-has-[:checked]:gap-0 group-has-[:checked]:p-0",
          )}
        >
          <LogOutIcon />
          <p className="transition-all group-has-[:checked]:hidden group-has-[:checked]:opacity-0">
            Cerrar Sesión
          </p>
        </a>
      </nav>
    </aside>
  );
}
