import { cn } from "@/lib/utils";
import { ReactNode, forwardRef } from "react";
import { FaCircleExclamation } from "react-icons/fa6";

interface InputProps extends React.ComponentProps<"input"> {
  label: string;
  className?: string;
  error?: string;
  children?: ReactNode;
}

export default forwardRef<HTMLInputElement, InputProps>(function BaseInput(
  { label, className, error, children, ...props },
  ref,
) {
  return (
    <div className={cn(className)}>
      <label className="mb-2 block text-sm font-medium" htmlFor={props.name}>
        {label}
      </label>

      <input
        ref={ref}
        {...props}
        id={props.name}
        className={cn(
          "block w-full rounded-lg border p-2.5",
          "border-gray-300 bg-gray-50 text-gray-900",
          "focus:border-blue-500 focus:ring-blue-500",
          "dark:border-gray-600 dark:bg-gray-700 dark:text-white",
          "dark:focus:border-blue-500 dark:focus:ring-blue-500",
          {
            "border-red-500 dark:border-red-400": error,
          },
        )}
      />

      {error && (
        <div className="mt-1 flex flex-row items-center gap-2">
          <FaCircleExclamation
            className={cn("text-sm text-red-500", "dark:text-red-400")}
          />

          <p className={cn("text-sm text-red-500", "dark:text-red-400")}>
            {error}
          </p>
        </div>
      )}

      {children}
    </div>
  );
});
