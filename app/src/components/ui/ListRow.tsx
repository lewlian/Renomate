import React from "react";
import { View, Text, Pressable } from "react-native";

interface ListRowProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  showDivider?: boolean;
}

export function ListRow({
  title,
  subtitle,
  right,
  onPress,
  showDivider = true,
}: ListRowProps) {
  const content = (
    <View
      className={`flex-row items-center justify-between py-4 px-4 ${showDivider ? "border-b border-ash" : ""}`}
    >
      <View className="flex-1 mr-3">
        <Text className="font-body text-base text-deep-charcoal">{title}</Text>
        {subtitle && (
          <Text className="font-body text-sm text-smoke mt-0.5">
            {subtitle}
          </Text>
        )}
      </View>
      {right && <View>{right}</View>}
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className="min-h-[48px]"
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}
