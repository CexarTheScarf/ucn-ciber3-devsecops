import type { ItemImage } from "./types";
import { cn } from "@/lib/utils";
import { IMAGES_SOURCES } from "@/lib/constants";
import Image from "next/image";

const contactItems: ItemImage[] = [
  {
    image: {
      src: IMAGES_SOURCES.pin_icon,
      height: 500,
      width: 500,
      alt: "Ícono de pin de mapa",
    },
    title: "Dirección",
    description:
      "Escuela de Ingeniería, Universidad Católica del Norte, Campus Guayacán, Coquimbo, Chile.",
    paragarph: true,
  },
  {
    image: {
      src: IMAGES_SOURCES.user_circle_icon,
      height: 500,
      width: 500,
      alt: "Ícono de persona",
    },
    title: "Contacto",
    description:
      "Carlos Manzano, César Muñoz, José Carrillo, Gabriel Zuleta,& Slavko Bogdanic.",
    paragarph: true,
  }
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#151f2e] to-[#1b2839] px-12 py-5">
      <ul className="flex flex-col gap-10">
        {contactItems.map((item, index) => (
          <li key={index} className="flex flex-row items-center gap-5">
            <div className="flex w-14">
              <Image
                className="rounded-sm"
                src={item.image.src}
                height={item.image.height}
                width={item.image.width}
                alt={item.image.alt}
              />
            </div>
            <div className="flex flex-col">
              <h2
                className={cn(
                  "mb-1 text-left font-bold tracking-normal text-white md:tracking-wide",
                  "text-lg md:text-xl",
                )}
              >
                {item.title}
              </h2>
              {item.paragarph ? (
                <p className="text-left text-sm text-white md:text-base">
                  {item.description}
                </p>
              ) : (
                <a
                  href={item.link}
                  className="text-left text-sm text-white md:text-base"
                >
                  {item.description}
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </footer>
  );
}
