"use client";
import Error from "@/components/error";

export default function Custom500() {
  return (
    <div className="text-white">
      <Error
        errorCode={500}
        message="Ha ocurrido un error inesperado. Por favor, intenta de nuevo más tarde."
      />
    </div>
  );
}
