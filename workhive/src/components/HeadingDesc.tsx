import { HeadingDescProps } from "../types/components";
import { twMerge } from "tailwind-merge";
function HeadingDesc({
  heading,
  description,
  headingClassName,
  descriptionClassName,
}: HeadingDescProps) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={twMerge(
          "text-[var(--color-white-max)] text-[32px] font-semibold",
          headingClassName
        )}
      >
        {heading}
      </div>
      <div
        className={twMerge(
          "text-[var(--color-white-100)] text-sm font-normal",
          descriptionClassName
        )}
      >
        {description}
      </div>
    </div>
  );
}

export default HeadingDesc;
