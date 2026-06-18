// /**
//  * 🧪 TEST RAPIDE DU SYSTÈME DE TYPOGRAPHIE
//  * 
//  * Pour tester, copie ce code dans ton App.js temporairement :
//  * 
//  * import TestTypography from './TEST_TYPOGRAPHY';
//  * export default TestTypography;
//  * 
//  * Puis lance l'app pour voir tous les styles en action !
//  */

// import React from 'react';
// import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
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

// export default function TestTypography() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scroll}>
        
//         {/* Test des titres */}
//         <View style={styles.section}>
//           <Label color={COLORS.primary}>TITRES</Label>
//           <H1>Titre H1</H1>
//           <H2>Titre H2</H2>
//           <H3>Titre H3</H3>
//           <H4>Titre H4</H4>
//         </View>

//         {/* Test du texte de corps */}
//         <View style={styles.section}>
//           <Label color={COLORS.primary}>TEXTE DE CORPS</Label>
//           <BodyLarge>
//             BodyLarge - Lorem ipsum dolor sit amet
//           </BodyLarge>
//           <BodyText>
//             BodyText - Lorem ipsum dolor sit amet
//           </BodyText>
//           <BodySmall>
//             BodySmall - Lorem ipsum dolor sit amet
//           </BodySmall>
//         </View>

//         {/* Test des montants */}
//         <View style={styles.section}>
//           <Label color={COLORS.primary}>MONTANTS</Label>
//           <Amount color={COLORS.success}>25,000 FCFA</Amount>
//           <AppText variant="amountSmall" color={COLORS.text}>
//             5,000 FCFA
//           </AppText>
//         </View>

//         {/* Test des captions */}
//         <View style={styles.section}>
//           <Label color={COLORS.primary}>CAPTIONS & LABELS</Label>
//           <Caption color={COLORS.textSecondary}>
//             Ceci est une caption
//           </Caption>
//           <Label>CECI EST UN LABEL</Label>
//         </View>

//         {/* Test carte transaction */}
//         <View style={styles.section}>
//           <Label color={COLORS.primary}>EXEMPLE - CARTE TRANSACTION</Label>
//           <View style={styles.card}>
//             <View style={styles.cardRow}>
//               <BodyText weight="600">Transfert Orange Money</BodyText>
//               <Caption color={COLORS.success}>Réussi</Caption>
//             </View>
//             <Amount>-5,000 FCFA</Amount>
//             <Caption color={COLORS.textSecondary}>
//               20 Juin 2026 • 14:30
//             </Caption>
//           </View>
//         </View>

//         {/* Test bouton */}
//         <View style={styles.section}>
//           <Label color={COLORS.primary}>BOUTONS</Label>
//           <TouchableOpacity style={styles.button}>
//             <ButtonText color="#FFF">Confirmer le paiement</ButtonText>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.buttonOutline}>
//             <ButtonText color={COLORS.primary}>Annuler</ButtonText>
//           </TouchableOpacity>
//         </View>

//         {/* Test couleurs */}
//         <View style={styles.section}>
//           <Label color={COLORS.primary}>COULEURS</Label>
//           <H3 color={COLORS.primary}>Texte primaire</H3>
//           <H3 color={COLORS.success}>Texte succès</H3>
//           <H3 color={COLORS.error}>Texte erreur</H3>
//         </View>

//         {/* Test alignements */}
//         <View style={styles.section}>
//           <Label color={COLORS.primary}>ALIGNEMENTS</Label>
//           <BodyText align="left">Aligné à gauche</BodyText>
//           <BodyText align="center">Centré</BodyText>
//           <BodyText align="right">Aligné à droite</BodyText>
//         </View>

//         {/* Test accessibilité */}
//         <View style={styles.section}>
//           <Label color={COLORS.primary}>ACCESSIBILITÉ</Label>
//           <BodyText allowFontScaling={false}>
//             ❌ Taille fixe (défaut)
//           </BodyText>
//           <BodyText allowFontScaling={true} color={COLORS.primary}>
//             ✅ S'adapte aux paramètres système
//           </BodyText>
//           <Caption color={COLORS.textSecondary}>
//             Change la taille de police dans les paramètres du téléphone pour voir la différence
//           </Caption>
//         </View>

//         {/* Infos d'écran */}
//         <View style={styles.section}>
//           <Label color={COLORS.primary}>INFORMATIONS</Label>
//           <Caption color={COLORS.textSecondary}>
//             Si tu vois ce texte correctement, le système fonctionne ! 🎉
//           </Caption>
//           <Caption color={COLORS.textSecondary}>
//             Teste sur différentes tailles d'écran pour voir la normalisation en action
//           </Caption>
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   scroll: {
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
//   cardRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
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
// });
