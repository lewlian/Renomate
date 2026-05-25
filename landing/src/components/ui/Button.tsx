"use client";

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

type Variant = "primary" | "accent" | "secondary" | "ghost" | "destructive";
type Size = "default" | "lg";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-[background,border-color,transform] ease-brand whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-50 disabled:cursor-not-allowed";

const sizeClasses: Record<Size, string> = {
  default: "px-5 py-3 text-[15px]",
  lg: "px-7 py-4 text-base",
};

const variantClasses: Record<Variant, string> = {
  primary: "bg-onyx text-white hover:opacity-90",
  accent: "bg-onyx text-white hover:opacity-90",
  secondary: "bg-canvas text-charcoal border border-ash hover:bg-hint-sky",
  ghost: "bg-transparent text-charcoal hover:bg-hint-sky",
  destructive: "bg-canvas text-violet hover:border hover:border-violet",
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
