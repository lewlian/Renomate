import { useState } from "react";
import { Alert, View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/EmptyState";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { ColorCard } from "@/components/ui/ColorCard";
import { MessageSquare, Send } from "lucide-react-native";
import { useAuth } from "@/hooks/useAuth";
import { getMockChannels, mockMessages, mockClient, mockDesigner } from "@/lib/mock-data";
import type { Channel } from "@/lib/types";

export default function ChannelsScreen() {
  const { role } = useAuth();
  const channels = getMockChannels();
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

  if (selectedChannel) {
    return (
      <ChannelThread
        channel={selectedChannel}
        onBack={() => setSelectedChannel(null)}
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-4 mb-4">
          <SectionHeader
            overline="Channels"
            title="Project conversations"
            subtitle={role === "designer" ? "You manage all channels. Sub-contractors join via invite link." : "One channel per trade. Sub-contractors join their own."}
          />
        </View>

        {channels.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="No channels yet"
            description="Your designer will set up channels for each trade."
          />
        ) : (
          <View className="gap-3">
            {channels.map((ch) => {
              const channelMsgs = mockMessages.filter(
                (m) => m.channel_id === ch.id
              );
              const lastMsg = channelMsgs[channelMsgs.length - 1];
              const participantNames = ch.is_main
                ? ["Sarah Tan", "Marcus Chen", "Ahmad Razak", "Priya Nair"]
                : ["Sarah Tan", "Marcus Chen"];
              const content = (
                <>
                  <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 bg-hint-sky rounded-full items-center justify-center">
                      <MessageSquare
                        size={18}
                        color="#b3b3b3"
                        strokeWidth={1.5}
                      />
                    </View>
                    <View className="flex-1">
                      <View className="flex-row items-center gap-2">
                        <Text className="font-body text-base font-semibold text-deep-charcoal">
                          {ch.name}
                        </Text>
                        {ch.is_main && (
                          <View className="bg-tint-blue px-2 py-0.5 rounded-full">
                            <Text className="font-body text-[10px] text-violet font-medium">
                              Main
                            </Text>
                          </View>
                        )}
                      </View>
                      {lastMsg && (
                        <Text
                          className="font-body text-sm text-smoke"
                          numberOfLines={1}
                        >
                          {lastMsg.body}
                        </Text>
                      )}
                    </View>
                    {lastMsg && (
                      <Text className="font-body text-xs text-smoke">
                        {new Date(lastMsg.created_at).toLocaleDateString(
                          "en-SG",
                          { day: "numeric", month: "short" }
                        )}
                      </Text>
                    )}
                  </View>
                  <View className="mt-2 ml-[52px]">
                    <AvatarStack names={participantNames} max={3} size="sm" />
                  </View>
                </>
              );

              if (ch.is_main) {
                return (
                  <ColorCard key={ch.id} color="lavender" onPress={() => setSelectedChannel(ch)}>
                    {content}
                  </ColorCard>
                );
              }

              return (
                <Card key={ch.id} onPress={() => setSelectedChannel(ch)}>
                  {content}
                </Card>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function ChannelThread({
  channel,
  onBack,
}: {
  channel: Channel;
  onBack: () => void;
}) {
  const [draft, setDraft] = useState("");
  const messages = mockMessages.filter((m) => m.channel_id === channel.id);

  const getUserName = (userId: string): string => {
    if (userId === mockClient.id) return mockClient.full_name ?? "Client";
    if (userId === mockDesigner.id) return mockDesigner.full_name ?? "Designer";
    return "Unknown";
  };

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={["top"]}>
      <View className="flex-row items-center gap-3 px-6 py-4 border-b border-ash">
        <Pressable onPress={onBack} className="min-w-[48px] min-h-[48px] items-start justify-center">
          <Text className="font-body text-base text-violet">← Back</Text>
        </Pressable>
        <Text className="font-body text-base font-semibold text-deep-charcoal flex-1">
          {channel.name}
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-6"
        contentContainerClassName="py-4 gap-4"
      >
        {messages.map((msg) => {
          const name = getUserName(msg.user_id);
          const isClient = msg.user_id === mockClient.id;
          return (
            <View
              key={msg.id}
              className={`flex-row gap-3 ${isClient ? "flex-row-reverse" : ""}`}
            >
              <Avatar name={name} size="sm" />
              <View
                className={`flex-1 ${isClient ? "items-end" : "items-start"}`}
              >
                <View className="flex-row items-center gap-2 mb-1">
                  <Text className="font-body text-xs font-medium text-charcoal">
                    {name}
                  </Text>
                  <Text className="font-body text-[10px] text-smoke">
                    {new Date(msg.created_at).toLocaleTimeString("en-SG", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
                <View
                  className={`rounded-md px-4 py-3 max-w-[85%] ${
                    isClient ? "bg-tint-blue" : "bg-hint-sky"
                  }`}
                >
                  <Text className="font-body text-sm text-deep-charcoal">
                    {msg.body}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View className="px-6 py-3 border-t border-ash bg-canvas flex-row items-end gap-3">
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder="Type a message..."
          placeholderTextColor="#b3b3b3"
          multiline
          className="flex-1 font-body text-base text-deep-charcoal bg-hint-sky rounded-md px-4 py-3 min-h-[48px] max-h-24"
        />
        <Pressable
          className="w-11 h-11 bg-violet rounded-full items-center justify-center"
          onPress={() => {
            if (draft.trim().length > 0) {
              Alert.alert("Message sending will be wired to Supabase Realtime.");
            }
            setDraft("");
          }}
        >
          <Send size={18} color="#ffffff" strokeWidth={1.5} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
