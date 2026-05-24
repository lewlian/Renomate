import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

type PropertyType = "hdb" | "condo" | "landed" | "commercial";

interface PhaseEntry {
  id: string;
  name: string;
  plannedStart: string;
  plannedEnd: string;
}

const PROPERTY_TYPES: { label: string; value: PropertyType }[] = [
  { label: "HDB", value: "hdb" },
  { label: "Condo", value: "condo" },
  { label: "Landed", value: "landed" },
  { label: "Commercial", value: "commercial" },
];

const DEFAULT_PHASES: PhaseEntry[] = [
  { id: "1", name: "Hacking", plannedStart: "", plannedEnd: "" },
  { id: "2", name: "Masonry", plannedStart: "", plannedEnd: "" },
  { id: "3", name: "Plumbing", plannedStart: "", plannedEnd: "" },
  { id: "4", name: "Electrical", plannedStart: "", plannedEnd: "" },
  { id: "5", name: "Carpentry", plannedStart: "", plannedEnd: "" },
  { id: "6", name: "Painting", plannedStart: "", plannedEnd: "" },
  { id: "7", name: "Defect Period", plannedStart: "", plannedEnd: "" },
];

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <View className="flex-row items-center justify-center gap-2 py-4">
      {Array.from({ length: total }, (_, i) => i + 1).map((step) => (
        <View key={step} className="flex-row items-center gap-2">
          <View
            className={`w-8 h-8 rounded-full items-center justify-center ${
              step === current
                ? "bg-clay"
                : step < current
                  ? "bg-ink"
                  : "bg-mist"
            }`}
          >
            <Text
              className={`font-body text-sm font-semibold ${
                step <= current ? "text-paper" : "text-slate"
              }`}
            >
              {step}
            </Text>
          </View>
          {step < total && (
            <View
              className={`w-8 h-0.5 ${step < current ? "bg-ink" : "bg-mist"}`}
            />
          )}
        </View>
      ))}
    </View>
  );
}

