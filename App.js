import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useRef } from "react";
import { AppState, Platform, StatusBar } from "react-native";
import 'react-native-gesture-handler';
import { COLORS } from "./src/constants";
import { LanguageProvider } from "./src/context/LanguageContext";
import "./src/i18n";
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const appState = useRef(AppState.currentState);
  const routeNameRef = useRef();
  const navigationRef = useRef();

  // Fonction pour forcer la StatusBar selon l'écran
  const forceStatusBar = (routeName) => {
    // Sur onboarding : StatusBar dark-content (texte sombre sur fond clair)
    if (routeName === 'Onboarding') {
      StatusBar.setBarStyle("dark-content", false);
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor('transparent', false);
        StatusBar.setTranslucent(true);
      }
    } else {
      // Tous les autres écrans : StatusBar bleue
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor(COLORS.primary, false);
        StatusBar.setTranslucent(false);
      }
      StatusBar.setBarStyle("light-content", false);
    }
    StatusBar.setHidden(false, 'none');
  };

  useEffect(() => {
    // Force au démarrage (onboarding par défaut)
    forceStatusBar('Onboarding');

    // Écoute les changements d'état de l'app (background/foreground)
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // L'app revient au premier plan - Force la StatusBar selon l'écran actuel
        const currentRoute = routeNameRef.current;
        // console.log('App revient au foreground - Route:', currentRoute);
        forceStatusBar(currentRoute);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <LanguageProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
        }}
        onStateChange={() => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

          if (previousRouteName !== currentRouteName) {
            // La route a changé - Adapte la StatusBar
            // console.log('Navigation vers:', currentRouteName);
            forceStatusBar(currentRouteName);
          }

          // Sauvegarde la route actuelle
          routeNameRef.current = currentRouteName;
        }}
      >
        <AppNavigator />
      </NavigationContainer>
    </LanguageProvider>
  );
}
