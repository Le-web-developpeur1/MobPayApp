import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import HeaderScreen from '../../components/ui/HeaderScreen';
import { useTranslation } from 'react-i18next';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Service {
  name: string;
  logo: any;
  screen: keyof RootStackParamList;
}

export default function OptionTransfert() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { country } = route.params as { country: string };

  const services: Record<string, Service[]> = {
    "Sénégal": [
      { name: "Cash Moov", logo: require("@/assets/images/national/PNG.png"), screen: ROUTES.DETAILINTERNATIONAL},
      { name: "Orange Money", logo: require("@/assets/images/national/logo-orange.png"), screen: ROUTES.DETAILINTERNATIONAL },
      { name: "Wave", logo: require("@/assets/images/national/logo-orange.png"), screen: ROUTES.DETAILINTERNATIONAL },
    ],
    "France": [
      { name: "Cash Moov", logo: require("@/assets/images/national/PNG.png"), screen: ROUTES.DETAILINTERNATIONAL },
      { name: "Orange Money", logo: require("@/assets/images/national/logo-orange.png"), screen: ROUTES.DETAILINTERNATIONAL },
    ],
    "Mali": [
      { name: "Cash Moov", logo: require("@/assets/images/national/PNG.png"), screen: ROUTES.DETAILINTERNATIONAL },
      { name: "Orange Money", logo: require("@/assets/images/national/logo-orange.png"), screen: ROUTES.DETAILINTERNATIONAL },
      { name: "Wave", logo: require("@/assets/images/national/logo-orange.png"), screen: ROUTES.DETAILINTERNATIONAL },
    ],
    "Afrique du Sud": [
      { name: "Cash Moov", logo: require("@/assets/images/national/PNG.png"), screen: ROUTES.DETAILINTERNATIONAL },
      { name: "Orange Money", logo: require("@/assets/images/national/logo-orange.png"), screen: ROUTES.DETAILINTERNATIONAL },
      { name: "Wave", logo: require("@/assets/images/national/logo-orange.png"), screen: ROUTES.DETAILINTERNATIONAL },
    ],
  };

  const available = services[country] || [];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <HeaderScreen title={`${t('transfer.transferTo')} ${country}`} />
      <View style={styles.container}>
        <Text style={styles.subtitle}>{t('transfer.chooseService')}</Text>

        {available.length > 0 ? (
          <View style={styles.servicesGrid}>
            {available.map((service, index) => (
              <TouchableOpacity
                key={index}
                style={styles.serviceCard}
                activeOpacity={0.7}
                onPress={() => navigation.navigate(service.screen as any, {country})}
              >
                <View style={styles.logoContainer}>
                  <Image source={service.logo} style={styles.logo} />
                </View>
                <Text style={styles.serviceName}>{service.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.noServiceContainer}>
            <Ionicons name="alert-circle-outline" size={moderateScale(60)} color={COLORS.textSecondary} />
            <Text style={styles.noServiceText}>{t('transfer.noServiceAvailable')}</Text>
            <Text style={styles.noServiceSubtext}>{t('transfer.for')} {country}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
  },
  subtitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: verticalScale(20),
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(10),
  },
  serviceCard: {
    width: '31%',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(14),
    padding: scale(12),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(6),
    elevation: 3,
  },
  logoContainer: {
    width: scale(55),
    height: scale(55),
    borderRadius: moderateScale(12),
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(8),
  },
  logo: {
    width: scale(42),
    height: scale(42),
    borderRadius: moderateScale(8),
  },
  serviceName: {
    fontSize: moderateScale(11),
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: verticalScale(6),
  },
  noServiceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(60),
  },
  noServiceText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: verticalScale(20),
  },
  noServiceSubtext: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    marginTop: verticalScale(8),
  },
});
