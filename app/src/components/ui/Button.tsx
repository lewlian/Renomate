import React from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
  type PressableProps,
} from "react-native";

type ButtonVariant = "primary" | "accent" | "dark" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<PressableProps, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<ButtonVariant, { container: string; text: string; spinner: string }> = {
  primary: {
    container: "bg-coral",
    text: "text-white",
    spinner: "#FFFFFF",
  },
  accent: {
    container: "bg-coral",
    text: "text-white",
    spinner: "#FFFFFF",
  },
  dark: {
    container: "bg-ink",
    text: "text-white",
    spinner: "#FFFFFF",
  },
  secondary: {
    container: "bg-white border border-cloud",
    text: "text-ink",
    spinner: "#1A1A2E",
  },
  ghost: {
    container: "bg-transparent",
    text: "text-ink",
    spinner: "#1A1A2E",
  },
  destructive: {
    container: "bg-coral-soft",
    text: "text-coral",
    spinner: "#FF6B6B",
  },
};

const sizeClasses: Record<ButtonSize, { container: string; text: string }> = {
  sm: {
    container: "min-h-[48px] px-4 py-2",
    text: "text-sm",
  },
  md: {
    container: "min-h-[48px] px-5 py-3",
    text: "text-base",
  },
  lg: {
    container: "min-h-[52px] px-6 py-4",
    text: "text-lg",
  },
};

export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onPress,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const v = variantClasses[variant];
  const s = sizeClasses[size];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`flex-row items-center justify-center rounded ${v.container} ${s.container} ${isDisabled ? "opacity-50" : ""} ${className}`}
      style={({ pressed }) => ({
        opacity: pressed && !isDisabled ? 0.7 : isDisabled ? 0.5 : 1,
        ...(variant === "primary" || variant === "accent"
          ? {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 2,
            }
          : {}),
      })}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={v.spinner} />
      ) : (
        <Text className={`font-body font-semibold ${v.text} ${s.text}`}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}
