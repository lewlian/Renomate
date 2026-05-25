import React from "react";
import { View, Pressable } from "react-native";

type ColorName = "sand" | "lavender" | "peach" | "sage" | "sky" | "coral";

interface ColorCardProps {
  color: ColorName;
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

const colorMap: Record<ColorName, string> = {
  sand: "bg-sand-soft",
  lavender: "bg-lavender-soft",
  peach: "bg-peach-soft",
  sage: "bg-sage-soft",
  sky: "bg-sky-soft",
  coral: "bg-coral-soft",
};

export function ColorCard({ color, children, onPress, className = "" }: ColorCardProps) {
  const base = `rounded-lg p-5 ${colorMap[color]}`;

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className={`${base} ${className}`}
        style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View className={`${base} ${className}`}>
      {children}
    </View>
  );
}
