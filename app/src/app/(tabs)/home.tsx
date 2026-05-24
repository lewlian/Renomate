import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { StatusPill } from "@/components/ui/StatusPill";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import {
  getCurrentPhase,
  getPendingDecisions,
  getOverdueInvoices,
  getMockProject,
  getMockPhases,
  getMockDefects,
} from "@/lib/mock-data";

function ClientHome() {
  const project = getMockProject();
  const currentPhase = getCurrentPhase();
  const pendingDecisions = getPendingDecisions();
  const overdueInvoices = getOverdueInvoices();
  const phases = getMockPhases();
  const completedCount = phases.filter((p) => p.status === "complete").length;

  return (
    <>
      <View className="mb-2">
        <Text className="font-body text-xs uppercase tracking-widest text-clay-deep font-medium mb-1">
          Your project
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
    </>
  );
}

function DesignerHome() {
  const router = useRouter();
  const project = getMockProject();
  const pendingDecisions = getPendingDecisions();
  const overdueInvoices = getOverdueInvoices();
  const defects = getMockDefects();
  const phases = getMockPhases();

  const openDefects = defects.filter(
    (d) => d.status === "open" || d.status === "fixed"
  );

  const overdueTotal = overdueInvoices.reduce((sum, inv) => sum + inv.amount, 0);

  const nextPhase = phases.find((p) => p.status === "pending");

  return (
    <>
      <View className="mb-2">
        <Text className="font-body text-xs uppercase tracking-widest text-clay-deep font-medium mb-1">
          Managing
        </Text>
        <Text className="font-display text-lg text-ink" numberOfLines={1}>
          {project.name}
        </Text>
      </View>

      <Text className="font-display text-xl text-ink mt-4 mb-3">
        Today's overview
      </Text>

      <Card className="mb-4">
        <View className="flex-row justify-between">
          <View className="flex-1 items-center">
            <Text className="font-mono text-2xl text-ink">
              {pendingDecisions.length}
            </Text>
            <Text className="font-body text-xs text-slate mt-1 text-center">
              Pending decisions
            </Text>
          </View>
          <View className="w-px bg-mist" />
          <View className="flex-1 items-center">
            <Text className="font-mono text-2xl text-ink">
              {overdueInvoices.length > 0
                ? `$${overdueTotal.toLocaleString("en-SG")}`
                : "$0"}
            </Text>
            <Text className="font-body text-xs text-slate mt-1 text-center">
              Overdue invoices
            </Text>
          </View>
          <View className="w-px bg-mist" />
          <View className="flex-1 items-center">
            <Text className="font-mono text-2xl text-ink">
              {openDefects.length}
            </Text>
            <Text className="font-body text-xs text-slate mt-1 text-center">
              Open defects
            </Text>
          </View>
        </View>
      </Card>

      {nextPhase && (
        <Card className="mb-4">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="font-body text-xs uppercase tracking-widest text-slate font-medium">
              Upcoming phase
            </Text>
            <StatusPill variant="info">Next</StatusPill>
          </View>
          <Text className="font-display text-lg text-ink mb-1">
            {nextPhase.name}
          </Text>
          {nextPhase.planned_start && (
            <Text className="font-body text-sm text-slate">
              Starts{" "}
              {new Date(nextPhase.planned_start).toLocaleDateString("en-SG", {
                day: "numeric",
                month: "short",
              })}
            </Text>
          )}
        </Card>
      )}

      <Text className="font-body text-xs uppercase tracking-widest text-slate font-medium mb-3 mt-2">
        Quick actions
      </Text>

      <View className="gap-2 mb-4">
        <Button variant="accent" onPress={() => router.push("/project-setup")}>
          New project
        </Button>
        <Button variant="secondary" onPress={() => router.push("/decisions")}>
          Create decision
        </Button>
        <Button variant="secondary" onPress={() => router.push("/invoices")}>
          Issue invoice
        </Button>
        <Button variant="secondary" onPress={() => router.push("/defects")}>
          Report defect
        </Button>
      </View>
    </>
  );
}

export default function HomeScreen() {
  const { user, role, switchRole } = useAuth();

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

        {role === "designer" ? <DesignerHome /> : <ClientHome />}

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
