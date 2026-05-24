import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";
import { StatusPill } from "@/components/ui/StatusPill";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import {
  getCurrentPhase,
  getPendingDecisions,
  getOverdueInvoices,
  getMockProject,
  getMockPhases,
} from "@/lib/mock-data";

export default function HomeScreen() {
  const { user, role, switchRole } = useAuth();
  const project = getMockProject();
  const currentPhase = getCurrentPhase();
  const pendingDecisions = getPendingDecisions();
  const overdueInvoices = getOverdueInvoices();
  const phases = getMockPhases();
  const completedCount = phases.filter((p) => p.status === "complete").length;

  return (
    <SafeAreaView className="flex-1 bg-paper" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between mt-4 mb-6">
          <View className="flex-1">
            <Text className="font-body text-sm text-slate">Good morning,</Text>
            <Text className="font-display text-2xl text-ink">
              {user?.full_name?.split(" ")[0] ?? "there"}
            </Text>
          </View>
          <Pressable onPress={switchRole}>
            <Avatar name={user?.full_name ?? "U"} size="md" />
          </Pressable>
        </View>

        <View className="mb-2">
          <Text className="font-body text-xs uppercase tracking-widest text-clay-deep font-medium mb-1">
            {role === "designer" ? "Managing" : "Your project"}
          </Text>
          <Text className="font-display text-lg text-ink" numberOfLines={1}>
            {project.name}
          </Text>
        </View>

        <Card className="mb-4 mt-4">
          <Text className="font-body text-xs uppercase tracking-widest text-slate font-medium mb-2">
            Where you are now
          </Text>
          <Text className="font-display text-xl text-ink mb-1">
            {currentPhase?.name ?? "Not started"}
          </Text>
          <Text className="font-body text-sm text-slate">
            Phase {completedCount + 1} of {phases.length}
            {pendingDecisions.length > 0
              ? ` · ${pendingDecisions.length} decision${pendingDecisions.length > 1 ? "s" : ""} pending`
              : ""}
          </Text>
          <View className="mt-4 h-1.5 bg-linen rounded-full overflow-hidden">
            <View
              className="h-full bg-clay rounded-full"
              style={{
                width: `${(completedCount / phases.length) * 100}%`,
              }}
            />
          </View>
        </Card>

        {pendingDecisions.length > 0 && (
          <Card className="mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-body text-xs uppercase tracking-widest text-slate font-medium">
                Next decision needed
              </Text>
              <StatusPill
                variant={
                  pendingDecisions[0].status === "overdue"
                    ? "overdue"
                    : "pending"
                }
              >
                {pendingDecisions[0].status === "overdue"
                  ? "Overdue"
                  : "Pending"}
              </StatusPill>
            </View>
            <Text className="font-display text-lg text-ink mb-1">
              {pendingDecisions[0].title}
            </Text>
            {pendingDecisions[0].deadline && (
              <Text className="font-body text-sm text-slate">
                Due{" "}
                {new Date(pendingDecisions[0].deadline).toLocaleDateString(
                  "en-SG",
                  { day: "numeric", month: "short" }
                )}
              </Text>
            )}
          </Card>
        )}

        {overdueInvoices.length > 0 && (
          <Card className="mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="font-body text-xs uppercase tracking-widest text-slate font-medium">
                Outstanding invoice
              </Text>
              <StatusPill variant="overdue">Overdue</StatusPill>
            </View>
            <Text className="font-mono text-lg text-ink mb-1">
              SGD{" "}
              {overdueInvoices[0].amount.toLocaleString("en-SG", {
                minimumFractionDigits: 2,
              })}
            </Text>
            <Text className="font-body text-sm text-slate">
              {overdueInvoices[0].invoice_number} ·{" "}
              {overdueInvoices[0].title}
            </Text>
          </Card>
        )}

        <View className="mt-2 py-3 border-t border-mist">
          <Text className="font-body text-xs text-mist text-center">
            {role === "client" ? "Client" : "Designer"} view · Tap avatar to
            switch
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
