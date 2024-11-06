import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "300", subsets: ["latin"] });
export const robotoFont = roboto.className;