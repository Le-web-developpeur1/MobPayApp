/**
 * 🔍 Utilitaire de debug pour le système de typographie
 * Utilise cette fonction dans la console pour voir les informations
 */

import { normalizedFontSizes, screenInfo, typography } from '../constants/typography';

export const logTypographyInfo = () => {
  console.log('📱 ===== INFORMATIONS ÉCRAN =====');
  console.log(`Largeur: ${screenInfo.width}px`);
  console.log(`Hauteur: ${screenInfo.height}px`);
  console.log(`Pixel Ratio: ${screenInfo.pixelRatio}`);
  console.log(`Type: ${
    screenInfo.isSmallDevice ? 'Petit' : 
    screenInfo.isMediumDevice ? 'Moyen' : 
    'Grand'
  }`);
  
  console.log('\n📝 ===== TAILLES NORMALISÉES =====');
  Object.entries(normalizedFontSizes).forEach(([key, value]) => {
    console.log(`${key}: ${value}px`);
  });
  
  console.log('\n🎨 ===== VARIANTES DISPONIBLES =====');
  Object.keys(typography).forEach(variant => {
    console.log(`- ${variant}`);
  });
};

/**
 * Affiche les informations d'une variante spécifique
 */
export const logVariantInfo = (variant: keyof typeof typography) => {
  const style = typography[variant];
  console.log(`\n🎯 Variante: ${variant}`);
  console.log(`  fontSize: ${style.fontSize}px`);
  console.log(`  fontWeight: ${style.fontWeight}`);
  console.log(`  lineHeight: ${style.lineHeight}px`);
};

/**
 * Compare les tailles avant et après normalisation
 */
export const compareNormalization = () => {
  const baseSizes = [12, 14, 16, 18, 20, 24, 28, 32];
  
  console.log('\n📊 ===== COMPARAISON NORMALISATION =====');
  console.log('Taille de base → Taille normalisée');
  
  baseSizes.forEach(size => {
    const scale = screenInfo.width / 390;
    const normalized = Math.round(size * scale);
    console.log(`${size}px → ${normalized}px (${scale.toFixed(2)}x)`);
  });
};
