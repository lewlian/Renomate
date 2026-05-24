import { Stack } from "expo-router";

export default function ProjectSetupLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "New project",
        headerBackTitle: "Back",
        headerTitleStyle: {
          fontFamily: "Fraunces",
          fontSize: 18,
        },
        headerTintColor: "#1A1A2E",
        headerStyle: {
          backgroundColor: "#E8F5F0",
        },
      }}
    />
  );
}
