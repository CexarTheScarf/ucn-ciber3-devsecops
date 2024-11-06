import Aside from "./_aside";
import { ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <main className="flex flex-grow justify-center bg-white text-black">
      <Aside />
      {children}
    </main>
  );
}
