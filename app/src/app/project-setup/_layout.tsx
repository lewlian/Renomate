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
        headerTintColor: "#161513",
        headerStyle: {
          backgroundColor: "#FAF7F2",
        },
      }}
    />
  );
}
