import { SexOps } from "@/components/logo";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <section className="w-full flex-grow overflow-x-hidden">
      <section className="grid min-h-screen grid-cols-1 gap-x-5 px-4 py-32 pt-5 md:min-h-[80dvh] md:grid-cols-2 md:px-20 md:pt-32">
        <div className="flex flex-col items-center justify-center self-center text-center md:items-start md:justify-normal md:text-left">
          <h1
            className={cn(
              "font-bold tracking-wide text-white",
              "text-4xl md:text-7xl",
            )}
          >
            Solución de DevSecOps
          </h1>
          <hr
            className={cn("my-4 h-1 w-full border-0 bg-secondary", "md:my-8")}
          />
          <h2
            className={cn(
              "font-bold tracking-wide text-white",
              "text-2xl md:text-3xl",
            )}
          >
            ESTE APLICATIVO ES UN EJEMPLO DE LOGIN Y REGISTRO DE USUARIOS
            ADOPTANDO DEVSECOPS PARA EL CURSO DE CIBERSEGURIDAD III
          </h2>
        </div>

        <SexOps className="flex w-full scale-75 self-center p-10" />
      </section>
    </section>
  );
}
