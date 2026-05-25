import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useAuth } from "@/hooks/useAuth";
import { getMockPhases, getMockProject } from "@/lib/mock-data";
import type { PhaseStatus } from "@/lib/types";

const statusToPill: Record<PhaseStatus, { status: "done" | "active" | "pending" | "overdue"; label: string }> = {
  complete: { status: "done", label: "Complete" },
  in_progress: { status: "active", label: "In progress" },
  pending: { status: "pending", label: "Upcoming" },
  blocked: { status: "overdue", label: "Blocked" },
};

export default function TimelineScreen() {
  const { role } = useAuth();
  const phases = getMockPhases();
  const project = getMockProject();
  const completedCount = phases.filter((p) => p.status === "complete").length;

  const formatDate = (iso: string | null) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-SG", {
      day: "numeric",
      month: "short",
    });
  };

  const handleStartPhase = (phaseName: string) => {
    Alert.alert(
      "Start phase",
      `Mark "${phaseName}" as in progress?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Start", onPress: () => Alert.alert("Phase started", `${phaseName} is now in progress.`) },
      ]
    );
  };

  const handleCompletePhase = (phaseName: string) => {
    Alert.alert(
      "Complete phase",
      `Mark "${phaseName}" as complete?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Complete", onPress: () => Alert.alert("Phase completed", `${phaseName} has been marked as complete.`) },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-4 mb-6">
          <SectionHeader
            overline="Timeline"
            title="Project phases"
          />
        </View>

        <Card className="mb-6">
          <Text className="font-heading text-lg text-deep-charcoal mb-1">
            {project.name}
          </Text>
          <Text className="font-body text-sm text-smoke mb-3">
            {project.planned_start_date
              ? formatDate(project.planned_start_date)
              : "TBD"}{" "}
            →{" "}
            {project.planned_end_date
              ? formatDate(project.planned_end_date)
              : "TBD"}
          </Text>
          <ProgressBar
            completed={completedCount}
            total={phases.length}
            color="bg-green-500"
            showCount
          />
        </Card>

        <View className="gap-3">
          {phases.map((phase, i) => {
            const pill = statusToPill[phase.status];
            const isActive = phase.status === "in_progress";
            const isPending = phase.status === "pending";
            const isNextPending = isPending && (i === 0 || phases[i - 1].status === "complete" || phases[i - 1].status === "in_progress");
            return (
              <Card
                key={phase.id}
                className={isActive ? "border-violet" : ""}
              >
                <View className="flex-row items-start justify-between mb-2">
                  <View className="flex-row items-center gap-3 flex-1">
                    <View
                      className={`w-3 h-3 rounded-full ${
                        phase.status === "complete"
                          ? "bg-green-500"
                          : phase.status === "in_progress"
                            ? "bg-violet"
                            : "bg-ash"
                      }`}
                    />
                    <Text
                      className={`font-heading text-lg ${
                        isActive ? "text-deep-charcoal" : "text-charcoal"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")} {phase.name}
                    </Text>
                  </View>
                  <StatusPill variant={pill.status}>{pill.label}</StatusPill>
                </View>

                <View className="ml-6 mb-1">
                  <Text className="font-body text-sm text-smoke">
                    {formatDate(phase.planned_start)} –{" "}
                    {formatDate(phase.planned_end)}
                  </Text>
                </View>

                {isActive && (
                  <Text className="font-body text-xs uppercase tracking-widest text-violet font-medium ml-6 mt-1 mb-1">
                    You are here
                  </Text>
                )}

                {role === "designer" && isActive && (
                  <View className="mt-2 ml-6">
                    <Button
                      variant="secondary"
                      size="sm"
                      onPress={() => handleCompletePhase(phase.name)}
                    >
                      Mark as complete
                    </Button>
                  </View>
                )}

                {role === "designer" && isNextPending && !isActive && (
                  <View className="mt-2 ml-6">
                    <Button
                      variant="secondary"
                      size="sm"
                      onPress={() => handleStartPhase(phase.name)}
                    >
                      Start phase
                    </Button>
                  </View>
                )}
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
