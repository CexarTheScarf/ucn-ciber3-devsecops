import { ReactNode } from "react";
import Footer from "./_footer";
import Header from "./_header";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Header />
      <main className="flex flex-grow">{children}</main>
      <Footer />
    </>
  );
}
