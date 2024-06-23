import { cn } from "../utils/tailwind.utils.js";

export default function Button({ children, primary, accent }) {
  return (
    <div
      className={cn(
        primary &&
          `border-accent-100 text-accent-100 hover:border-primary-700 hover:bg-accent-100 hover:text-primary-700`,
        accent &&
          `border-accent-900 bg-accent-100 text-accent-900 hover:border-accent-100 hover:bg-accent-900 hover:text-accent-100`,
        "z-10 cursor-pointer border-[1px] px-6 py-2 font-semibold uppercase",
      )}
    >
      {children}
    </div>
  );
}
