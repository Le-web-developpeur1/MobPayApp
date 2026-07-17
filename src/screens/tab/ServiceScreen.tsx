import Paiement from '@/src/components/tab/services/Paiement';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../constants';

import { RootStackParamList } from "@/src/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Banknote, Calendar, FileText, Lock, Receipt, Send, Smartphone, Store, Wallet } from 'lucide-react-native';
import { ROUTES } from '../../constants';
import TransfertOption from '../quickActions/TransfertOption';
import HeaderScreen from '@/src/components/ui/HeaderScreen';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

type QuickAction = {
  labelKey: string;
  icon: any;
  route: string;
};

export default function ServiceScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>();

  const quickActions: QuickAction[] = [
    { labelKey: "quickActions.transfer", icon: Send, route: ROUTES.TRANSFERT },
    { labelKey: "quickActions.topUp", icon: Wallet, route: 'MRecharger'},
    { labelKey: "quickActions.credits", icon: Smartphone, route: 'Credit' },
    { labelKey: "quickActions.withdrawals", icon: Banknote, route: ROUTES.RETRAITS },
    { labelKey: "quickActions.bills", icon: Receipt, route: ROUTES.FACTURES },
    { labelKey: "quickActions.merchants", icon: Store, route: 'PaiementMachand' },
    { labelKey: "services.autoDebit", icon: Calendar, route: ROUTES.AUTO_DEBIT },
    { labelKey: "Coffre", icon: Lock, route: "Coffre" },
    { labelKey: "Relevé de compte", icon: FileText, route: "Releve" },
  ];
  
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <HeaderScreen title='Services' />

      {/* Contenu */}
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: verticalScale(20)}}
          showsVerticalScrollIndicator={false}
        >
          {/* Section Transferts */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('services.transfers') || 'Transferts'}</Text>
            <TransfertOption/>
          </View>

            {/* Section Paiements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('services.payments') || 'Paiements'}</Text>
            <Paiement />
          </View>

          {/* Section Actions Rapides */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('services.quickActions') || 'Actions rapides'}</Text>
            <View style={styles.actionsGrid}>
              {quickActions.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.action}
                    onPress={() => navigation.navigate(item.route as any, item.route === ROUTES.AUTO_DEBIT ? {type: "programme"} : undefined) }
                  >
                    <View style={styles.iconContainer}>
                      <IconComponent size={moderateScale(24)} color={COLORS.primary} strokeWidth={2}/>
                    </View>
                    <Text style={styles.label}>{t(item.labelKey)}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
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
  },
  section: {
    marginTop: verticalScale(10),
    paddingHorizontal: scale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(12),
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: scale(10),
  },
  action: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    width: "30%",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(5),
    borderRadius: moderateScale(14),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  iconContainer: {
    width: scale(50),
    height: scale(50),
    borderRadius: moderateScale(25),
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(8),
  },
  label: {
    fontSize: moderateScale(12),
    fontWeight: "600",
    color: COLORS.textPrimary,
    textAlign: "center",
  },
});
