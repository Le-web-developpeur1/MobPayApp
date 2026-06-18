import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { typography } from '../../constants/typography';

type TypographyVariant = keyof typeof typography;

interface AppTextProps extends TextProps {
  /**
   * Variante de typographie prédéfinie
   */
  variant?: TypographyVariant;
  
  /**
   * Permet au texte de s'adapter aux paramètres d'accessibilité du système
   * @default false - Tailles fixes pour un design cohérent
   */
  allowFontScaling?: boolean;
  
  /**
   * Couleur du texte
   */
  color?: string;
  
  /**
   * Alignement du texte
   */
  align?: 'left' | 'center' | 'right' | 'justify';
  
  /**
   * Poids de la police (override de la variante)
   */
  weight?: '400' | '500' | '600' | '700' | '800';
  
  /**
   * Enfants (texte à afficher)
   */
  children?: React.ReactNode;
}

/**
 * Composant Text personnalisé avec système de typographie
 * 
 * @example
 * // Utilisation basique avec variante
 * <AppText variant="h1">Titre</AppText>
 * 
 * @example
 * // Avec couleur personnalisée
 * <AppText variant="body" color="#FF0000">Texte rouge</AppText>
 * 
 * @example
 * // Avec scaling activé pour l'accessibilité
 * <AppText variant="body" allowFontScaling={true}>Texte accessible</AppText>
 * 
 * @example
 * // Avec styles personnalisés
 * <AppText variant="caption" style={{ marginTop: 10 }}>Note</AppText>
 */
export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  allowFontScaling = false,
  color,
  align,
  weight,
  style,
  children,
  ...props
}) => {
  // Récupérer le style de la variante
  const variantStyle = typography[variant];
  
  // Construire le style personnalisé
  const customStyle: TextStyle = {
    ...variantStyle,
    ...(color && { color }),
    ...(align && { textAlign: align }),
    ...(weight && { fontWeight: weight }),
  };
  
  return (
    <Text
      allowFontScaling={allowFontScaling}
      style={[customStyle, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

/**
 * Composants de texte prédéfinis pour une utilisation rapide
 */

export const H1: React.FC<AppTextProps> = (props) => (
  <AppText variant="h1" {...props} />
);

export const H2: React.FC<AppTextProps> = (props) => (
  <AppText variant="h2" {...props} />
);

export const H3: React.FC<AppTextProps> = (props) => (
  <AppText variant="h3" {...props} />
);

export const H4: React.FC<AppTextProps> = (props) => (
  <AppText variant="h4" {...props} />
);

export const H5: React.FC<AppTextProps> = (props) => (
  <AppText variant="h5" {...props} />
);

export const H6: React.FC<AppTextProps> = (props) => (
  <AppText variant="h6" {...props} />
);

export const BodyText: React.FC<AppTextProps> = (props) => (
  <AppText variant="body" {...props} />
);

export const BodyLarge: React.FC<AppTextProps> = (props) => (
  <AppText variant="bodyLarge" {...props} />
);

export const BodySmall: React.FC<AppTextProps> = (props) => (
  <AppText variant="bodySmall" {...props} />
);

export const Caption: React.FC<AppTextProps> = (props) => (
  <AppText variant="caption" {...props} />
);

export const Label: React.FC<AppTextProps> = (props) => (
  <AppText variant="label" {...props} />
);

export const ButtonText: React.FC<AppTextProps> = (props) => (
  <AppText variant="button" {...props} />
);

export const Amount: React.FC<AppTextProps> = (props) => (
  <AppText variant="amount" {...props} />
);

export default AppText;
