import Paiement from '@/src/components/tab/services/Paiement';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../constants';

import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ROUTES } from '../../constants';
import TransfertOption from '../quickActions/TransfertOption';
import QuickActions from '@/src/components/home/services/QuickActions';
import { Ionicons } from '@expo/vector-icons';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export const Debit = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
   <View style={styles.viewAction}>
     <TouchableOpacity
      style={styles.action}
      onPress={() => navigation.navigate(ROUTES.AUTO_DEBIT, {type: "programme"})}
    >
      <View style={styles.iconContainer}>
        <Ionicons name='calendar-sharp' size={moderateScale(24)} color={COLORS.primary}/>
      </View>
      <Text style={styles.label}>Auto-Debit</Text>
    </TouchableOpacity>
   </View>
  )
};

export default function ServiceScreen() {
  const { t } = useTranslation();
  
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header comme Shopping */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('services.services')}</Text>
      </View>

      {/* Contenu */}
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: verticalScale(20)}}
          showsVerticalScrollIndicator={false}
        >
            <TransfertOption/>
          
          
            <Paiement />
            <QuickActions/>
            <Debit/>
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
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.background,
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
  viewAction: {
    flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: verticalScale(8),
      paddingHorizontal: scale(20),
      gap: scale(10),
  },
  action: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    width: "30%",
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(5),
    borderRadius: moderateScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
