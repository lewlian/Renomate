import type { ReactNode } from "react";

type Variant = "pending" | "progress" | "done" | "overdue" | "info" | "violet" | "neutral" | "dark";

const variants: Record<Variant, string> = {
  pending: "bg-hint-sky text-charcoal",
  progress: "bg-tint-blue text-violet",
  done: "bg-tint-blue text-violet",
  overdue: "bg-tint-blue text-violet",
  info: "bg-tint-blue text-blue",
  violet: "bg-tint-blue text-violet",
  neutral: "bg-hint-sky text-charcoal",
  dark: "bg-onyx text-white",
};

type Props = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

export function Pill({ variant = "pending", children, className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
