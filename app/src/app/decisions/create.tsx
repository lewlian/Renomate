import { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ArrowLeft, X } from "lucide-react-native";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function CreateDecisionScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const updateOption = (index: number, value: string) => {
    setOptions((prev) => prev.map((o, i) => (i === index ? value : o)));
  };

  const addOption = () => {
    setOptions((prev) => [...prev, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length <= 1) return;
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCreate = () => {
    if (!title.trim()) {
      Alert.alert("Title required", "Please enter a title for the decision.");
      return;
    }
    Alert.alert("Decision created", "The decision has been created successfully.");
  };

  return (
    <SafeAreaView className="flex-1 bg-paper" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-8"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable onPress={() => router.back()} className="mt-4 mb-4">
          <ArrowLeft size={24} color="#161513" strokeWidth={1.5} />
        </Pressable>

        <View className="mb-6">
          <SectionHeader overline="New" title="Create decision" />
        </View>

        <View className="gap-5">
          <Input
            label="Title"
            placeholder="e.g. Kitchen countertop material"
            value={title}
            onChangeText={setTitle}
          />

          <Input
            label="Description"
            placeholder="Add context to help the client decide"
            value={description}
            onChangeText={setDescription}
            multiline
            optional
          />

          <Input
            label="Deadline"
            placeholder="YYYY-MM-DD"
            value={deadline}
            onChangeText={setDeadline}
            keyboardType="numbers-and-punctuation"
          />

          <View>
            <Text className="font-body text-sm font-medium text-charcoal mb-2">
              Options
            </Text>
            <View className="gap-3">
              {options.map((option, index) => (
                <View key={index} className="flex-row items-center gap-2">
                  <View className="flex-1">
                    <Input
                      label={`Option ${index + 1}`}
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChangeText={(text) => updateOption(index, text)}
                    />
                  </View>
                  {options.length > 1 && (
                    <Pressable
                      onPress={() => removeOption(index)}
                      className="mt-5 p-2"
                    >
                      <X size={20} color="#6E6A65" strokeWidth={1.5} />
                    </Pressable>
                  )}
                </View>
              ))}
            </View>
            <Pressable onPress={addOption} className="mt-3">
              <Text className="font-body text-sm font-medium text-clay">
                + Add option
              </Text>
            </Pressable>
          </View>

          <View className="mt-2">
            <Button variant="accent" onPress={handleCreate}>
              Create decision
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
