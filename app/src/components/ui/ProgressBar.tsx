import React from "react";
import { View, Text } from "react-native";

interface ProgressBarProps {
  completed: number;
  total: number;
  color?: string;
  showCount?: boolean;
  size?: "sm" | "md";
}

export function ProgressBar({
  completed,
  total,
  color = "bg-green-500",
  showCount = true,
  size = "md",
}: ProgressBarProps) {
  const height = size === "sm" ? 4 : 8;

  return (
    <View className="flex-row items-center">
      <View className="flex-1 flex-row" style={{ gap: 2 }}>
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={i}
            className={`flex-1 rounded-full ${i < completed ? color : "bg-ash"}`}
            style={{ height }}
          />
        ))}
      </View>
      {showCount && (
        <Text className="font-mono text-xs text-smoke ml-2">
          {completed}/{total}
        </Text>
      )}
    </View>
  );
}
