import { useMemo, useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { coerceStateFields, issuesToErrors } from "./utils";
import type { FormParser, FormResponse, UseNextFormProps } from "./types";
import type { infer as ZodInfer } from "zod";

// ========================= Client Forms Hooks =========================
export function useNextForm<FormSchema extends FormParser, P>({
  formParser,
  defaultValues,
  serverAction,
  mode = "all",
}: UseNextFormProps<FormSchema, P>) {
  const [state, formAction] = useFormState<
    FormResponse<ZodInfer<FormSchema>>,
    FormData
  >(serverAction, { message: "" });

  const errors = useMemo(() => issuesToErrors(state?.issues), [state?.issues]);

  const form = useForm<ZodInfer<FormSchema>>({
    resolver: zodResolver<ZodInfer<FormSchema>>(formParser),
    errors,
    mode,
    defaultValues: coerceStateFields(defaultValues, {
      stateFields: state?.fields,
    }),
  });

  const formRef = useRef<HTMLFormElement>(null);

  return {
    formAction,
    form,
    formRef,
    message: state.message,
  };
}
