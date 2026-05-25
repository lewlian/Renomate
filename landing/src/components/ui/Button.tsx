"use client";

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

type Variant = "primary" | "accent" | "secondary" | "ghost" | "destructive";
type Size = "default" | "lg";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded font-medium transition-[background,border-color,transform] ease-brand whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-mint-bg disabled:opacity-50 disabled:cursor-not-allowed";

const sizeClasses: Record<Size, string> = {
  default: "px-5 py-3 text-[15px]",
  lg: "px-7 py-4 text-base",
};

const variantClasses: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-charcoal",
  accent: "bg-coral text-white hover:bg-red-400",
  secondary: "bg-white text-ink border border-cloud hover:bg-snow",
  ghost: "bg-transparent text-ink hover:bg-snow",
  destructive: "bg-white text-coral hover:border hover:border-coral",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "default", className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

type LinkButtonProps = {
  variant?: Variant;
  size?: Size;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ variant = "primary", size = "default", className = "", ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} no-underline ${className}`}
        {...props}
      />
    );
  }
);
LinkButton.displayName = "LinkButton";
