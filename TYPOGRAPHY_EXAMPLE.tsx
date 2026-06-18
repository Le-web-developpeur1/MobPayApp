// /**
//  * 🎨 EXEMPLE D'UTILISATION DU SYSTÈME DE TYPOGRAPHIE
//  * 
//  * Ce fichier montre comment utiliser le nouveau système de typographie
//  * Tu peux copier ces exemples dans tes composants
//  */

// import React from 'react';
// import { ScrollView, StyleSheet, View } from 'react-native';
// import {
//     Amount,
//     AppText,
//     BodyLarge,
//     BodySmall,
//     BodyText,
//     ButtonText,
//     Caption,
//     H1,
//     H2,
//     H3,
//     H4,
//     Label
// } from './src/components/ui';
// import { COLORS } from './src/constants/colors';

// const TypographyExample = () => {
//   return (
//     <ScrollView style={styles.container}>
      
//       {/* SECTION 1: TITRES */}
//       <View style={styles.section}>
//         <Label color={COLORS.primary}>TITRES</Label>
//         <H1>Titre H1 - 32px</H1>
//         <H2>Titre H2 - 28px</H2>
//         <H3>Titre H3 - 24px</H3>
//         <H4>Titre H4 - 20px</H4>
//       </View>

//       {/* SECTION 2: TEXTE DE CORPS */}
//       <View style={styles.section}>
//         <Label color={COLORS.primary}>TEXTE DE CORPS</Label>
//         <BodyLarge>
//           Texte Large - Utilisé pour les introductions ou textes importants
//         </BodyLarge>
//         <BodyText>
//           Texte Normal - Utilisé pour le contenu principal de l'application
//         </BodyText>
//         <BodySmall>
//           Texte Small - Utilisé pour les détails secondaires
//         </BodySmall>
//       </View>

//       {/* SECTION 3: MONTANTS */}
//       <View style={styles.section}>
//         <Label color={COLORS.primary}>MONTANTS</Label>
//         <Amount color={COLORS.success}>25,000 FCFA</Amount>
//         <AppText variant="amountSmall" color={COLORS.text}>
//           1,500 FCFA
//         </AppText>
//       </View>

//       {/* SECTION 4: CAPTIONS ET LABELS */}
//       <View style={styles.section}>
//         <Label color={COLORS.primary}>CAPTIONS & LABELS</Label>
//         <Caption color={COLORS.textSecondary}>
//           Ceci est une note explicative ou un texte d'aide
//         </Caption>
//         <Label>BADGE OU LABEL</Label>
//       </View>

//       {/* SECTION 5: AVEC COULEURS PERSONNALISÉES */}
//       <View style={styles.section}>
//         <Label color={COLORS.primary}>COULEURS PERSONNALISÉES</Label>
//         <H3 color={COLORS.primary}>Titre en couleur primaire</H3>
//         <H3 color={COLORS.success}>Titre en vert</H3>
//         <H3 color={COLORS.error}>Titre en rouge</H3>
//         <BodyText color={COLORS.textSecondary}>
//           Texte en couleur secondaire
//         </BodyText>
//       </View>

//       {/* SECTION 6: ALIGNEMENTS */}
//       <View style={styles.section}>
//         <Label color={COLORS.primary}>ALIGNEMENTS</Label>
//         <BodyText align="left">Aligné à gauche (défaut)</BodyText>
//         <BodyText align="center">Centré</BodyText>
//         <BodyText align="right">Aligné à droite</BodyText>
//       </View>

//       {/* SECTION 7: POIDS DE POLICE */}
//       <View style={styles.section}>
//         <Label color={COLORS.primary}>POIDS DE POLICE</Label>
//         <BodyText weight="400">Regular (400)</BodyText>
//         <BodyText weight="500">Medium (500)</BodyText>
//         <BodyText weight="600">Semibold (600)</BodyText>
//         <BodyText weight="700">Bold (700)</BodyText>
//       </View>

//       {/* SECTION 8: CAS D'USAGE RÉELS */}
//       <View style={styles.section}>
//         <Label color={COLORS.primary}>CAS D'USAGE - CARTE DE TRANSACTION</Label>
//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <BodyText weight="600">Transfert vers Orange Money</BodyText>
//             <Caption color={COLORS.success}>Réussi</Caption>
//           </View>
//           <Amount color={COLORS.text}>-5,000 FCFA</Amount>
//           <Caption color={COLORS.textSecondary}>
//             20 Juin 2026 • 14:30
//           </Caption>
//         </View>
//       </View>

//       {/* SECTION 9: CAS D'USAGE - HEADER */}
//       <View style={styles.section}>
//         <Label color={COLORS.primary}>CAS D'USAGE - HEADER</Label>
//         <View style={styles.header}>
//           <View>
//             <H4>Bonjour, John</H4>
//             <Caption color={COLORS.textSecondary}>
//               Bienvenue sur MobPay
//             </Caption>
//           </View>
//         </View>
//       </View>

//       {/* SECTION 10: AVEC ACCESSIBILITÉ */}
//       <View style={styles.section}>
//         <Label color={COLORS.primary}>ACCESSIBILITÉ (OPTIONNEL)</Label>
//         <BodyText allowFontScaling={false}>
//           Ce texte ignore les paramètres système (défaut)
//         </BodyText>
//         <BodyText allowFontScaling={true} color={COLORS.primary}>
//           Ce texte s'adapte aux paramètres système
//         </BodyText>
//         <Caption color={COLORS.textSecondary}>
//           Change la taille de police dans les paramètres du téléphone pour voir la différence
//         </Caption>
//       </View>

//       {/* SECTION 11: BOUTONS */}
//       <View style={styles.section}>
//         <Label color={COLORS.primary}>BOUTONS</Label>
//         <View style={styles.button}>
//           <ButtonText color="#FFF">Confirmer le paiement</ButtonText>
//         </View>
//         <View style={styles.buttonOutline}>
//           <ButtonText color={COLORS.primary}>Annuler</ButtonText>
//         </View>
//       </View>

//       {/* SECTION 12: LISTE DE CONTACTS */}
//       <View style={styles.section}>
//         <Label color={COLORS.primary}>CAS D'USAGE - LISTE DE CONTACTS</Label>
//         <View style={styles.contactItem}>
//           <View style={styles.avatar}>
//             <H4 color="#FFF">JD</H4>
//           </View>
//           <View style={{ flex: 1 }}>
//             <BodyText weight="600">John Doe</BodyText>
//             <Caption color={COLORS.textSecondary}>+237 6 XX XX XX XX</Caption>
//           </View>
//         </View>
//       </View>

//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     padding: 16,
//   },
//   section: {
//     backgroundColor: '#FFF',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     gap: 12,
//   },
//   card: {
//     backgroundColor: '#F9F9F9',
//     padding: 16,
//     borderRadius: 8,
//     gap: 8,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   header: {
//     backgroundColor: COLORS.primary,
//     padding: 16,
//     borderRadius: 8,
//   },
//   button: {
//     backgroundColor: COLORS.primary,
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonOutline: {
//     borderWidth: 2,
//     borderColor: COLORS.primary,
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   contactItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     padding: 12,
//     backgroundColor: '#F9F9F9',
//     borderRadius: 8,
//   },
//   avatar: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: COLORS.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default TypographyExample;
