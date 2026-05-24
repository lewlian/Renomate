import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { StatusPill } from "@/components/ui/StatusPill";
import {
  getMockQuotation,
  getMockInvoices,
  mockChangeOrders,
} from "@/lib/mock-data";
import type { InvoiceStatus, ChangeOrderStatus } from "@/lib/types";

type Tab = "quotation" | "invoices" | "changes";

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

const changeStatusPill: Record<
  ChangeOrderStatus,
  { status: "pending" | "active" | "done" | "overdue" | "info"; label: string }
> = {
  proposed: { status: "pending", label: "Proposed" },
  approved: { status: "done", label: "Approved" },
  rejected: { status: "overdue", label: "Rejected" },
  withdrawn: { status: "info", label: "Withdrawn" },
};

const formatSGD = (amount: number) =>
  `SGD ${amount.toLocaleString("en-SG", { minimumFractionDigits: 2 })}`;

export default function MoneyScreen() {
  const [tab, setTab] = useState<Tab>("quotation");
  const quotationData = getMockQuotation();
  const quotation = quotationData;
  const lines = quotationData.lines;
  const invoices = getMockInvoices();
  const changeOrders = mockChangeOrders;

  const totalPaid = invoices
    .filter((i) => i.status === "paid")
    .reduce((s, i) => s + i.amount, 0);
  const totalOutstanding = invoices
    .filter((i) => i.status !== "paid" && i.status !== "void" && i.status !== "draft")
    .reduce((s, i) => s + i.amount - i.paid_amount, 0);

  return (
    <SafeAreaView className="flex-1 bg-paper" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="mt-4 mb-4">
          <SectionHeader overline="Money" title="Prices and payments" />
        </View>

        <Card className="mb-5">
          <View className="flex-row justify-between">
            <View>
              <Text className="font-body text-xs text-slate uppercase tracking-wider">
                Total paid
              </Text>
              <Text className="font-mono text-lg text-success">
                {formatSGD(totalPaid)}
              </Text>
            </View>
            <View className="items-end">
              <Text className="font-body text-xs text-slate uppercase tracking-wider">
                Outstanding
              </Text>
              <Text className="font-mono text-lg text-error">
                {formatSGD(totalOutstanding)}
              </Text>
            </View>
          </View>
        </Card>

        <View className="flex-row mb-5 border-b border-mist">
          {(["quotation", "invoices", "changes"] as Tab[]).map((t) => (
            <Pressable
              key={t}
              onPress={() => setTab(t)}
              className={`flex-1 py-3 items-center border-b-2 ${
                tab === t ? "border-clay" : "border-transparent"
              }`}
            >
              <Text
                className={`font-body text-sm capitalize ${
                  tab === t ? "text-ink font-semibold" : "text-slate"
                }`}
              >
                {t === "changes" ? "Changes" : t.charAt(0).toUpperCase() + t.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        {tab === "quotation" && (
          <View>
            <Card className="mb-3">
              <Text className="font-body text-xs text-slate uppercase tracking-wider mb-3">
                Quotation v{quotation.version}
              </Text>
              {lines.map((line, i) => (
                <View
                  key={line.id}
                  className={`flex-row justify-between py-3 ${
                    i > 0 ? "border-t border-linen" : ""
                  }`}
                >
                  <View className="flex-1">
                    <Text className="font-body text-sm text-ink">
                      {line.category}
                    </Text>
                    {line.description ? (
                      <Text className="font-body text-xs text-slate" numberOfLines={1}>
                        {line.description}
                      </Text>
                    ) : null}
                  </View>
                  <Text className="font-mono text-sm text-ink">
                    {formatSGD(line.total)}
                  </Text>
                </View>
              ))}
              <View className="flex-row justify-between pt-3 border-t border-ink mt-1">
                <Text className="font-body text-sm font-semibold text-ink">
                  Total
                </Text>
                <Text className="font-mono text-base font-semibold text-ink">
                  {formatSGD(quotation.total_amount)}
                </Text>
              </View>
            </Card>
          </View>
        )}

        {tab === "invoices" && (
          <View className="gap-3">
            {invoices.map((inv) => {
              const pill = invoiceStatusPill[inv.status];
              return (
                <Card key={inv.id}>
                  <View className="flex-row items-start justify-between mb-2">
                    <View className="flex-1 mr-3">
                      <Text className="font-mono text-xs text-slate mb-1">
                        {inv.invoice_number}
                      </Text>
                      <Text className="font-display text-base text-ink">
                        {inv.title}
                      </Text>
                    </View>
                    <StatusPill variant={pill.status}>{pill.label}</StatusPill>
                  </View>
                  <View className="flex-row justify-between items-end">
                    <Text className="font-mono text-lg text-ink">
                      {formatSGD(inv.amount)}
                    </Text>
                    {inv.due_date && (
                      <Text className="font-body text-xs text-slate">
                        Due{" "}
                        {new Date(inv.due_date).toLocaleDateString("en-SG", {
                          day: "numeric",
                          month: "short",
                        })}
                      </Text>
                    )}
                  </View>
                </Card>
              );
            })}
          </View>
        )}

        {tab === "changes" && (
          <View className="gap-3">
            {changeOrders.map((co) => {
              const pill = changeStatusPill[co.status];
              return (
                <Card key={co.id}>
                  <View className="flex-row items-start justify-between mb-2">
                    <Text className="font-display text-base text-ink flex-1 mr-3">
                      {co.title}
                    </Text>
                    <StatusPill variant={pill.status}>{pill.label}</StatusPill>
                  </View>
                  {co.description && (
                    <Text className="font-body text-sm text-charcoal mb-2">
                      {co.description}
                    </Text>
                  )}
                  <Text
                    className={`font-mono text-base ${
                      co.amount_delta >= 0 ? "text-error" : "text-success"
                    }`}
                  >
                    {co.amount_delta >= 0 ? "+" : ""}
                    {formatSGD(co.amount_delta)}
                  </Text>
                </Card>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
