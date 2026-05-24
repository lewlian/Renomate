import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAuth } from "@/hooks/useAuth";
import {
  FolderOpen,
  FileText,
  Image,
  FileCheck,
} from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { getMockFiles } from "@/lib/mock-data";
import type { FileCategory } from "@/lib/types";

const categoryLabels: Record<FileCategory, string> = {
  quotation: "Quotation",
  contract: "Contract",
  permit: "Permit",
  render: "Render",
  warranty: "Warranty",
  receipt: "Receipt",
  photo: "Photo",
  other: "Other",
};

const categoryIcon = (cat: FileCategory) => {
  switch (cat) {
    case "render":
    case "photo":
      return Image;
    case "contract":
    case "permit":
      return FileCheck;
    default:
      return FileText;
  }
};

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function FilesScreen() {
  const { role } = useAuth();
  const files = getMockFiles();
  const categories = Array.from(new Set(files.map((f) => f.category)));

  const handleUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsMultipleSelection: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      Alert.alert(
        "File selected",
        `${result.assets.length} file${result.assets.length > 1 ? "s" : ""} ready to upload.\n\nUpload will be wired to Supabase Storage.`
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-mint-bg" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-4 mb-4">
          <SectionHeader
            overline="Files"
            title="Project documents"
            subtitle="All quotations, contracts, renders, permits, and photos in one place."
          />
        </View>

        <Button
          variant="secondary"
          size="md"
          onPress={handleUpload}
          className="mb-5"
        >
          Upload file
        </Button>

        {files.length === 0 ? (
          <EmptyState
            icon={FolderOpen}
            title="No files yet"
            description="Files uploaded to the project will appear here."
          />
        ) : (
          categories.map((cat) => {
            const catFiles = files.filter((f) => f.category === cat);
            const Icon = categoryIcon(cat);
            return (
              <View key={cat} className="mb-5">
                <Text className="font-body text-xs uppercase tracking-widest text-coral font-medium mb-3">
                  {categoryLabels[cat]} ({catFiles.length})
                </Text>
                <View className="gap-2">
                  {catFiles.map((file) => (
                    <Card key={file.id}>
                      <Pressable className="flex-row items-center gap-3">
                        <View className="w-10 h-10 bg-snow rounded items-center justify-center">
                          <Icon size={20} color="#7C7C8A" strokeWidth={1.5} />
                        </View>
                        <View className="flex-1">
                          <Text
                            className="font-body text-sm text-ink"
                            numberOfLines={1}
                          >
                            {file.name}
                          </Text>
                          <Text className="font-body text-xs text-slate">
                            {formatBytes(file.size_bytes)} ·{" "}
                            {new Date(file.created_at).toLocaleDateString(
                              "en-SG",
                              { day: "numeric", month: "short" }
                            )}
                          </Text>
                        </View>
                      </Pressable>
                    </Card>
                  ))}
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
