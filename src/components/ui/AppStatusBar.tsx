import { COLORS } from '@/src/constants';
import React from 'react';
import { StatusBar } from 'react-native';

/**
 * Composant StatusBar global pour toute l'application
 * Toujours bleu avec texte blanc - Simple et cohérent ! 🔵
 * 
 * @example
 * // Dans n'importe quel écran
 * <AppStatusBar />
 */
export const AppStatusBar: React.FC = () => {
  return (
    <StatusBar
      barStyle="light-content"
      backgroundColor={COLORS.primary}
      translucent={false}
      animated={true}
    />
  );
};

/**
 * Alias pour garder la compatibilité avec le code existant
 */
export const PrimaryStatusBar = AppStatusBar;
export const LightStatusBar = AppStatusBar;
export const HiddenStatusBar = AppStatusBar;

export default AppStatusBar;
