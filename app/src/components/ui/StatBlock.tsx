import React from "react";
import { View, Text } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { ColorCard } from "./ColorCard";

type ColorName = "sand" | "lavender" | "peach" | "sage" | "sky" | "coral";

interface StatBlockProps {
  value: string | number;
  label: string;
  color: ColorName;
  icon?: LucideIcon;
}

export function StatBlock({ value, label, color, icon: Icon }: StatBlockProps) {
  return (
    <ColorCard color={color}>
      <View className="items-center">
        {Icon && <Icon size={24} color="#b3b3b3" strokeWidth={1.5} />}
        <Text className="font-heading text-2xl text-deep-charcoal">{value}</Text>
        <Text className="font-body text-xs text-charcoal mt-1">{label}</Text>
      </View>
    </ColorCard>
  );
}
