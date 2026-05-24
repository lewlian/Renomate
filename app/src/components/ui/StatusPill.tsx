import React from "react";
import { View, Text } from "react-native";

type PillVariant = "pending" | "active" | "done" | "overdue" | "info";

interface StatusPillProps {
  variant: PillVariant;
  children: React.ReactNode;
}

const variantClasses: Record<PillVariant, { container: string; text: string }> = {
  pending: {
    container: "bg-cloud",
    text: "text-charcoal",
  },
  active: {
    container: "bg-lavender-soft",
    text: "text-lavender",
  },
  done: {
    container: "bg-sage-soft",
    text: "text-sage",
  },
  overdue: {
    container: "bg-coral-soft",
    text: "text-coral",
  },
  info: {
    container: "bg-sky-soft",
    text: "text-sky",
  },
};

export function StatusPill({ variant, children }: StatusPillProps) {
  const v = variantClasses[variant];

  return (
    <View className={`rounded-full px-3 py-1.5 self-start ${v.container}`}>
      <Text className={`font-body text-xs font-medium ${v.text}`}>
        {children}
      </Text>
    </View>
  );
}
