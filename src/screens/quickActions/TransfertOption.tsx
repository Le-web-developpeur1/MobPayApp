import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Globe } from 'lucide-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type TransferType = "Envoi" | "EnvoiOM";

export default function TransfertOption() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity 
          style={styles.card} 
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate(ROUTES.CONTACT, { type: "Envoi" as TransferType })
          }}
        >
          <View style={styles.logoContainer}>
            <Image 
              source={require("@/assets/images/national/PNG.png")}
              style={styles.logo}
            />
          </View>
          <Text style={styles.cardTitle}>{t('transfer.cashMoov')}</Text>
          <Text style={styles.cardDescription}>{t('transfer.instantaneous')}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.card} 
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate(ROUTES.CONTACT, { type: "EnvoiOM" as TransferType })
          }}
        >
          <View style={styles.logoContainer}>
            <Image 
              source={require("@/assets/images/national/logo-orange.png")}
              style={styles.logo}
            />
          </View>
          <Text style={styles.cardTitle}>{t('transfer.sendToOM')}</Text>
          <Text style={styles.cardDescription}>{t('transfer.orangeMoney')}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.internationalCard}
        activeOpacity={0.7}
        onPress={() => navigation.navigate(ROUTES.INTERNATIONAL, { transactionType: 'Transfert'})}
      >
        <View style={[styles.logoContainer, { backgroundColor: COLORS.secondary }]}>
          <Globe size={moderateScale(32)} color={COLORS.primary} strokeWidth={2} />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{t('transfer.international')}</Text>
          <Text style={styles.cardDescription}>{t('transfer.sendAbroad24h')}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>›</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
  },
  row: {
    flexDirection: 'row',
    gap: scale(10),
    marginBottom: verticalScale(12),
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(16),
    padding: scale(14),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(6),
    elevation: 3,
  },
  logoContainer: {
    width: scale(60),
    height: scale(60),
    borderRadius: moderateScale(14),
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(10),
  },
  logo: {
    width: scale(48),
    height: scale(48),
    borderRadius: moderateScale(10),
  },
  cardTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(4),
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: moderateScale(11),
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  internationalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(16),
    padding: scale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(6),
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    marginLeft: scale(12),
  },
  arrowContainer: {
    width: scale(28),
    height: scale(28),
    borderRadius: moderateScale(14),
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: moderateScale(24),
    color: COLORS.textSecondary,
    fontWeight: '300',
  },
});
