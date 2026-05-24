import { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

const formatSGD = (amount: number) =>
  `SGD ${Math.abs(amount).toLocaleString("en-SG", { minimumFractionDigits: 2 })}`;

export default function CreateChangeOrderScreen() {
  const { role } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<{ title?: string; amount?: string }>({});

  if (role !== "designer") {
    return (
      <SafeAreaView className="flex-1 bg-paper" edges={["top"]}>
        <View className="px-6 mt-4">
          <Pressable onPress={() => router.back()} className="min-w-[44px] min-h-[44px] items-start justify-center mb-4">
            <ArrowLeft size={24} color="#161513" strokeWidth={1.5} />
          </Pressable>
          <Text className="font-display text-2xl text-ink">
            Access denied
          </Text>
          <Text className="font-body text-base text-charcoal mt-2">
            Only designers can propose change orders.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const parsedAmount = parseFloat(amount);
  const isValidNumber = !isNaN(parsedAmount) && amount.trim().length > 0;
  const prefix = isValidNumber
    ? parsedAmount >= 0
      ? "+"
      : "-"
    : "+/-";

  const handleSubmit = () => {
    const newErrors: { title?: string; amount?: string } = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!isValidNumber) {
      newErrors.amount = "Enter a valid amount";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    Alert.alert(
      "Change order proposed",
      `"${title}" for ${prefix}${formatSGD(parsedAmount)} has been proposed.`
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-paper" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-8"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Pressable onPress={() => router.back()} className="min-w-[44px] min-h-[44px] items-start justify-center mt-4 mb-4">
          <ArrowLeft size={24} color="#161513" strokeWidth={1.5} />
        </Pressable>

        <View className="mb-6">
          <SectionHeader overline="Change order" title="Propose change" />
        </View>

        <View className="gap-4">
          <Input
            label="Title"
            value={title}
            onChangeText={(v) => {
              setTitle(v);
              if (errors.title) setErrors((e) => ({ ...e, title: undefined }));
            }}
            placeholder="e.g. Upgrade kitchen cabinet hinges"
            error={errors.title}
          />

          <Input
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the change"
            multiline
            optional
          />

          <View>
            <Text className="font-body text-sm font-medium text-charcoal mb-1">
              Amount
            </Text>
            <View className="flex-row items-center">
              <View className="bg-linen rounded-l-sm border border-mist border-r-0 min-h-[44px] px-3 justify-center">
                <Text className="font-mono text-base text-slate">
                  {prefix} SGD
                </Text>
              </View>
              <View className="flex-1">
                <Input
                  label=""
                  value={amount}
                  onChangeText={(v) => {
                    setAmount(v);
                    if (errors.amount)
                      setErrors((e) => ({ ...e, amount: undefined }));
                  }}
                  placeholder="0.00"
                  keyboardType="numeric"
                  error={errors.amount}
                />
              </View>
            </View>
            <Text className="font-body text-xs text-slate mt-1">
              Use a negative value to indicate a credit.
            </Text>
          </View>

          <View className="mt-4">
            <Button variant="accent" onPress={handleSubmit}>
              Propose change order
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
