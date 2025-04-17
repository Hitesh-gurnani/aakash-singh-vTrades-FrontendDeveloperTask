import { ButtonProps } from "../types/atoms";
import { twMerge } from "tailwind-merge";

function Button({
  buttonText,
  className,
  onClick,
  type,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={twMerge(
        "bg-[var(--color-primary-100)] flex items-center justify-center text-[var(--color-white-max)] px-6 py-3 rounded-[10px]",
        className
      )}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
}

export default Button;
