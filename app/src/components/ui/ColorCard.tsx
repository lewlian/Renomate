import React from "react";
import { View, Pressable } from "react-native";

type ColorName = "sand" | "lavender" | "peach" | "sage" | "sky" | "coral";

interface ColorCardProps {
  color: ColorName;
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
}

const colorMap: Record<ColorName, { bg: string; borderColor: string }> = {
  sand: { bg: "bg-hint-sky", borderColor: "#7b68ee" },
  lavender: { bg: "bg-tint-blue", borderColor: "#7b68ee" },
  peach: { bg: "bg-tint-blue", borderColor: "#0091ff" },
  sage: { bg: "bg-hint-sky", borderColor: "#7b68ee" },
  sky: { bg: "bg-tint-blue", borderColor: "#0091ff" },
  coral: { bg: "bg-tint-blue", borderColor: "#7b68ee" },
};

export function ColorCard({ color, children, onPress, className = "" }: ColorCardProps) {
  const c = colorMap[color];
  const base = `rounded-md p-5 ${c.bg}`;
  const borderStyle = { borderLeftWidth: 3, borderLeftColor: c.borderColor };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className={`${base} ${className}`}
        style={({ pressed }) => ({ ...borderStyle, opacity: pressed ? 0.85 : 1 })}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View className={`${base} ${className}`} style={borderStyle}>
      {children}
    </View>
  );
}
