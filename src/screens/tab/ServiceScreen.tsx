import Paiement from '@/src/components/tab/services/Paiement';
import Transfert from '@/src/components/tab/services/Transfert';
import HeaderScreen from '@/src/components/ui/HeaderScreen';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../constants';

export default function ServiceScreen() {
  const { t } = useTranslation();
  
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <HeaderScreen title={t('services.services')} />
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: verticalScale(20)}}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>{t('services.moneyTransfer')}</Text>
            <View style={styles.service}>
              <Transfert/>
            </View>
            
            <Text style={styles.title}>{t('services.payment')}</Text>
            <View style={styles.service}>
              <Paiement />
            </View>

            <Text style={styles.title}>{t('services.merchant')}</Text>
            <View style={styles.service}>

            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: scale(20),
    backgroundColor: COLORS.background,
    paddingTop: verticalScale(10),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    marginBottom: verticalScale(5),
  },
  service: {
    borderColor: "#2A4793",
    borderWidth: scale(1),
    height: Platform.OS === "android" ? verticalScale(125) : verticalScale(120),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(15),
    justifyContent: "center",
  },
});