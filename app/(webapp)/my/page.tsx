import getUser from "@/backend/users/getUser";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GetSessionJWT } from "@/lib/cookies";
import { Separator } from "@radix-ui/react-separator";
import type { FC, ReactNode } from "react";

const MyPageFormat: FC<{ children: ReactNode }> = ({ children }) => (
  <section className="md:px-15 flex w-screen flex-grow flex-col gap-5 overflow-x-hidden px-4">
    <h1 className="mt-10 text-left text-3xl font-bold">Mi Usuario</h1>
    {children}
  </section>
);

export default async function MyPage() {
  const jwt = await GetSessionJWT();
  const { data, success, message } = await getUser();

  if (!success || !jwt) {
    return (
      <MyPageFormat>
        <div className="flex flex-row items-end justify-center gap-2">
          <p className="inline text-3xl font-bold">Error:</p>
          <p className="inline text-2xl">{message}</p>
        </div>
      </MyPageFormat>
    );
  }

  const userData: Record<string, string | number> = {
    "Identificador (CUID)": data.id,
    "Correo electrónico": data.email,
    "Nombre completo": data.name,
    "Contraseña Hash": data.password,
  };

  return (
    <MyPageFormat>
      <fieldset className="flex w-full flex-col items-center gap-8">
        {Object.entries(userData).map(([key, value]) => (
          <div key={key} className="flex w-1/2 flex-col gap-2">
            <label className="font-bold">{key}</label>
            <Input readOnly={true} disabled={true} value={value} />
          </div>
        ))}
        <Separator
          className="flex h-px w-1/2 border-b"
          orientation="horizontal"
        />
        <div className="flex w-1/2 flex-col gap-2">
          <label className="font-bold">
            Databaseless Session (Auth Cookie / JWT + JWE)
          </label>
          <Textarea readOnly={true} disabled={true} value={jwt} />
        </div>
      </fieldset>
    </MyPageFormat>
  );
}
