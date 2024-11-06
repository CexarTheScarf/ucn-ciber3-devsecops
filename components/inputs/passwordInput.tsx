import { forwardRef, useState } from "react";
import BaseInput from "./input";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  label: string;
  className?: string;
  error?: string;
}

export default forwardRef<HTMLInputElement, InputProps>(function PasswordInput(
  { label, className, error, ...props },
  ref,
) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <BaseInput
      ref={ref}
      {...props}
      label={label}
      className={className}
      error={error}
      type={showPassword ? "text" : "password"}
    >
      <div className={cn({ "mt-2": !error })}>
        <input
          id="show-password"
          className="mr-2 hover:cursor-pointer"
          type="checkbox"
          onClick={() => setShowPassword((prev) => !prev)}
        />
        <label htmlFor="show-password" className="text-sm font-medium">
          Mostrar contraseña
        </label>
      </div>
    </BaseInput>
  );
});
