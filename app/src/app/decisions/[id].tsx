import { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { getMockDecisions } from "@/lib/mock-data";
import type { DecisionStatus } from "@/lib/types";

const statusToPill: Record<
  DecisionStatus,
  { status: "pending" | "active" | "done" | "overdue" | "info"; label: string }
> = {
  pending: { status: "pending", label: "Pending" },
  overdue: { status: "overdue", label: "Overdue" },
  decided: { status: "done", label: "Decided" },
  not_needed: { status: "info", label: "Not needed" },
};

export default function DecisionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { role } = useAuth();
  const decisions = getMockDecisions();
  const decision = decisions.find((d) => d.id === id);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  if (!decision) {
    return (
      <SafeAreaView className="flex-1 bg-paper" edges={["top"]}>
        <View className="px-6 mt-4">
          <Pressable onPress={() => router.back()} className="mb-4">
            <ArrowLeft size={24} color="#161513" strokeWidth={1.5} />
          </Pressable>
          <Text className="font-display text-2xl text-ink">
            Decision not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const pill = statusToPill[decision.status];
  const options = (decision.options ?? []) as { label: string; cost_delta?: number }[];
  const decidedValue = decision.decided_value as { label: string; cost_delta?: number } | null;
  const canConfirm =
    role === "client" &&
    (decision.status === "pending" || decision.status === "overdue");

  const formatDate = (iso: string | null) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-SG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleConfirm = () => {
    if (!selectedOption) {
      Alert.alert("Select an option", "Please select an option before confirming.");
      return;
    }
    Alert.alert("Decision recorded", "Your decision has been saved.");
  };

  return (
    <SafeAreaView className="flex-1 bg-paper" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => router.back()} className="mt-4 mb-4">
          <ArrowLeft size={24} color="#161513" strokeWidth={1.5} />
        </Pressable>

        <View className="mb-4">
          <SectionHeader overline="Decision" title={decision.title} />
        </View>

        <View className="mb-4">
          <StatusPill variant={pill.status}>{pill.label}</StatusPill>
        </View>

        {decision.description && (
          <Text className="font-body text-base text-charcoal mb-4">
            {decision.description}
          </Text>
        )}

        {decision.deadline && (
          <Text className="font-body text-sm text-slate mb-2">
            Deadline: {formatDate(decision.deadline)}
          </Text>
        )}

        {decision.decided_at && (
          <Text className="font-body text-sm text-success mb-2">
            Decided: {formatDate(decision.decided_at)}
          </Text>
        )}

        {decidedValue && (
          <View className="mt-4 mb-4">
            <Text className="font-body text-sm font-medium text-charcoal mb-2">
              Selected option
            </Text>
            <Card variant="elevated">
              <Text className="font-body text-base text-ink">
                {decidedValue.label}
              </Text>
            </Card>
          </View>
        )}

        {options.length > 0 && !decidedValue && (
          <View className="mt-4 mb-4">
            <Text className="font-body text-sm font-medium text-charcoal mb-2">
              Options
            </Text>
            <View className="gap-2">
              {options.map((option) => {
                const isSelected = selectedOption === option.label;
                return (
                  <Pressable
                    key={option.label}
                    onPress={
                      canConfirm ? () => setSelectedOption(option.label) : undefined
                    }
                    className={`rounded-md border p-4 ${
                      isSelected
                        ? "border-clay bg-clay-soft"
                        : "border-mist bg-paper"
                    }`}
                    style={({ pressed }) => ({
                      opacity: canConfirm && pressed ? 0.85 : 1,
                    })}
                  >
                    <Text className="font-body text-base text-ink">
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {options.length > 0 && decidedValue && (
          <View className="mt-2 mb-4">
            <Text className="font-body text-sm font-medium text-charcoal mb-2">
              Other options
            </Text>
            <View className="gap-2">
              {options
                .filter((o) => o.label !== decidedValue.label)
                .map((option) => (
                  <Card key={option.label}>
                    <Text className="font-body text-base text-slate">
                      {option.label}
                    </Text>
                  </Card>
                ))}
            </View>
          </View>
        )}

        {canConfirm && (
          <View className="mt-4">
            <Button variant="accent" onPress={handleConfirm}>
              Confirm decision
            </Button>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
