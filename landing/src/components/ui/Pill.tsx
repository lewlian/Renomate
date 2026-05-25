import type { ReactNode } from "react";

type Variant = "pending" | "progress" | "done" | "overdue" | "info" | "coral" | "sage" | "lavender" | "sky" | "sand" | "peach" | "neutral" | "dark";

const variants: Record<Variant, string> = {
  pending: "bg-cloud text-charcoal",
  progress: "bg-lavender-soft text-lavender",
  done: "bg-sage-soft text-sage",
  overdue: "bg-coral-soft text-coral",
  info: "bg-sky-soft text-sky",
  coral: "bg-coral-soft text-coral",
  sage: "bg-sage-soft text-sage",
  lavender: "bg-lavender-soft text-lavender",
  sky: "bg-sky-soft text-sky",
  sand: "bg-sand-soft text-sand",
  peach: "bg-peach-soft text-peach",
  neutral: "bg-cloud text-charcoal",
  dark: "bg-ink text-white",
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
