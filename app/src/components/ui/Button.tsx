import React from "react";
import {
  Pressable,
  Text,
  ActivityIndicator,
  type PressableProps,
} from "react-native";

type ButtonVariant = "primary" | "accent" | "secondary" | "ghost" | "destructive";
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
    container: "bg-ink",
    text: "text-paper",
    spinner: "#FAF7F2",
  },
  accent: {
    container: "bg-clay",
    text: "text-paper",
    spinner: "#FAF7F2",
  },
  secondary: {
    container: "bg-paper border border-mist",
    text: "text-ink",
    spinner: "#161513",
  },
  ghost: {
    container: "bg-transparent",
    text: "text-ink",
    spinner: "#161513",
  },
  destructive: {
    container: "bg-paper border border-mist",
    text: "text-error",
    spinner: "#A8453A",
  },
};

const sizeClasses: Record<ButtonSize, { container: string; text: string }> = {
  sm: {
    container: "min-h-[44px] px-4 py-2",
    text: "text-sm",
  },
  md: {
    container: "min-h-[44px] px-5 py-3",
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
      style={({ pressed }) => ({ opacity: pressed && !isDisabled ? 0.7 : isDisabled ? 0.5 : 1 })}
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
