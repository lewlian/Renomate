import type { ReactNode } from "react";

type Variant = "pending" | "progress" | "done" | "overdue" | "info" | "clay";

const variants: Record<Variant, string> = {
  pending: "bg-mist text-charcoal",
  progress: "bg-clay-soft text-clay-deep",
  done: "bg-success-soft text-success",
  overdue: "bg-error-soft text-error",
  info: "bg-linen text-info",
  clay: "bg-clay-soft text-clay-deep",
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
