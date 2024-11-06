import Error from "@/components/error";

export default function Custom404() {
  return (
    <div className="text-white">
      <Error
        errorCode={404}
        message="La página solicitada no ha sido encontada."
      />
    </div>
  );
}
