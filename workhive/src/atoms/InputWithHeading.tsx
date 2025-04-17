import { InputWithHeadingProps } from "../types/atoms";
import { twMerge } from "tailwind-merge";

function InputWithHeading({
  heading,
  inputType,
  placeholder,
  value,
  onChange,
  className,
}: InputWithHeadingProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs text-[var(--color-white-100)]">{heading}</div>
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={twMerge(
          "bg-[var(--color-primary-300)] text-[var(--color-white-max)] px-3 py-[15px] text-sm rounded-[10px]",
          className
        )}
      />
    </div>
  );
}

export default InputWithHeading;
