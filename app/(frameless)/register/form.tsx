"use client";
import serverAction from "./action";
import { useNextForm } from "@/lib/hooks";
import { defaultValues, formParser } from "./schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import FormAlert from "@/components/form-alert";
import { Separator } from "@/components/ui/separator";
import { PATH_SOURCES } from "@/lib/constants";

export default function SignInForm() {
  const { form, formRef, formAction, message } = useNextForm({
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
        {message && <FormAlert message={message} />}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese su nombre y apellido" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>Confirmación de contraseña</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirme su contraseña"
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
          ¿Ya tienes una cuenta?{" "}
          <a
            href={PATH_SOURCES.auth}
            className={cn(
              buttonVariants({ variant: "link" }),
              "m-0 p-0 text-base text-blue-500",
            )}
          >
            Iniciar sesión
          </a>
          .
        </p>
      </form>
    </Form>
  );
}
