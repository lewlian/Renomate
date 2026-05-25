import { Stack } from "expo-router";

export default function ProjectSetupLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: "New project",
        headerBackTitle: "Back",
        headerTitleStyle: {
          fontFamily: "PlusJakartaSans-Bold",
          fontSize: 18,
        },
        headerTintColor: "#090c1d",
        headerStyle: {
          backgroundColor: "#ffffff",
        },
      }}
    />
  );
}
