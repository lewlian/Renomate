import { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export default function CreateInvoiceScreen() {
  const { role } = useAuth();
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2026-0090");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
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
            Only designers can create invoices.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSubmit = () => {
    const newErrors: { title?: string; amount?: string } = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    const parsedAmount = parseFloat(amount);
    if (!amount.trim() || isNaN(parsedAmount) || parsedAmount <= 0) {
      newErrors.amount = "Enter a valid amount";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    Alert.alert("Invoice issued", `Invoice ${invoiceNumber} has been issued.`);
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
          <SectionHeader overline="New invoice" title="Issue invoice" />
        </View>

        <View className="gap-4">
          <Input
            label="Invoice number"
            value={invoiceNumber}
            onChangeText={setInvoiceNumber}
            placeholder="INV-2026-0090"
          />

          <Input
            label="Title"
            value={title}
            onChangeText={(v) => {
              setTitle(v);
              if (errors.title) setErrors((e) => ({ ...e, title: undefined }));
            }}
            placeholder="e.g. Carpentry milestone"
            error={errors.title}
          />

          <Input
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Invoice description"
            multiline
            optional
          />

          <View>
            <Text className="font-body text-sm font-medium text-charcoal mb-1">
              Amount
            </Text>
            <View className="flex-row items-center">
              <View className="bg-linen rounded-l-sm border border-mist border-r-0 min-h-[44px] px-3 justify-center">
                <Text className="font-mono text-base text-slate">SGD</Text>
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
          </View>

          <Input
            label="Due date"
            value={dueDate}
            onChangeText={setDueDate}
            placeholder="YYYY-MM-DD"
            optional
          />

          <View className="mt-4">
            <Button variant="accent" onPress={handleSubmit}>
              Issue invoice
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
