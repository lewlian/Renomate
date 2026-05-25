import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "./Avatar";

interface AvatarStackProps {
  names: string[];
  max?: number;
  size?: "sm" | "md";
}

const sizeConfig = {
  sm: { avatarSize: "sm" as const, px: 24, overlap: -8 },
  md: { avatarSize: "sm" as const, px: 32, overlap: -8 },
};

export function AvatarStack({ names, max = 3, size = "md" }: AvatarStackProps) {
  const s = sizeConfig[size];
  const visible = names.slice(0, max);
  const remaining = names.length - max;

  return (
    <View className="flex-row items-center">
      {visible.map((name, i) => (
        <View
          key={i}
          style={{
            marginLeft: i === 0 ? 0 : s.overlap,
            width: s.px,
            height: s.px,
            borderRadius: 9999,
            borderWidth: 2,
            borderColor: "#ffffff",
            zIndex: visible.length - i,
          }}
        >
          <Avatar name={name} size={size === "md" ? "sm" : "sm"} />
        </View>
      ))}
      {remaining > 0 && (
        <View
          className="bg-ash items-center justify-center rounded-full"
          style={{
            marginLeft: s.overlap,
            width: s.px,
            height: s.px,
            borderWidth: 2,
            borderColor: "#ffffff",
          }}
        >
          <Text className="font-body text-xs font-medium text-charcoal">
            +{remaining}
          </Text>
        </View>
      )}
    </View>
  );
}
