import type { ZodEffects, infer as ZodInfer, ZodObject } from "zod";

// ==================== FORM TYPES ====================

export type Fields<T extends object> = {
  stateFields?: T;
  checkboxCoerce?: Partial<Record<keyof T, boolean>>;
};

export type FormResponse<T extends object> = {
  message: string;
  fields?: T;
  issues?: Record<keyof T, string>;
};

export type FormParser =
  | ZodObject<any, "strip" | "strict" | "passthrough", ZodTypeAny, any>
  | ZodEffects<any, any>;

// === UseNextForm Hook ===

export type UseNextFormProps<FormSchema extends FormParser, P> = {
  formParser: FormSchema;
  defaultValues: ZodInfer<FormSchema>;
  serverAction: ServerAction<FormSchema>;
  mode?: "onBlur" | "onChange" | "onSubmit" | "all" | "onTouched";
};

export type ServerAction<T extends FormParser> = (
  state: Awaited<FormResponse<T>>,
  payload: FormData,
) => FormResponse<T> | Promise<FormResponse<T>>;

// === Server Action Factory ===

export type ServerActionFactoryProps<FormSchema extends FormParser, P> = {
  formParser: FormSchema;
  defaultValues: ZodInfer<FormSchema>;
  serverActionData: ServerActionFactory<FormSchema, P>;
};

export type ServerActionFactory<FormSchema extends FormParser, P> = {
  validationPipe: {
    defaultMessage: string;
    defaultIssues?: ZodInfer<FormSchema>;
  };
  backendPipe: {
    operation: ServerOperation<P, any>;
    propsFormatter?: (data: ZodInfer<FormSchema>) => P;
    defaultIssues?: ZodInfer<FormSchema>;
  };
};

// ==================== SERVER OPERATION TYPES ====================

export type RawServerOperation<P, R> = (params: {
  data: P;
  SuccessHTTPAnswer: (message: string, data: R) => SuccessResponse<T>;
  ThrowHTTPException: (
    message: string,
    errorVariables: (keyof P)[],
  ) => ErrorResponse<P>;
  UseAuth: () => Promise<Session>;
}) => Promise<Response<R>>;

export type ParamlessRawServerOperation<R> = (params: {
  SuccessHTTPAnswer: (message: string, data: R) => SuccessResponse<T>;
  ThrowHTTPException: (
    message: string,
    errorVariables: (keyof P)[],
  ) => ErrorResponse<P>;
  UseAuth: () => Promise<Session>;
}) => Promise<Response<R>>;

export type ServerOperation<P, R> = (data: P) => Promise<Response<R, P>>;
export type ParamlessServerOperation<R> = () => Promise<Response<R, undefined>>;

// ==================== BACKEND TYPES ====================

export type SuccessResponse<R> = {
  data: R;
  message: string;
  success: true;
  errorVariables: null;
};

export type ErrorResponse<P extends object> = {
  data: null;
  message: string;
  success: false;
  errorVariables: (keyof P)[];
};

export type Response<R, P extends object> =
  | SuccessResponse<R>
  | ErrorResponse<P>;

// ==================== AUTH TYPES ====================

export type Session = {
  email: string;
  id: string;
  name: string;
};
