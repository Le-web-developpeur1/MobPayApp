import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Largeur de référence (iPhone 14 / designs standards)
const REFERENCE_WIDTH = 390;
const REFERENCE_HEIGHT = 844;

/**
 * Normalise la taille de police en fonction de la taille d'écran
 * Utilise la largeur comme référence principale
 */
export const normalize = (size: number): number => {
  const scale = SCREEN_WIDTH / REFERENCE_WIDTH;
  const newSize = size * scale;
  
  // Arrondir au pixel près pour éviter les rendus flous
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

/**
 * Système de typographie de l'application
 * Toutes les tailles sont normalisées automatiquement
 */
export const typography = {
  // Titres
  h1: {
    fontSize: normalize(32),
    fontWeight: '700' as const,
    lineHeight: normalize(40),
  },
  h2: {
    fontSize: normalize(28),
    fontWeight: '700' as const,
    lineHeight: normalize(36),
  },
  h3: {
    fontSize: normalize(24),
    fontWeight: '600' as const,
    lineHeight: normalize(32),
  },
  h4: {
    fontSize: normalize(20),
    fontWeight: '600' as const,
    lineHeight: normalize(28),
  },
  h5: {
    fontSize: normalize(18),
    fontWeight: '600' as const,
    lineHeight: normalize(24),
  },
  h6: {
    fontSize: normalize(16),
    fontWeight: '600' as const,
    lineHeight: normalize(22),
  },

  // Textes corporels
  bodyLarge: {
    fontSize: normalize(18),
    fontWeight: '400' as const,
    lineHeight: normalize(26),
  },
  body: {
    fontSize: normalize(16),
    fontWeight: '400' as const,
    lineHeight: normalize(24),
  },
  bodySmall: {
    fontSize: normalize(14),
    fontWeight: '400' as const,
    lineHeight: normalize(20),
  },

  // Sous-titres
  subtitle: {
    fontSize: normalize(16),
    fontWeight: '500' as const,
    lineHeight: normalize(22),
  },
  subtitleSmall: {
    fontSize: normalize(14),
    fontWeight: '500' as const,
    lineHeight: normalize(20),
  },

  // Caption et labels
  caption: {
    fontSize: normalize(12),
    fontWeight: '400' as const,
    lineHeight: normalize(16),
  },
  captionBold: {
    fontSize: normalize(12),
    fontWeight: '600' as const,
    lineHeight: normalize(16),
  },
  label: {
    fontSize: normalize(11),
    fontWeight: '500' as const,
    lineHeight: normalize(14),
    letterSpacing: 0.5,
  },

  // Boutons
  button: {
    fontSize: normalize(16),
    fontWeight: '600' as const,
    lineHeight: normalize(20),
  },
  buttonSmall: {
    fontSize: normalize(14),
    fontWeight: '600' as const,
    lineHeight: normalize(18),
  },

  // Nombres/Montants (usage spécial)
  amount: {
    fontSize: normalize(32),
    fontWeight: '700' as const,
    lineHeight: normalize(40),
  },
  amountSmall: {
    fontSize: normalize(24),
    fontWeight: '600' as const,
    lineHeight: normalize(32),
  },
};

/**
 * Tailles de police brutes (non normalisées)
 * Utilise ces valeurs si tu veux des tailles fixes
 */
export const fontSizes = {
  xs: 11,
  sm: 12,
  base: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,
};

/**
 * Tailles de police normalisées
 * Utilise ces valeurs pour des tailles responsives
 */
export const normalizedFontSizes = {
  xs: normalize(11),
  sm: normalize(12),
  base: normalize(14),
  md: normalize(16),
  lg: normalize(18),
  xl: normalize(20),
  '2xl': normalize(24),
  '3xl': normalize(28),
  '4xl': normalize(32),
  '5xl': normalize(40),
};

/**
 * Poids de police
 */
export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

/**
 * Hauteurs de ligne recommandées
 */
export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
};

/**
 * Informations sur l'écran
 */
export const screenInfo = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  isSmallDevice: SCREEN_WIDTH < 375,
  isMediumDevice: SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414,
  isLargeDevice: SCREEN_WIDTH >= 414,
  pixelRatio: PixelRatio.get(),
};
