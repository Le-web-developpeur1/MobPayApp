import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { AppState, Platform, StatusBar } from 'react-native';

/**
 * Hook pour CACHER la StatusBar (pour onboarding, splash, etc.)
 * Persiste même quand l'app revient du background
 * 
 * @example
 * // Dans OnboardingScreen
 * useHiddenStatusBar();
 */
export const useHiddenStatusBar = () => {
  const appState = useRef(AppState.currentState);

  // Fonction pour cacher la StatusBar
  const hideStatusBar = () => {
    StatusBar.setHidden(true, 'fade');
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
    }
  };

  // S'applique quand l'écran est focus
  useFocusEffect(
    React.useCallback(() => {
      hideStatusBar();

      return () => {
        // Réaffiche la StatusBar quand on quitte l'écran
        StatusBar.setHidden(false, 'fade');
        if (Platform.OS === 'android') {
          StatusBar.setTranslucent(false);
        }
      };
    }, [])
  );

  // S'applique au mount et écoute AppState
  useEffect(() => {
    hideStatusBar();

    // Écoute les changements d'état de l'app
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // L'app revient au premier plan - Cache à nouveau
        console.log('Hook: App revient au foreground - Cache StatusBar');
        hideStatusBar();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription?.remove();
      // Réaffiche la StatusBar quand le composant se démonte
      StatusBar.setHidden(false, 'fade');
    };
  }, []);
};
