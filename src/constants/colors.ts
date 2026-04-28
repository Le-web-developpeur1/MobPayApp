// Palette de couleurs MobPay
export const COLORS = {
  // Couleurs principales
  primary: '#2A4793',      // Bleu principal
  secondary: '#F7CE47',    // Jaune/Or
  white: '#FFFFFF',
  
  // Couleurs de texte
  textPrimary: '#3C3C3B',  // Gris foncé
  textSecondary: '#9D9D9C', // Gris clair
  textLight: '#FFFFFF',
  
  // Couleurs de fond
  background: '#F3F4F6',
  backgroundLight: '#FFFFFF',
  backgroundDark: '#3C3C3B',
  
  // Couleurs d'état
  success: '#2BA668',
  error: '#DB1414',
  warning: '#F7CE47',
  info: '#2A4793',
  
  // Opacités
  primaryLight: '#2A47931A',   
  secondaryLight: '#F7CE1480', // 10% opacity
  primaryMedium: '#2A479380',   // 50% opacity
  primaryDark: '#2A479399',
       // 60% opacity
  
  successLight: '#2BA66860',
  errorLight: '#DB141460',
  
  // Couleurs de bordure
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  
  // Overlay
  overlay: '#00000099',
} as const;

export type ColorKey = keyof typeof COLORS;
