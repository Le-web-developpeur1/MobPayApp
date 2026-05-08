import "./src/i18n";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { LanguageProvider } from "./src/context/LanguageContext";

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </LanguageProvider>
  );
}
