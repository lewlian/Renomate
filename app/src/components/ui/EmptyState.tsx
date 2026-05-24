import React from "react";
import { View, Text } from "react-native";
import type { LucideIcon } from "lucide-react-native";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-12">
      <Icon size={48} color="#B8B8C8" strokeWidth={1.5} />
      <Text className="font-heading text-xl text-ink mt-4 text-center">
        {title}
      </Text>
      <Text className="font-body text-base text-slate mt-2 text-center">
        {description}
      </Text>
      {action && <View className="mt-6">{action}</View>}
    </View>
  );
}
