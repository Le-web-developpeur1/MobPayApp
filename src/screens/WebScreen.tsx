import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { COLORS } from "../constants";

export default function WebScreen() {
  const route = useRoute();
  const { url } = route.params as { url: string };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <StatusBar style="light" backgroundColor={COLORS.primary} />
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </SafeAreaView>
  );
}
