import SignInForm from "./form";
import { cn } from "@/lib/utils";
import { LogoTextless } from "@/components/logo";

export default function AuthPage() {
  return (
    <section className="flex flex-grow justify-center">
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-5 self-center rounded-2xl px-5 py-5 lg:flex-row lg:py-10",
          "w-[90dvw] lg:w-[50dvw]",
          "bg-white dark:bg-zinc-900",
          "text-black dark:text-white",
        )}
      >
        <div className="flex w-full flex-col self-start">
          <div className="mb-7 flex flex-row items-end gap-2 text-2xl font-bold">
            <LogoTextless className="h-14 w-fit self-center lg:self-start" />
            DevSecOps App
          </div>
          <h1 className="text-left text-4xl font-bold">Inicie sesión</h1>
          <p className="text-xl">para continuar</p>
        </div>

        <hr className="w-full bg-white lg:hidden" />
        <SignInForm />
      </div>
    </section>
  );
}
