import "server-cli-only";
import { headers } from "next/headers";
import { isRedirectError } from "next/dist/client/components/redirect";
import { getEnvValue } from "./env";
import { GetSession } from "./auth";
import { decodeCallbackFromB64 } from "./utils";
import { CALLBACK_SEARCH_PARAM, PATH_SOURCES } from "./constants";
import type { ZodIssue } from "zod";
import type {
  ServerAction,
  ServerActionFactory,
  RawServerOperation,
  ServerOperation,
  FormParser,
  ServerActionFactoryProps,
  ErrorResponse,
  SuccessResponse,
  Session,
  ParamlessRawServerOperation,
  ParamlessServerOperation,
} from "./types";

// ========================= Auth Redirect Utils =========================

export function GetAuthCallack(): string {
  let redirectPath = "/";
  let callback: string | null = null;
  try {
    const requestUrl = new URL(headers().get("referer") ?? "");
    callback = requestUrl.searchParams.get(CALLBACK_SEARCH_PARAM);
    if (!callback) throw new Error();
    const decodedCallback = decodeCallbackFromB64(callback ?? "");
    new URL(requestUrl.origin + decodedCallback);
    redirectPath = decodedCallback;
  } catch {}

  return callback ? redirectPath : PATH_SOURCES.my;
}

// ========================= Server Request Utils =========================

export function getPathname(): string {
  return headers().get(getEnvValue("NEXT_PATHNAME_HEADER")) as string;
}

// ========================= Server Actions Utils =========================

export function formDataToFields<T>(formData: FormData, defaultData: T): T {
  const iter = formData.entries();
  let next = iter.next();

  while (!next.done) {
    const [key, value] = next.value;
    defaultData[key as keyof T] = value as T[keyof T];
    next = iter.next();
  }

  return defaultData;
}

const defaultIssuesFromDefaultData = <T>(
  defaultData: Required<T>,
): Record<keyof T, string> => {
  const defaultIssues: Record<keyof T, string> = Object.keys(
    defaultData,
  ).reduce(
    (acc, key) => {
      acc[key as keyof T] = "";
      return acc;
    },
    {} as Record<keyof T, string>,
  );

  return defaultIssues;
};

export function reduceIssues<T>(
  issues: ZodIssue[],
  defaultData: Required<T>,
): Record<keyof T, string> | undefined {
  return issues.reduce((acc, issue) => {
    acc[issue.path[0] as keyof T] = issue.message;
    return acc;
  }, defaultIssuesFromDefaultData(defaultData));
}

export function reduceBackendIssues<T>(
  errorVariables: string[] | null,
  message: string,
  defaultData: Required<T>,
): Record<keyof T, string> | undefined {
  if (errorVariables === null) return reduceIssues([], defaultData);

  return errorVariables.reduce((acc, path) => {
    acc[path as keyof T] = message;
    return acc;
  }, defaultIssuesFromDefaultData(defaultData));
}

// ========================= Server Factories =========================

export function ThrowHTTPExceptionFactory<T extends object>() {
  return function ThrowHTTPException(
    message: string,
    errorVariables: (keyof T)[],
  ): ErrorResponse<T> {
    return {
      success: false,
      data: null,
      errorVariables,
      message,
    };
  };
}

export function ServerActionFactory<FormSchema extends FormParser, P>({
  formParser,
  defaultValues,
  serverActionData,
}: ServerActionFactoryProps<FormSchema, P>): ServerAction<FormSchema> {
  return async (_, formData) => {
    const { backendPipe, validationPipe } = serverActionData;

    const {
      success: validationSuccess,
      data: validationData,
      error: validationError,
    } = formParser.safeParse(Object.fromEntries(formData));

    if (!validationSuccess) {
      return {
        message: validationPipe.defaultMessage,
        fields: formDataToFields(formData, defaultValues),
        issues: reduceIssues(
          validationError.issues,
          validationPipe.defaultIssues ?? defaultValues,
        ),
      };
    }

    const propsFormatter = backendPipe.propsFormatter ?? ((data) => data);

    try {
      const {
        success: operationSuccess,
        message: operationMessage,
        data: operationData,
        errorVariables,
      } = await backendPipe.operation(propsFormatter(validationData));

      if (!operationSuccess) {
        return {
          message: operationMessage,
          fields: formDataToFields(formData, defaultValues),
          issues: reduceBackendIssues(
            errorVariables as string[],
            operationMessage,
            validationPipe.defaultIssues ?? defaultValues,
          ),
        };
      }

      return operationData;
    } catch (e) {
      throw e; // Error propagation (redirect)
    }
  };
}

// ========================= Server Operation Factory =========================

export function ServerOperationFactory<
  Props extends object,
  Reply extends object = {},
>(operation: RawServerOperation<Props, Reply>): ServerOperation<Props, Reply> {
  function SuccessHTTPAnswer(
    message: string,
    data: Reply,
  ): SuccessResponse<Reply> {
    return {
      success: true,
      data,
      message,
      errorVariables: null,
    };
  }

  function ThrowHTTPException(
    message: string,
    errorVariables: (keyof Props)[],
  ): ErrorResponse<Props> {
    return {
      success: false,
      data: null,
      errorVariables,
      message,
    };
  }

  async function UseAuth(): Promise<Session> {
    const session = await GetSession();
    if (!session) throw ThrowHTTPException("No autorizado", []);
    return session;
  }

  function isError(error: any): error is ErrorResponse<Props> {
    return (
      typeof error === "object" &&
      error.success === false &&
      error.data === null &&
      Array.isArray(error.errorVariables)
    );
  }

  return async (data) =>
    operation({
      data,
      SuccessHTTPAnswer,
      ThrowHTTPException,
      UseAuth,
    }).catch((e: unknown) => {
      if (isError(e)) return e;
      if (isRedirectError(e)) throw e;
      return ThrowHTTPException("Error interno", []);
    });
}

export function ParamlessServerOperationFactory<Reply extends object = {}>(
  operation: ParamlessRawServerOperation<Reply>,
): ParamlessServerOperation<Reply> {
  function SuccessHTTPAnswer(
    message: string,
    data: Reply,
  ): SuccessResponse<Reply> {
    return {
      success: true,
      data,
      message,
      errorVariables: null,
    };
  }

  function ThrowHTTPException(message: string): ErrorResponse<{}> {
    return {
      success: false,
      data: null,
      errorVariables: [],
      message,
    };
  }

  async function UseAuth(): Promise<Session> {
    const session = await GetSession();
    if (!session) throw ThrowHTTPException("No autorizado");
    return session;
  }

  function isError(error: any): error is ErrorResponse<{}> {
    return (
      typeof error === "object" &&
      error.success === false &&
      error.data === null &&
      Array.isArray(error.errorVariables)
    );
  }

  return async () =>
    operation({
      SuccessHTTPAnswer,
      ThrowHTTPException,
      UseAuth,
    }).catch((e: unknown) => {
      if (isError(e)) return e;
      return ThrowHTTPException("Error interno");
    });
}
