import React from "react";
import { View, Text, Image } from "react-native";

type AvatarSize = "sm" | "md" | "lg";

interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: AvatarSize;
}

const sizeConfig: Record<AvatarSize, { container: string; text: string; px: number }> = {
  sm: { container: "w-8 h-8", text: "text-xs", px: 32 },
  md: { container: "w-10 h-10", text: "text-sm", px: 40 },
  lg: { container: "w-14 h-14", text: "text-lg", px: 56 },
};

const pastelBackgrounds = [
  "bg-tint-blue",
  "bg-hint-sky",
  "bg-tint-blue",
  "bg-hint-sky",
  "bg-tint-blue",
  "bg-hint-sky",
] as const;

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function getNameHash(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function Avatar({ name, imageUrl, size = "md" }: AvatarProps) {
  const s = sizeConfig[size];

  if (imageUrl) {
    return (
      <Image
        source={{ uri: imageUrl }}
        className={`${s.container} rounded-full`}
        style={{ width: s.px, height: s.px }}
      />
    );
  }

  const bgClass = pastelBackgrounds[getNameHash(name) % pastelBackgrounds.length];

  return (
    <View
      className={`${s.container} rounded-full ${bgClass} items-center justify-center`}
    >
      <Text className={`font-body font-medium text-deep-charcoal ${s.text}`}>
        {getInitials(name)}
      </Text>
    </View>
  );
}
