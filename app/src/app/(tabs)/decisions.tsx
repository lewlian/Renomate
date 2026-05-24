import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { ListChecks } from "lucide-react-native";
import { useAuth } from "@/hooks/useAuth";
import { getMockDecisions } from "@/lib/mock-data";
import type { DecisionStatus } from "@/lib/types";

type Filter = "all" | "pending" | "overdue" | "decided";

const statusToPill: Record<
  DecisionStatus,
  { status: "pending" | "active" | "done" | "overdue" | "info"; label: string }
> = {
  pending: { status: "pending", label: "Pending" },
  overdue: { status: "overdue", label: "Overdue" },
  decided: { status: "done", label: "Decided" },
  not_needed: { status: "info", label: "Not needed" },
};

export default function DecisionsScreen() {
  const [filter, setFilter] = useState<Filter>("all");
  const { role } = useAuth();
  const allDecisions = getMockDecisions();

  const filtered =
    filter === "all"
      ? allDecisions
      : allDecisions.filter((d) => d.status === filter);

  const counts = {
    all: allDecisions.length,
    pending: allDecisions.filter((d) => d.status === "pending").length,
    overdue: allDecisions.filter((d) => d.status === "overdue").length,
    decided: allDecisions.filter((d) => d.status === "decided").length,
  };

  const formatDate = (iso: string | null) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-SG", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-mint-bg" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-4 mb-4">
          <SectionHeader overline="Decisions" title="Your decision queue" />
        </View>

        {role === "designer" && (
          <View className="mb-4">
            <Button
              variant="accent"
              onPress={() => router.push("/decisions/create")}
            >
              Create decision
            </Button>
          </View>
        )}

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-5"
          contentContainerClassName="gap-2"
        >
          {(["all", "pending", "overdue", "decided"] as Filter[]).map((f) => (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              className={`px-4 py-2 rounded-full border ${
                filter === f
                  ? "bg-ink border-ink"
                  : "bg-mint-bg border-cloud"
              }`}
            >
              <Text
                className={`font-body text-sm capitalize ${
                  filter === f ? "text-paper font-medium" : "text-charcoal"
                }`}
              >
                {f} ({counts[f]})
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {filtered.length === 0 ? (
          <EmptyState
            icon={ListChecks}
            title="No decisions here"
            description="Nothing matches this filter right now."
          />
        ) : (
          <View className="gap-3">
            {filtered.map((decision) => {
              const pill = statusToPill[decision.status];
              return (
                <Card
                  key={decision.id}
                  onPress={() => router.push(`/decisions/${decision.id}`)}
                >
                  <View className="flex-row items-start justify-between mb-2">
                    <Text className="font-heading text-lg text-ink flex-1 mr-3">
                      {decision.title}
                    </Text>
                    <StatusPill variant={pill.status}>{pill.label}</StatusPill>
                  </View>

                  {decision.description && (
                    <Text
                      className="font-body text-sm text-charcoal mb-2"
                      numberOfLines={2}
                    >
                      {decision.description}
                    </Text>
                  )}

                  <View className="flex-row items-center gap-4">
                    {decision.deadline && (
                      <Text className="font-body text-xs text-slate">
                        Due {formatDate(decision.deadline)}
                      </Text>
                    )}
                    {decision.decided_at && (
                      <Text className="font-body text-xs text-sage">
                        Decided {formatDate(decision.decided_at)}
                      </Text>
                    )}
                  </View>
                </Card>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
