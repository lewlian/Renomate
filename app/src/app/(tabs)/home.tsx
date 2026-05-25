import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { ColorCard } from "@/components/ui/ColorCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
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
  const defects = getMockDefects();
  const completedCount = phases.filter((p) => p.status === "complete").length;
  const openDefects = defects.filter(
    (d) => d.status === "open" || d.status === "fixed"
  );
  const overdueTotal = overdueInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const nextThreePhases = phases
    .filter((p) => p.status === "in_progress" || p.status === "pending")
    .slice(0, 3);

  return (
    <>
      <Text className="font-body text-xs uppercase tracking-widest text-slate font-medium mb-3">
        Today
      </Text>
      <View className="flex-row gap-3 mb-6">
        <Pressable className="flex-1">
          <ColorCard color="sand" className="flex-1">
            <Text className="font-heading text-lg text-ink mb-1">
              {currentPhase?.name ?? "Not started"}
            </Text>
            <Text className="font-body text-xs text-charcoal mb-3">
              Phase {completedCount + 1} of {phases.length}
            </Text>
            <ProgressBar
              completed={completedCount}
              total={phases.length}
              color="bg-sage"
              showCount={false}
              size="sm"
            />
          </ColorCard>
        </Pressable>
        <Pressable className="flex-1">
          <ColorCard color="lavender" className="flex-1">
            {pendingDecisions.length > 0 ? (
              <>
                <Text
                  className="font-heading text-lg text-ink mb-1"
                  numberOfLines={2}
                >
                  {pendingDecisions[0].title}
                </Text>
                {pendingDecisions[0].deadline && (
                  <Text className="font-body text-xs text-charcoal">
                    Due{" "}
                    {new Date(pendingDecisions[0].deadline).toLocaleDateString(
                      "en-SG",
                      { day: "numeric", month: "short" }
                    )}
                  </Text>
                )}
              </>
            ) : (
              <>
                <Text className="font-heading text-lg text-ink mb-1">
                  All clear
                </Text>
                <Text className="font-body text-xs text-charcoal">
                  No pending decisions
                </Text>
              </>
            )}
          </ColorCard>
        </Pressable>
      </View>

      <Text className="font-body text-xs uppercase tracking-widest text-slate font-medium mb-3">
        Quick Stats
      </Text>
      <View className="flex-row gap-3 mb-6">
        <View className="flex-1 items-center">
          <Text className="font-mono text-2xl text-coral">
            {pendingDecisions.length}
          </Text>
          <Text className="font-body text-xs text-slate mt-1 text-center">
            Decisions pending
          </Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="font-mono text-2xl text-coral">
            {overdueTotal > 0
              ? `$${overdueTotal.toLocaleString("en-SG")}`
              : "$0"}
          </Text>
          <Text className="font-body text-xs text-slate mt-1 text-center">
            Invoices due
          </Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="font-mono text-2xl text-lavender">
            {openDefects.length}
          </Text>
          <Text className="font-body text-xs text-slate mt-1 text-center">
            Defects open
          </Text>
        </View>
      </View>

      <Text className="font-body text-xs uppercase tracking-widest text-slate font-medium mb-3">
        Project Progress
      </Text>
      <Card className="mb-4">
        <Text className="font-heading text-lg text-ink mb-3">
          {project.name}
        </Text>
        <ProgressBar
          completed={completedCount}
          total={phases.length}
          color="bg-sage"
          showCount
        />
        <View className="mt-4 gap-2">
          {nextThreePhases.map((phase) => (
            <View key={phase.id} className="flex-row items-center gap-3">
              <View
                className={`w-2.5 h-2.5 rounded-full ${
                  phase.status === "complete"
                    ? "bg-sage"
                    : phase.status === "in_progress"
                      ? "bg-coral"
                      : "bg-cloud"
                }`}
              />
              <Text className="font-body text-sm text-charcoal flex-1">
                {phase.name}
              </Text>
              <Text className="font-body text-xs text-slate">
                {phase.status === "in_progress" ? "Active" : "Upcoming"}
              </Text>
            </View>
          ))}
        </View>
      </Card>
    </>
  );
}

