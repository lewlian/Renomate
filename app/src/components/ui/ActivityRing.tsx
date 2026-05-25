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
        className="rounded-full bg-ash absolute"
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
              borderTopColor: "#7b68ee",
              borderRightColor: rotation > 90 ? "#7b68ee" : "transparent",
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
              borderColor: "#7b68ee",
              borderBottomColor:
                rotation < 270 ? "transparent" : "#7b68ee",
              borderLeftColor:
                rotation < 180 ? "transparent" : "#7b68ee",
              transform: [{ rotate: "-45deg" }],
            }}
          />
        </View>
      )}

      <View
        className="rounded-full bg-canvas items-center justify-center absolute"
        style={{ width: innerSize, height: innerSize }}
      >
        <Text className="font-heading text-3xl text-deep-charcoal">
          {Math.round(clamped)}%
        </Text>
        <Text className="font-body text-xs text-smoke">{label}</Text>
      </View>
    </View>
  );
}
