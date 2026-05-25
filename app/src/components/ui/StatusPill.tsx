import React from "react";
import { View, Text } from "react-native";

type PillVariant = "pending" | "active" | "done" | "overdue" | "info";

interface StatusPillProps {
  variant: PillVariant;
  children: React.ReactNode;
}

const variantClasses: Record<PillVariant, { container: string; text: string }> = {
  pending: {
    container: "bg-hint-sky",
    text: "text-charcoal",
  },
  active: {
    container: "bg-tint-blue",
    text: "text-violet",
  },
  done: {
    container: "bg-green-50",
    text: "text-green-600",
  },
  overdue: {
    container: "bg-red-50",
    text: "text-red-500",
  },
  info: {
    container: "bg-tint-blue",
    text: "text-blue",
  },
};

export function StatusPill({ variant, children }: StatusPillProps) {
  const v = variantClasses[variant];

  return (
    <View className={`rounded-pill px-3 py-1.5 self-start ${v.container}`}>
      <Text className={`font-body text-xs font-medium ${v.text}`}>
        {children}
      </Text>
    </View>
  );
}