function DesignerHome() {
  const router = useRouter();
  const pendingDecisions = getPendingDecisions();
  const overdueInvoices = getOverdueInvoices();
  const defects = getMockDefects();
  const phases = getMockPhases();

  const openDefects = defects.filter(
    (d) => d.status === "open" || d.status === "fixed"
  );
  const overdueTotal = overdueInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const completedCount = phases.filter((p) => p.status === "complete").length;

  const quickActions: { label: string; icon: string; bg: string; route: string }[] = [
    { label: "New project", icon: "+", bg: "bg-coral-soft", route: "/project-setup" },
    { label: "Create decision", icon: "?", bg: "bg-lavender-soft", route: "/decisions/create" },
    { label: "Issue invoice", icon: "$", bg: "bg-sage-soft", route: "/invoices/create" },
    { label: "Report defect", icon: "!", bg: "bg-sky-soft", route: "/defects/create" },
  ];

  return (
    <>
      <Text className="font-body text-xs uppercase tracking-widest text-slate font-medium mb-3">
        Today&apos;s Schedule
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-6"
        contentContainerStyle={{ gap: 12 }}
      >
        <ColorCard color="sand" className="w-48">
          <Text className="font-heading text-lg text-ink mb-1">
            Review decisions
          </Text>
          <Text className="font-body text-sm text-charcoal">
            {pendingDecisions.length} pending
          </Text>
        </ColorCard>
        <ColorCard color="lavender" className="w-48">
          <Text className="font-heading text-lg text-ink mb-1">
            Overdue invoices
          </Text>
          <Text className="font-body text-sm text-charcoal">
            SGD{" "}
            {overdueTotal.toLocaleString("en-SG", {
              minimumFractionDigits: 2,
            })}
          </Text>
        </ColorCard>
      </ScrollView>

      <Text className="font-body text-xs uppercase tracking-widest text-slate font-medium mb-3">
        Stats
      </Text>
      <View className="flex-row gap-3 mb-6">
        <View className="flex-1 items-center">
          <Text className="font-mono text-2xl text-coral">
            {pendingDecisions.length}
          </Text>
          <Text className="font-body text-xs text-slate mt-1 text-center">
            Pending decisions
          </Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="font-mono text-2xl text-coral">
            {openDefects.length}
          </Text>
          <Text className="font-body text-xs text-slate mt-1 text-center">
            Open defects
          </Text>
        </View>
        <View className="flex-1 items-center">
          <Text className="font-mono text-2xl text-lavender">
            {completedCount}/{phases.length}
          </Text>
          <Text className="font-body text-xs text-slate mt-1 text-center">
            Phases done
          </Text>
        </View>
      </View>

      <Text className="font-body text-xs uppercase tracking-widest text-slate font-medium mb-3">
        Quick Actions
      </Text>
      <View className="flex-row flex-wrap gap-3 mb-4">
        {quickActions.map((action) => (
          <Card
            key={action.label}
            onPress={() => router.push(action.route as never)}
            className="w-[47%]"
          >
            <View className={`w-10 h-10 rounded-full ${action.bg} items-center justify-center mb-3`}>
              <Text className="font-heading text-lg text-ink">
                {action.icon}
              </Text>
            </View>
            <Text className="font-heading text-sm text-ink">
              {action.label}
            </Text>
          </Card>
        ))}
      </View>
    </>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function HomeScreen() {
  const { user, role, switchRole } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-mint-bg" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between mt-4 mb-6">
          <View className="flex-1">
            <Text className="font-body text-sm text-slate">{getGreeting()},</Text>
            <Text className="font-heading text-2xl text-ink">
              {user?.full_name?.split(" ")[0] ?? "there"}
            </Text>
          </View>
          <Pressable onPress={switchRole} className="min-w-[48px] min-h-[48px] items-center justify-center">
            <Avatar name={user?.full_name ?? "U"} size="md" />
          </Pressable>
        </View>

        {role === "designer" ? <DesignerHome /> : <ClientHome />}

        <View className="mt-2 py-3 border-t border-cloud">
          <Text className="font-body text-xs text-mist text-center">
            {role === "client" ? "Client" : "Designer"} view · Tap avatar to
            switch
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
