import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "../../lib/utils";

function Input({ className, type = "text", ...props }) {
  return (
    <InputPrimitive
      type={type}
      className={cn(
        "h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };