import HeaderScreen from '@/src/components/ui/HeaderScreen';
import { COLORS } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

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
  return (
    <View style={styles.content}>
      <Text style={styles.sectionTitle}>Conditions Générales d'Utilisation</Text>
      
      <View style={styles.section}>
        <Text style={styles.subtitle}>1. Acceptation des conditions</Text>
        <Text style={styles.text}>
          En utilisant MobPay, vous acceptez les présentes conditions générales d'utilisation.
          Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>2. Création de compte</Text>
        <Text style={styles.text}>
          Pour utiliser MobPay, vous devez créer un compte en fournissant des informations
          exactes et à jour. Vous êtes responsable de la confidentialité de votre compte.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>3. Utilisation du service</Text>
        <Text style={styles.text}>
          Vous vous engagez à utiliser MobPay uniquement à des fins légales et conformément
          aux lois en vigueur en République de Guinée.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>4. Frais et tarifs</Text>
        <Text style={styles.text}>
          Les frais applicables sont indiqués dans la section "Frais" de l'application.
          MobPay se réserve le droit de modifier ces frais avec un préavis de 30 jours.
        </Text>
      </View>
    </View>
  );
}

function PolitiqueContent() {
  return (
    <View style={styles.content}>
      <Text style={styles.sectionTitle}>Politique de Confidentialité</Text>
      
      <View style={styles.section}>
        <Text style={styles.subtitle}>1. Collecte des données</Text>
        <Text style={styles.text}>
          Nous collectons les informations que vous nous fournissez lors de l'inscription
          et de l'utilisation de nos services : nom, numéro de téléphone, historique de transactions.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>2. Utilisation des données</Text>
        <Text style={styles.text}>
          Vos données sont utilisées pour fournir et améliorer nos services, traiter vos
          transactions et vous contacter concernant votre compte.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>3. Protection des données</Text>
        <Text style={styles.text}>
          Nous mettons en œuvre des mesures de sécurité pour protéger vos données personnelles
          contre tout accès non autorisé, modification ou divulgation.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>4. Partage des données</Text>
        <Text style={styles.text}>
          Nous ne partageons pas vos données personnelles avec des tiers, sauf obligation
          légale ou avec votre consentement explicite.
        </Text>
      </View>
    </View>
  );
}

function AProposContent() {
  return (
    <View style={styles.content}>
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>MobPay</Text>
        </View>
      </View>

      <Text style={styles.version}>Version 1.0.0</Text>

      <View style={styles.section}>
        <Text style={styles.subtitle}>À propos de MobPay</Text>
        <Text style={styles.text}>
          MobPay est une solution de paiement mobile qui facilite les transferts d'argent
          et les paiements en Guinée. Notre mission est de rendre les services financiers
          accessibles à tous.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Contact</Text>
        <View style={styles.contactRow}>
          <Ionicons name="mail-outline" size={scale(18)} color={COLORS.primary} />
          <Text style={styles.contactText}>support@mobpay.gn</Text>
        </View>
        <View style={styles.contactRow}>
          <Ionicons name="call-outline" size={scale(18)} color={COLORS.primary} />
          <Text style={styles.contactText}>+224 622 00 00 00</Text>
        </View>
        <View style={styles.contactRow}>
          <Ionicons name="location-outline" size={scale(18)} color={COLORS.primary} />
          <Text style={styles.contactText}>Conakry, Guinée</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.copyright}>
          © 2026 MobPay. Tous droits réservés.
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
  },
  sectionTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(20),
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
