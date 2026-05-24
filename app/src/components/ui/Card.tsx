import React from "react";
import { View, Pressable } from "react-native";

interface CardProps {
  variant?: "default" | "elevated";
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 8,
  elevation: 2,
};

export function Card({ variant: _variant, children, onPress, className = "" }: CardProps) {
  const base = "rounded-md bg-white p-5";

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className={`${base} ${className}`}
        style={({ pressed }) => ({
          ...shadowStyle,
          opacity: pressed ? 0.85 : 1,
        })}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View className={`${base} ${className}`} style={shadowStyle}>
      {children}
    </View>
  );
}
