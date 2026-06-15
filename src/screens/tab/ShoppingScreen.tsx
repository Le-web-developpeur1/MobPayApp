import { COLORS } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useTranslation } from 'react-i18next';

export default function ShoppingScreen() {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>E-Commerce</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="cart-outline" size={scale(100)} color={COLORS.primary} />
        </View>
        
        <Text style={styles.title}>Service non disponible</Text>
        <Text style={styles.description}>
          Notre service e-commerce est actuellement en cours de développement.{'\n'}
          Revenez bientôt pour découvrir nos produits !
        </Text>

        <View style={styles.infoCard}>
          <Ionicons name="time-outline" size={scale(24)} color={COLORS.primary} />
          <Text style={styles.infoText}>Disponible prochainement</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: COLORS.white,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: scale(150),
    height: scale(150),
    borderRadius: moderateScale(75),
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(30),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: moderateScale(26),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(15),
    textAlign: 'center',
  },
  description: {
    fontSize: moderateScale(16),
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: moderateScale(24),
    marginBottom: verticalScale(30),
    paddingHorizontal: scale(20),
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    borderRadius: moderateScale(12),
    gap: scale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.primary,
  },
});