function PropertyTypePicker({
  value,
  onChange,
}: {
  value: PropertyType | null;
  onChange: (v: PropertyType) => void;
}) {
  return (
    <View className="w-full">
      <Text className="font-body text-sm font-medium text-charcoal mb-1">
        Property type
      </Text>
      <View className="flex-row gap-2">
        {PROPERTY_TYPES.map((pt) => (
          <Pressable
            key={pt.value}
            onPress={() => onChange(pt.value)}
            className={`flex-1 items-center justify-center min-h-[44px] rounded border ${
              value === pt.value
                ? "border-clay bg-clay-soft"
                : "border-mist bg-white"
            }`}
          >
            <Text
              className={`font-body text-sm font-medium ${
                value === pt.value ? "text-clay-deep" : "text-charcoal"
              }`}
            >
              {pt.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function StepProjectDetails({
  name,
  setName,
  propertyType,
  setPropertyType,
  address,
  setAddress,
  unitSize,
  setUnitSize,
}: {
  name: string;
  setName: (v: string) => void;
  propertyType: PropertyType | null;
  setPropertyType: (v: PropertyType) => void;
  address: string;
  setAddress: (v: string) => void;
  unitSize: string;
  setUnitSize: (v: string) => void;
}) {
  return (
    <View className="gap-4">
      <Text className="font-display text-xl text-ink">Project details</Text>
      <Input
        label="Project name"
        placeholder="e.g. Tan family — Tampines #04-12"
        value={name}
        onChangeText={setName}
      />
      <PropertyTypePicker value={propertyType} onChange={setPropertyType} />
      <Input
        label="Address"
        placeholder="Block, street, unit number"
        value={address}
        onChangeText={setAddress}
      />
      <Input
        label="Unit size (sqft)"
        placeholder="e.g. 990"
        value={unitSize}
        onChangeText={setUnitSize}
        keyboardType="numeric"
      />
    </View>
  );
}

function StepTimeline({
  phases,
  setPhases,
}: {
  phases: PhaseEntry[];
  setPhases: (v: PhaseEntry[]) => void;
}) {
  const updatePhase = (id: string, field: keyof PhaseEntry, value: string) => {
    setPhases(
      phases.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const removePhase = (id: string) => {
    if (phases.length <= 1) return;
    setPhases(phases.filter((p) => p.id !== id));
  };

  const addPhase = () => {
    const nextId = String(Date.now());
    setPhases([
      ...phases,
      { id: nextId, name: "", plannedStart: "", plannedEnd: "" },
    ]);
  };

  return (
    <View className="gap-4">
      <Text className="font-display text-xl text-ink">Timeline phases</Text>
      <Text className="font-body text-sm text-slate">
        Pre-populated with common SG renovation phases. Edit names, dates, or
        add and remove as needed.
      </Text>

      {phases.map((phase, index) => (
        <Card key={phase.id} className="gap-3">
          <View className="flex-row items-center justify-between">
            <Text className="font-body text-xs uppercase tracking-widest text-slate font-medium">
              Phase {index + 1}
            </Text>
            {phases.length > 1 && (
              <Pressable onPress={() => removePhase(phase.id)}>
                <Text className="font-body text-sm text-error font-medium">
                  Remove
                </Text>
              </Pressable>
            )}
          </View>
          <Input
            label="Phase name"
            placeholder="e.g. Hacking"
            value={phase.name}
            onChangeText={(v) => updatePhase(phase.id, "name", v)}
          />
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Input
                label="Start date"
                placeholder="YYYY-MM-DD"
                value={phase.plannedStart}
                onChangeText={(v) => updatePhase(phase.id, "plannedStart", v)}
              />
            </View>
            <View className="flex-1">
              <Input
                label="End date"
                placeholder="YYYY-MM-DD"
                value={phase.plannedEnd}
                onChangeText={(v) => updatePhase(phase.id, "plannedEnd", v)}
              />
            </View>
          </View>
        </Card>
      ))}

      <Button variant="secondary" onPress={addPhase}>
        Add phase
      </Button>
    </View>
  );
}

function StepInviteClient({
  clientEmail,
  setClientEmail,
  clientPhone,
  setClientPhone,
}: {
  clientEmail: string;
  setClientEmail: (v: string) => void;
  clientPhone: string;
  setClientPhone: (v: string) => void;
}) {
  return (
    <View className="gap-4">
      <Text className="font-display text-xl text-ink">Invite client</Text>
      <Text className="font-body text-sm text-slate">
        Send an invitation to your client so they can track the project.
      </Text>
      <Input
        label="Email"
        placeholder="client@email.com"
        value={clientEmail}
        onChangeText={setClientEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        label="Phone"
        placeholder="+65 9123 4567"
        value={clientPhone}
        onChangeText={setClientPhone}
        keyboardType="phone-pad"
      />
    </View>
  );
}

export default function ProjectSetupScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null);
  const [address, setAddress] = useState("");
  const [unitSize, setUnitSize] = useState("");

  const [phases, setPhases] = useState<PhaseEntry[]>(
    DEFAULT_PHASES.map((p) => ({ ...p }))
  );

  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const handleNext = () => {
    if (step === 1 && !name.trim()) {
      Alert.alert("Required", "Please enter a project name.");
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCreate = () => {
    Alert.alert(
      "Project created",
      `"${name}" has been set up with ${phases.length} phases.`,
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-paper" edges={["bottom"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <StepIndicator current={step} total={3} />

        <ScrollView
          className="flex-1"
          contentContainerClassName="px-6 pb-8"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {step === 1 && (
            <StepProjectDetails
              name={name}
              setName={setName}
              propertyType={propertyType}
              setPropertyType={setPropertyType}
              address={address}
              setAddress={setAddress}
              unitSize={unitSize}
              setUnitSize={setUnitSize}
            />
          )}

          {step === 2 && (
            <StepTimeline phases={phases} setPhases={setPhases} />
          )}

          {step === 3 && (
            <StepInviteClient
              clientEmail={clientEmail}
              setClientEmail={setClientEmail}
              clientPhone={clientPhone}
              setClientPhone={setClientPhone}
            />
          )}
        </ScrollView>

        <View className="px-6 pb-4 pt-2 border-t border-mist">
          <View className="flex-row gap-3">
            {step > 1 && (
              <View className="flex-1">
                <Button variant="secondary" onPress={handleBack}>
                  Back
                </Button>
              </View>
            )}
            <View className="flex-1">
              {step < 3 ? (
                <Button variant="primary" onPress={handleNext}>
                  Next
                </Button>
              ) : (
                <Button variant="accent" onPress={handleCreate}>
                  Create project
                </Button>
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
