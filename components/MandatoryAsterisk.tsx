import { FC } from "react";

export const MandatorySectionAsterisk: FC<{ text?: string }> = ({ text }) => (
  <p className="mx-2 inline-block font-bold text-red-600">* {text ?? ""}</p>
);
