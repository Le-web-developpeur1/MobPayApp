import HeaderScreen from '@/src/components/ui/HeaderScreen';
import { COLORS } from '@/src/constants';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

interface FraisItem {
  title: string;
  description: string;
  montant: string;
}

const fraisData: FraisItem[] = [
  {
    title: 'Transfert CashMoov',
    description: 'Vers un autre compte CashMoov',
    montant: '1% du montant',
  },
  {
    title: 'Transfert Orange Money',
    description: 'Vers un compte Orange Money',
    montant: '2% du montant',
  },
  {
    title: 'Retrait en agence',
    description: 'Retrait d\'espèces en agence',
    montant: '500 GNF',
  },
  {
    title: 'Paiement de facture',
    description: 'EDG, SEG, SOTELGUI',
    montant: 'Gratuit',
  },
  {
    title: 'Recharge de crédit',
    description: 'Orange, MTN, Cellcom',
    montant: 'Gratuit',
  },
];

export default function FraisScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <HeaderScreen title="Frais et tarifs" />
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Consultez tous les frais applicables à vos transactions
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: verticalScale(20) }}
        >
          {fraisData.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <View style={styles.montantContainer}>
                <Text style={styles.montant}>{item.montant}</Text>
              </View>
            </View>
          ))}

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              💡 Les frais sont prélevés automatiquement lors de chaque transaction
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(15),
  },
  subtitle: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    marginBottom: verticalScale(15),
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(12),
    padding: scale(15),
    marginBottom: verticalScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(4),
  },
  description: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
  },
  montantContainer: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(8),
  },
  montant: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.primary,
  },
  infoBox: {
    backgroundColor: COLORS.secondary,
    borderRadius: moderateScale(12),
    padding: scale(15),
    marginTop: verticalScale(10),
  },
  infoText: {
    fontSize: moderateScale(13),
    color: COLORS.textPrimary,
    lineHeight: moderateScale(20),
  },
});
