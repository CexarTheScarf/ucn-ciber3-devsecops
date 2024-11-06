import Image from "next/image";
import { IMAGES_SOURCES } from "@/lib/constants";

type LogoProps = {
  className?: string;
};

export function LogoTextless({ className }: LogoProps) {
  return (
    <Image
      className={className}
      src={IMAGES_SOURCES.logo_square}
      alt="Manzano Logo"
      width={40}
      height={40}
    />
  );
}

export function SexOps({ className }: LogoProps) {
  return (
    <Image
      className={className}
      src={IMAGES_SOURCES.sexops}
      alt="SexOps Logo"
      width={979}
      height={978}
    />
  );
}
