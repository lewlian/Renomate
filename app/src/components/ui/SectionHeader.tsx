import React from "react";
import { View, Text } from "react-native";

interface SectionHeaderProps {
  overline?: string;
  title?: string;
  subtitle?: string;
}

export function SectionHeader({ overline, title, subtitle }: SectionHeaderProps) {
  return (
    <View className="gap-1">
      {overline && (
        <Text className="font-body text-xs font-medium uppercase tracking-wider text-clay-deep">
          {overline}
        </Text>
      )}
      {title && (
        <Text className="font-display text-4xl text-ink">{title}</Text>
      )}
      {subtitle && (
        <Text className="font-body text-lg text-charcoal">{subtitle}</Text>
      )}
    </View>
  );
}
