import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { base64url } from "jose";
import type { Fields } from "./types";
import type { FieldErrors, FieldValues } from "react-hook-form";

// ========================= UI Utils =========================

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// ========================= Date Utils =========================

export const DateFormatter = (date: string) =>
  new Date(date).toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

// ========================= B64/Uint8Array Utils =========================

export const encodeCallbackToUint8Array = (callback: string): Uint8Array =>
  new TextEncoder().encode(callback);

export const decodeCallbackFromUint8Array = (callback: Uint8Array): string =>
  new TextDecoder().decode(callback);

export const encodeCallbackToB64 = (callback: string): string =>
  base64url.encode(callback);

export function decodeCallbackFromB64(callback: Uint8Array): Uint8Array;
export function decodeCallbackFromB64(callback: string): string;
export function decodeCallbackFromB64(
  callback: string | Uint8Array,
): string | Uint8Array {
  return typeof callback === "object"
    ? base64url.decode(callback)
    : decodeCallbackFromUint8Array(base64url.decode(callback));
}

// ========================= Client Forms Utils =========================

export function issuesToErrors<T extends FieldValues>(
  issues: Record<keyof T, string> | undefined,
): FieldErrors<T> | undefined {
  if (typeof issues === "undefined") return {};

  return (Object.entries(issues) as [keyof T, string][]).reduce<FieldErrors<T>>(
    (acc, [key, value]) => {
      if (value === "") return acc;

      acc[key] = { type: "value", message: value } as FieldErrors<T>[keyof T];
      return acc;
    },
    {},
  );
}

export const coerceStateFields = <T extends object>(
  defaultValues: T,
  { stateFields, checkboxCoerce }: Fields<T>,
) => {
  if (!stateFields) return defaultValues;

  const fields = { ...defaultValues, ...stateFields };
  if (!checkboxCoerce) return fields;

  for (const [key, value] of Object.entries(checkboxCoerce) as [
    keyof T,
    T[keyof T],
  ][]) {
    if (typeof fields[key] !== "boolean") continue;

    fields[key] = !!value as T[keyof T];
  }

  return fields;
};

export function without<T>(keys: T[], key: T): T[] {
  return keys.filter((k) => k !== key);
}

/// ========================= Text Utils =========================

export function ParseText(text: string, comparisonVariables: string[]) {
  comparisonVariables.forEach((variable, index) => {
    text = text.replace(`{${index + 1}}`, variable);
  });

  return text;
}
