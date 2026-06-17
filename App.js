import "./src/i18n";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { LanguageProvider } from "./src/context/LanguageContext";
import { StatusBar, Platform } from "react-native";
import { COLORS } from "./src/constants";
import { useEffect, } from "react";

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {

  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor(COLORS.primary);
      StatusBar.setBarStyle("light-content");
    }
  })

  return (
    <LanguageProvider>
      <StatusBar barstyle="light" backgroundColor={COLORS.primary} translucent={false}/>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </LanguageProvider>
  );
}
