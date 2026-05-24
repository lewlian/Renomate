import { Tabs } from "expo-router";
import {
  Home,
  CalendarDays,
  ListChecks,
  DollarSign,
  AlertTriangle,
  FolderOpen,
  MessageSquare,
} from "lucide-react-native";
import { useAuth } from "@/hooks/useAuth";
import { colors } from "@/constants/colors";

const CLIENT_TABS = [
  { name: "home", label: "Home", Icon: Home },
  { name: "timeline", label: "Timeline", Icon: CalendarDays },
  { name: "decisions", label: "Decisions", Icon: ListChecks },
  { name: "money", label: "Money", Icon: DollarSign },
  { name: "defects", label: "Defects", Icon: AlertTriangle },
  { name: "files", label: "Files", Icon: FolderOpen },
  { name: "channels", label: "Channels", Icon: MessageSquare },
];

const DESIGNER_TABS = [
  { name: "home", label: "Home", Icon: Home },
  { name: "timeline", label: "Timeline", Icon: CalendarDays },
  { name: "decisions", label: "Decisions", Icon: ListChecks },
  { name: "money", label: "Money", Icon: DollarSign },
  { name: "defects", label: "Defects", Icon: AlertTriangle },
  { name: "files", label: "Files", Icon: FolderOpen },
  { name: "channels", label: "Channels", Icon: MessageSquare },
];

export default function TabsLayout() {
  const { role } = useAuth();
  const tabs = role === "designer" ? DESIGNER_TABS : CLIENT_TABS;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.cloud,
          borderTopWidth: 1,
          height: 84,
          paddingBottom: 24,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.coral,
        tabBarInactiveTintColor: colors.slate,
        tabBarLabelStyle: {
          fontFamily: "Inter-Medium",
          fontSize: 11,
          marginTop: 2,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.label,
            tabBarIcon: ({ color, size }) => (
              <tab.Icon size={20} color={color} strokeWidth={1.5} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
