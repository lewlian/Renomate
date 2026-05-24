import React from "react";
import { View, Text } from "react-native";

type PillVariant = "pending" | "active" | "done" | "overdue" | "info";

interface StatusPillProps {
  variant: PillVariant;
  children: React.ReactNode;
}

const variantClasses: Record<PillVariant, { container: string; text: string }> = {
  pending: {
    container: "bg-mist",
    text: "text-charcoal",
  },
  active: {
    container: "bg-clay-soft",
    text: "text-clay-deep",
  },
  done: {
    container: "bg-success-soft",
    text: "text-success",
  },
  overdue: {
    container: "bg-error-soft",
    text: "text-error",
  },
  info: {
    container: "bg-linen",
    text: "text-info",
  },
};

export function StatusPill({ variant, children }: StatusPillProps) {
  const v = variantClasses[variant];

  return (
    <View className={`rounded-full px-3 py-1 self-start ${v.container}`}>
      <Text className={`font-body text-xs font-medium ${v.text}`}>
        {children}
      </Text>
    </View>
  );
}
