import "./globals.css";
//import Error from "@/components/error";
import { robotoFont } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevSecOps App",
  description: "Una aplicación de ejemplo para DevSecOps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          robotoFont,
          "flex min-h-screen w-screen flex-col overflow-x-hidden scroll-smooth focus:scroll-auto md:scroll-auto",
          "bg-gradient-to-r from-gradient-primary via-gradient-secondary to-gradient-tertiary",
        )}
      >
        {/*<noscript className="fixed z-10 bg-black bg-opacity-75 text-white">
          <Error message="Se requiere JavaScript para utilizar este sitio web." />
        </noscript>*/}
        {children}
      </body>
    </html>
  );
}
