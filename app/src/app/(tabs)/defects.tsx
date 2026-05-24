import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react-native";
import { getMockDefects } from "@/lib/mock-data";
import type { DefectStatus } from "@/lib/types";

const statusToPill: Record<
  DefectStatus,
  { status: "pending" | "active" | "done" | "overdue" | "info"; label: string }
> = {
  open: { status: "overdue", label: "Open" },
  acknowledged: { status: "active", label: "Acknowledged" },
  scheduled: { status: "active", label: "Scheduled" },
  fixed: { status: "done", label: "Fixed" },
  signed_off: { status: "done", label: "Signed off" },
  wont_fix: { status: "info", label: "Won't fix" },
};

export default function DefectsScreen() {
  const defects = getMockDefects();

  const formatDate = (iso: string | null) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-SG", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-paper" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-4 mb-4">
          <SectionHeader
            overline="Defects"
            title="Snag list"
            subtitle="Report and track issues found during or after renovation."
          />
        </View>

        <Button variant="secondary" size="md" onPress={() => {}} className="mb-5">
          Report a defect
        </Button>

        {defects.length === 0 ? (
          <EmptyState
            icon={AlertTriangle}
            title="No defects reported"
            description="When you spot an issue, tap 'Report a defect' to log it with photos."
          />
        ) : (
          <View className="gap-3">
            {defects.map((defect) => {
              const pill = statusToPill[defect.status];
              return (
                <Card key={defect.id}>
                  <View className="flex-row items-start justify-between mb-2">
                    <Text className="font-display text-base text-ink flex-1 mr-3">
                      {defect.title}
                    </Text>
                    <StatusPill variant={pill.status}>{pill.label}</StatusPill>
                  </View>

                  {defect.location_text && (
                    <Text className="font-body text-sm text-charcoal mb-2">
                      {defect.location_text}
                    </Text>
                  )}

                  {defect.description && (
                    <Text
                      className="font-body text-sm text-slate mb-2"
                      numberOfLines={2}
                    >
                      {defect.description}
                    </Text>
                  )}

                  <View className="flex-row items-center gap-4">
                    {defect.assigned_trade && (
                      <Text className="font-body text-xs text-slate capitalize">
                        {defect.assigned_trade}
                      </Text>
                    )}
                    <Text className="font-body text-xs text-slate">
                      Reported {formatDate(defect.created_at)}
                    </Text>
                    {defect.photo_file_ids.length > 0 && (
                      <Text className="font-body text-xs text-slate">
                        {defect.photo_file_ids.length} photo
                        {defect.photo_file_ids.length > 1 ? "s" : ""}
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
