import { FaCircleExclamation } from "react-icons/fa6";
import { buttonVariants } from "@/components/ui/button";
import { PATH_SOURCES } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ErrorProps = {
  message: string;
  errorCode?: number;
};

export default function Error({ message, errorCode }: ErrorProps) {
  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center md:gap-5">
      <FaCircleExclamation className="text-3xl text-red-500 md:text-9xl" />
      <div className="flex flex-col gap-2 p-2 text-center">
        <h1 className="text-xl font-bold md:text-6xl">Error {errorCode}</h1>
        <p className="text-md text-pretty font-medium md:text-2xl">{message}</p>
        <a
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "w-fit self-center",
          )}
          href={PATH_SOURCES.home}
        >
          Volver al inicio
        </a>
      </div>
    </section>
  );
}
