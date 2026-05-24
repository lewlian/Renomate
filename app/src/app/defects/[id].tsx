import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { ArrowLeft, Camera } from "lucide-react-native";
import { StatusPill } from "@/components/ui/StatusPill";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { getMockDefects } from "@/lib/mock-data";
import type { DefectStatus, Trade } from "@/lib/types";

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

const allTrades: Trade[] = [
  "aircon",
  "carpentry",
  "electrical",
  "plumbing",
  "masonry",
  "glass",
  "painting",
  "flooring",
  "tiling",
  "general",
];

const timelineSteps: { key: DefectStatus; label: string }[] = [
  { key: "open", label: "Created" },
  { key: "acknowledged", label: "Acknowledged" },
  { key: "fixed", label: "Fixed" },
  { key: "signed_off", label: "Signed off" },
];

function getTimelineIndex(status: DefectStatus): number {
  switch (status) {
    case "open":
      return 0;
    case "acknowledged":
      return 1;
    case "scheduled":
      return 1;
    case "fixed":
      return 2;
    case "signed_off":
      return 3;
    case "wont_fix":
      return -1;
    default:
      return 0;
  }
}

export default function DefectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { role } = useAuth();
  const defects = getMockDefects();
  const defect = defects.find((d) => d.id === id);
  const [showTradeList, setShowTradeList] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(
    defect?.assigned_trade ?? null
  );

  const formatDate = (iso: string | null) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-SG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (!defect) {
    return (
      <SafeAreaView className="flex-1 bg-paper" edges={["top"]}>
        <View className="px-6 pt-4">
          <Pressable onPress={() => router.back()} className="mb-4">
            <ArrowLeft size={24} color="#161513" />
          </Pressable>
          <Text className="font-display text-xl text-ink">
            Defect not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const pill = statusToPill[defect.status];
  const currentIndex = getTimelineIndex(defect.status);

  return (
    <SafeAreaView className="flex-1 bg-paper" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => router.back()} className="mt-4 mb-4">
          <ArrowLeft size={24} color="#161513" />
        </Pressable>

        <View className="flex-row items-start justify-between mb-3">
          <Text className="font-display text-2xl text-ink flex-1 mr-3">
            {defect.title}
          </Text>
          <StatusPill variant={pill.status}>{pill.label}</StatusPill>
        </View>

        {defect.description && (
          <Text className="font-body text-base text-charcoal mb-4">
            {defect.description}
          </Text>
        )}

        <Card className="mb-4">
          <View className="gap-3">
            {defect.location_text && (
              <View>
                <Text className="font-body text-xs font-medium text-slate uppercase tracking-wider mb-1">
                  Location
                </Text>
                <Text className="font-body text-sm text-ink">
                  {defect.location_text}
                </Text>
              </View>
            )}

            {defect.assigned_trade && (
              <View>
                <Text className="font-body text-xs font-medium text-slate uppercase tracking-wider mb-1">
                  Assigned trade
                </Text>
                <Text className="font-body text-sm text-ink capitalize">
                  {defect.assigned_trade}
                </Text>
              </View>
            )}

            <View>
              <Text className="font-body text-xs font-medium text-slate uppercase tracking-wider mb-1">
                Reported
              </Text>
              <Text className="font-body text-sm text-ink">
                {formatDate(defect.created_at)}
              </Text>
            </View>
          </View>
        </Card>

        <Card className="mb-4">
          <Text className="font-display text-base text-ink mb-3">Photos</Text>
          {defect.photo_file_ids.length === 0 ? (
            <Text className="font-body text-sm text-slate">
              No photos attached
            </Text>
          ) : (
            <>
              <Text className="font-body text-sm text-charcoal mb-3">
                {defect.photo_file_ids.length} photo
                {defect.photo_file_ids.length > 1 ? "s" : ""}
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-3"
              >
                {defect.photo_file_ids.map((fileId) => (
                  <View
                    key={fileId}
                    className="w-24 h-24 rounded bg-mist items-center justify-center"
                  >
                    <Camera size={24} color="#A8A29B" />
                  </View>
                ))}
              </ScrollView>
            </>
          )}
        </Card>

        {role === "client" && defect.status === "fixed" && (
          <Button
            variant="accent"
            size="md"
            onPress={() =>
              Alert.alert(
                "Sign off",
                "Are you sure you want to sign off this defect as resolved?",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Sign off",
                    onPress: () =>
                      Alert.alert("Success", "Defect signed off."),
                  },
                ]
              )
            }
            className="mb-4"
          >
            Sign off
          </Button>
        )}

        {role === "designer" && (
          <View className="gap-3 mb-4">
            <View>
              <Pressable
                onPress={() => setShowTradeList(!showTradeList)}
                className="bg-white border border-mist rounded p-3 flex-row items-center justify-between"
              >
                <Text className="font-body text-base text-ink capitalize">
                  {selectedTrade ?? "Assign trade..."}
                </Text>
                <Text className="font-body text-sm text-slate">
                  {showTradeList ? "▲" : "▼"}
                </Text>
              </Pressable>
              {showTradeList && (
                <View className="bg-white border border-mist rounded mt-1">
                  {allTrades.map((trade) => (
                    <Pressable
                      key={trade}
                      onPress={() => {
                        setSelectedTrade(trade);
                        setShowTradeList(false);
                        Alert.alert(
                          "Trade assigned",
                          `Defect assigned to ${trade}.`
                        );
                      }}
                      className="p-3 border-b border-mist"
                    >
                      <Text
                        className={`font-body text-base capitalize ${
                          trade === selectedTrade ? "text-clay" : "text-ink"
                        }`}
                      >
                        {trade}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            <Button
              variant="primary"
              size="md"
              onPress={() =>
                Alert.alert(
                  "Mark as fixed",
                  "Are you sure you want to mark this defect as fixed?",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Confirm",
                      onPress: () =>
                        Alert.alert("Success", "Defect marked as fixed."),
                    },
                  ]
                )
              }
            >
              Mark as fixed
            </Button>
          </View>
        )}

        <Card>
          <Text className="font-display text-base text-ink mb-4">Timeline</Text>
          <View className="gap-0">
            {timelineSteps.map((step, index) => {
              const isReached = currentIndex >= index;
              const isCurrent = currentIndex === index;
              const isLast = index === timelineSteps.length - 1;

              return (
                <View key={step.key} className="flex-row">
                  <View className="items-center mr-3">
                    <View
                      className={`w-4 h-4 rounded-full border-2 ${
                        isCurrent
                          ? "bg-clay border-clay"
                          : isReached
                            ? "bg-ink border-ink"
                            : "bg-paper border-mist"
                      }`}
                    />
                    {!isLast && (
                      <View
                        className={`w-0.5 h-8 ${
                          isReached && index < currentIndex
                            ? "bg-ink"
                            : "bg-mist"
                        }`}
                      />
                    )}
                  </View>
                  <View className="pt-0 pb-2">
                    <Text
                      className={`font-body text-sm font-medium ${
                        isCurrent
                          ? "text-clay"
                          : isReached
                            ? "text-ink"
                            : "text-slate"
                      }`}
                    >
                      {step.label}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
