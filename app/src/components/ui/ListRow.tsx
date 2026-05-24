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
      className={`flex-row items-center justify-between py-4 px-4 ${showDivider ? "border-b border-mist" : ""}`}
    >
      <View className="flex-1 mr-3">
        <Text className="font-body text-base text-ink">{title}</Text>
        {subtitle && (
          <Text className="font-body text-sm text-slate mt-0.5">
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
        className="min-h-[44px]"
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}
