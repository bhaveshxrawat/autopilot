import "./Button.css";
import { clsx } from "clsx";
import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button type="button" {...props} className={clsx("btn", className)}>
      {children}
    </button>
  );
}
