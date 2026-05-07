import HeaderScreen from '@/src/components/ui/HeaderScreen';
import { COLORS, ROUTES } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { RootStackParamList } from '@/src/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>

type TabType = 'conditions' | 'politique' | 'apropos';

export default function ConditionScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('conditions');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <HeaderScreen title="Informations légales" />
      <View style={styles.container}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'conditions' && styles.activeTab]}
            onPress={() => setActiveTab('conditions')}
          >
            <Text style={[styles.tabText, activeTab === 'conditions' && styles.activeTabText]}>
              Conditions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'politique' && styles.activeTab]}
            onPress={() => setActiveTab('politique')}
          >
            <Text style={[styles.tabText, activeTab === 'politique' && styles.activeTabText]}>
              Politique
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'apropos' && styles.activeTab]}
            onPress={() => setActiveTab('apropos')}
          >
            <Text style={[styles.tabText, activeTab === 'apropos' && styles.activeTabText]}>
              À propos
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: verticalScale(20) }}
        >
          {activeTab === 'conditions' && <ConditionsContent />}
          {activeTab === 'politique' && <PolitiqueContent />}
          {activeTab === 'apropos' && <AProposContent />}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function ConditionsContent() {
  const navigation = useNavigation<NavigationProp>();

  const openLink = () => {
    navigation.navigate(ROUTES.WEB_VIEW, { url: 'https://cashmoov.net/terms/' });
  };

  return (
    <View style={styles.content}>
      <View style={styles.iconContainer}>
        <Ionicons name="document-text-outline" size={scale(60)} color={COLORS.primary} />
      </View>

      <Text style={styles.sectionTitle}>Conditions Générales d'Utilisation</Text>
      
      <Text style={styles.description}>
        Consultez nos conditions générales d'utilisation pour en savoir plus sur vos droits 
        et obligations lors de l'utilisation de MobPay.
      </Text>

      <TouchableOpacity style={styles.button} onPress={openLink}>
        <Text style={styles.buttonText}>Consulter les conditions</Text>
        <Ionicons name="arrow-forward" size={scale(20)} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
}

function PolitiqueContent() {
  const navigation = useNavigation<NavigationProp>();

  const openLink = () => {
    navigation.navigate(ROUTES.WEB_VIEW, { url: 'https://cashmoov.net/privacy/' });
  };

  return (
    <View style={styles.content}>
      <View style={styles.iconContainer}>
        <Ionicons name="shield-checkmark-outline" size={scale(60)} color={COLORS.primary} />
      </View>

      <Text style={styles.sectionTitle}>Politique de Confidentialité</Text>
      
      <Text style={styles.description}>
        Découvrez comment nous collectons, utilisons et protégeons vos données personnelles 
        pour garantir votre sécurité et votre confidentialité.
      </Text>

      <TouchableOpacity style={styles.button} onPress={openLink}>
        <Text style={styles.buttonText}>Consulter la politique</Text>
        <Ionicons name="arrow-forward" size={scale(20)} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
}

function AProposContent() {
  const date = new Date().getFullYear();
  return (
    <View style={styles.content}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>CahsMoov</Text>
        </View>
      </View>

      <Text style={styles.version}>Version 22-Aug-2024</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>À propos de CashMoov</Text>
        <Text style={styles.text}>
          CashMoov est une solution guinéene qui facilite les transferts d'argent
          et les paiements mobile dans plus de 63 pays. Notre mission est de rendre les services financiers
          accessibles à tous.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Contact</Text>
        <View style={styles.contactRow}>
          <Ionicons name="mail-outline" size={scale(18)} color={COLORS.primary} />
          <Text style={styles.contactText}>contact@cashmoov.net</Text>
        </View>
        <View style={styles.contactRow}>
          <Ionicons name="call-outline" size={scale(18)} color={COLORS.primary} />
          <Text style={styles.contactText}>+224 621 640 000</Text>
        </View>
        <View style={styles.contactRow}>
          <Ionicons name="location-outline" size={scale(18)} color={COLORS.primary} />
          <Text style={styles.contactText}>Immeuble Sonit, Avenue de la république, Kaloum</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.copyright}>
           &copy;  {date} . Tous droits réservés.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    gap: scale(10),
  },
  tab: {
    flex: 1,
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.white,
  },
  content: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
    alignItems: 'center',
  },
  iconContainer: {
    width: scale(100),
    height: scale(100),
    borderRadius: moderateScale(50),
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(15),
    textAlign: 'center',
  },
  description: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    lineHeight: moderateScale(22),
    textAlign: 'center',
    marginBottom: verticalScale(30),
    paddingHorizontal: scale(10),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(30),
    borderRadius: moderateScale(12),
    gap: scale(10),
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.white,
  },
  section: {
    marginBottom: verticalScale(20),
  },
  subtitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: verticalScale(8),
  },
  text: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    lineHeight: moderateScale(22),
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  logo: {
    width: scale(80),
    height: scale(80),
    borderRadius: moderateScale(40),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.white,
  },
  version: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: verticalScale(20),
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  contactText: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    marginLeft: scale(10),
  },
  copyright: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: verticalScale(20),
  },
});
