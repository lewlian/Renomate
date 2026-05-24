import { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { ArrowLeft, Upload } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { getMockInvoices } from "@/lib/mock-data";
import type { InvoiceStatus } from "@/lib/types";

const invoiceStatusPill: Record<
  InvoiceStatus,
  { status: "pending" | "active" | "done" | "overdue" | "info"; label: string }
> = {
  draft: { status: "info", label: "Draft" },
  issued: { status: "pending", label: "Issued" },
  partially_paid: { status: "active", label: "Partial" },
  paid: { status: "done", label: "Paid" },
  overdue: { status: "overdue", label: "Overdue" },
  void: { status: "info", label: "Void" },
};

const formatSGD = (amount: number) =>
  `SGD ${amount.toLocaleString("en-SG", { minimumFractionDigits: 2 })}`;

const formatDate = (iso: string | null) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function InvoiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { role } = useAuth();
  const invoices = getMockInvoices();
  const invoice = invoices.find((inv) => inv.id === id);
  const [receiptUri, setReceiptUri] = useState<string | null>(null);

  if (!invoice) {
    return (
      <SafeAreaView className="flex-1 bg-mint-bg" edges={["top"]}>
        <View className="px-6 mt-4">
          <Pressable onPress={() => router.back()} className="min-w-[48px] min-h-[48px] items-start justify-center mb-4">
            <ArrowLeft size={24} color="#1A1A2E" strokeWidth={1.5} />
          </Pressable>
          <Text className="font-heading text-2xl text-ink">
            Invoice not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const pill = invoiceStatusPill[invoice.status];
  const canMarkPaid =
    role === "client" &&
    (invoice.status === "issued" || invoice.status === "overdue");
  const canVoid = role === "designer" && invoice.status !== "void";

  const handlePickReceipt = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.8,
    });
    if (!result.canceled && result.assets.length > 0) {
      setReceiptUri(result.assets[0].uri);
    }
  };

  const handleMarkPaid = () => {
    Alert.alert("Payment recorded", "Invoice has been marked as paid.");
  };

  const handleVoid = () => {
    Alert.alert(
      "Void invoice",
      "Are you sure you want to void this invoice?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Void",
          style: "destructive",
          onPress: () =>
            Alert.alert("Invoice voided", "This invoice has been voided."),
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-mint-bg" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Pressable onPress={() => router.back()} className="min-w-[48px] min-h-[48px] items-start justify-center mt-4 mb-4">
          <ArrowLeft size={24} color="#1A1A2E" strokeWidth={1.5} />
        </Pressable>

        <View className="mb-4">
          <SectionHeader
            overline={invoice.invoice_number ?? "Invoice"}
            title={invoice.title ?? "Invoice"}
          />
        </View>

        <View className="mb-4">
          <StatusPill variant={pill.status}>{pill.label}</StatusPill>
        </View>

        {invoice.description ? (
          <Text className="font-body text-base text-charcoal mb-4">
            {invoice.description}
          </Text>
        ) : null}

        <Card className="mb-4">
          <Text className="font-body text-xs text-slate uppercase tracking-wider mb-1">
            Amount
          </Text>
          <Text className="font-mono text-2xl text-ink">
            {formatSGD(invoice.amount)}
          </Text>
        </Card>

        <Card className="mb-4">
          <View className="flex-row justify-between mb-3">
            <View>
              <Text className="font-body text-xs text-slate uppercase tracking-wider mb-1">
                Issued
              </Text>
              <Text className="font-body text-sm text-ink">
                {invoice.issued_at ? formatDate(invoice.issued_at) : "Not yet issued"}
              </Text>
            </View>
            <View className="items-end">
              <Text className="font-body text-xs text-slate uppercase tracking-wider mb-1">
                Due date
              </Text>
              <Text className="font-body text-sm text-ink">
                {invoice.due_date ? formatDate(invoice.due_date) : "N/A"}
              </Text>
            </View>
          </View>
        </Card>

        <Card className="mb-4">
          <Text className="font-body text-xs text-slate uppercase tracking-wider mb-2">
            Payment info
          </Text>
          <View className="flex-row justify-between mb-2">
            <Text className="font-body text-sm text-charcoal">Paid</Text>
            <Text className="font-mono text-sm text-ink">
              {formatSGD(invoice.paid_amount)}
            </Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="font-body text-sm text-charcoal">Total</Text>
            <Text className="font-mono text-sm text-ink">
              {formatSGD(invoice.amount)}
            </Text>
          </View>
          <View className="flex-row justify-between pt-2 border-t border-cloud">
            <Text className="font-body text-sm font-semibold text-charcoal">
              Balance
            </Text>
            <Text className="font-mono text-sm font-semibold text-ink">
              {formatSGD(invoice.amount - invoice.paid_amount)}
            </Text>
          </View>
          {invoice.paid_at ? (
            <Text className="font-body text-xs text-sage mt-2">
              Paid on {formatDate(invoice.paid_at)}
            </Text>
          ) : null}
        </Card>

        {canMarkPaid && (
          <View className="gap-3 mt-2">
            <Pressable
              onPress={handlePickReceipt}
              className="flex-row items-center justify-center rounded border border-cloud bg-mint-bg min-h-[48px] px-5 py-3"
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <Upload size={18} color="#7C7C8A" strokeWidth={1.5} />
              <Text className="font-body text-sm text-charcoal ml-2">
                {receiptUri ? "Receipt attached" : "Attach receipt photo"}
              </Text>
            </Pressable>
            <Button variant="accent" onPress={handleMarkPaid}>
              Mark as paid
            </Button>
          </View>
        )}

        {canVoid && (
          <View className="mt-4">
            <Button variant="destructive" onPress={handleVoid}>
              Void invoice
            </Button>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
