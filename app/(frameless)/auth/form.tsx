"use client";

// UI IMPORTS
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Next Form Data
import serverAction from "./action";
import { formParser, defaultValues } from "./schema";
import { useNextForm } from "@/lib/hooks";
import { Separator } from "@radix-ui/react-separator";
import { PATH_SOURCES } from "@/lib/constants";

export default function SignInForm() {
  const { form, formRef, formAction } = useNextForm({
    formParser,
    defaultValues,
    serverAction,
  });

  return (
    <Form {...form}>
      <form
        ref={formRef}
        className={cn("flex w-full flex-col gap-y-5", "lg:max-w-[50%]")}
        action={formAction}
        onSubmit={form.handleSubmit(() => formRef.current?.submit())}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese su correo electrónico" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Ingrese su contraseña"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Enviar</Button>
        <Separator className="flex w-full border-b" />
        <p className="text-center">
          ¿No tienes cuenta?{" "}
          <a
            href={PATH_SOURCES.register}
            className={cn(
              buttonVariants({ variant: "link" }),
              "m-0 p-0 text-base text-blue-500",
            )}
          >
            Regístrate
          </a>
          .
        </p>
      </form>
    </Form>
  );
}
