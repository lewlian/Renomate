import React from "react";
import { View, Pressable } from "react-native";

interface CardProps {
  variant?: "default" | "elevated";
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

export function Card({ variant = "default", children, onPress, className = "" }: CardProps) {
  const base = "rounded-md border border-mist p-4";
  const bg = variant === "elevated" ? "bg-white shadow-sm" : "bg-paper";

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className={`${base} ${bg} ${className}`}
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        {children}
      </Pressable>
    );
  }

  return <View className={`${base} ${bg} ${className}`}>{children}</View>;
}
