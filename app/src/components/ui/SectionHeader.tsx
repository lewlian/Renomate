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
        <Text className="font-body text-xs font-semibold uppercase tracking-wider text-violet">
          {overline}
        </Text>
      )}
      {title && (
        <Text className="font-heading text-3xl text-deep-charcoal">{title}</Text>
      )}
      {subtitle && (
        <Text className="font-body text-lg text-smoke">{subtitle}</Text>
      )}
    </View>
  );
}
