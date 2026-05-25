import React from "react";
import { View, Text } from "react-native";

interface ActivityRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function ActivityRing({
  percentage,
  size = 120,
  strokeWidth = 10,
  label = "Done",
}: ActivityRingProps) {
  const clamped = Math.min(100, Math.max(0, percentage));
  const innerSize = size - strokeWidth * 2;
  const rotation = (clamped / 100) * 360;

  return (
    <View
      className="items-center justify-center"
      style={{ width: size, height: size }}
    >
      <View
        className="rounded-full bg-cloud absolute"
        style={{ width: size, height: size }}
      />

      {clamped > 0 && clamped <= 50 && (
        <View
          className="absolute overflow-hidden"
          style={{ width: size, height: size }}
        >
          <View
            className="absolute"
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: "transparent",
              borderTopColor: "#7EC8A0",
              borderRightColor: rotation > 90 ? "#7EC8A0" : "transparent",
              transform: [{ rotate: "-45deg" }],
            }}
          />
        </View>
      )}

      {clamped > 50 && (
        <View
          className="absolute overflow-hidden"
          style={{ width: size, height: size }}
        >
          <View
            className="absolute"
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: "#7EC8A0",
              borderBottomColor:
                rotation < 270 ? "transparent" : "#7EC8A0",
              borderLeftColor:
                rotation < 180 ? "transparent" : "#7EC8A0",
              transform: [{ rotate: "-45deg" }],
            }}
          />
        </View>
      )}

      <View
        className="rounded-full bg-white items-center justify-center absolute"
        style={{ width: innerSize, height: innerSize }}
      >
        <Text className="font-heading text-3xl text-ink">
          {Math.round(clamped)}%
        </Text>
        <Text className="font-body text-xs text-slate">{label}</Text>
      </View>
    </View>
  );
}
