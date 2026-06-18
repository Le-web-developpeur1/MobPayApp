import { COLORS } from '@/src/constants';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { AppState, Platform, StatusBar } from 'react-native';

/**
 * Hook personnalisé pour forcer la StatusBar bleue partout
 * Résout le problème de la StatusBar qui disparaît ou change quand on revient dans l'app
 * Écoute les changements d'AppState pour forcer la StatusBar quand l'app revient au premier plan
 * 
 * @example
 * // Utilisation dans n'importe quel écran normal
 * useStatusBar();
 */
export const useStatusBar = () => {
  const appState = useRef(AppState.currentState);

  // Fonction pour forcer la StatusBar bleue
  const forceStatusBar = () => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(COLORS.primary, false);
      StatusBar.setTranslucent(false);
    }
    StatusBar.setBarStyle('light-content', false);
    StatusBar.setHidden(false, 'none');
  };

  // S'applique quand l'écran est focus
  useFocusEffect(
    React.useCallback(() => {
      forceStatusBar();

      return () => {
        // Ne rien faire au cleanup pour garder la StatusBar
      };
    }, [])
  );

  // S'applique au mount et écoute AppState
  useEffect(() => {
    forceStatusBar();

    // Écoute les changements d'état de l'app (background/foreground)
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // L'app revient au premier plan - Force la StatusBar !
        console.log('Hook: App revient au foreground - Force StatusBar bleue');
        forceStatusBar();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription?.remove();
    };
  }, []);
};

/**
 * Alias pour compatibilité
 */
export const useDefaultStatusBar = useStatusBar;
export const usePrimaryStatusBar = useStatusBar;

/**
 * Hook pour CACHER la StatusBar (onboarding, splash, etc.)
 * Réexporté depuis useHiddenStatusBar.tsx pour faciliter les imports
 */
export { useHiddenStatusBar } from './useHiddenStatusBar';

