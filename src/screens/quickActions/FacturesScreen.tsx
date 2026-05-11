import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import HeaderScreen from '../../components/ui/HeaderScreen';
import { useTranslation } from 'react-i18next';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const paiementService = [
  { 
    label: "Produits digitaux", 
    img: require("@/assets/images/paiement/produits.png"), 
    route: ROUTES.PAIEMENTS_PRODUITS,
  },
  { 
    label: "Paiement d'électricité", 
    img: require("@/assets/images/paiement/edg.jpeg"), 
    route: ROUTES.PAIEMENTS_FACTURES,
  },
];

export default function FacturesScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState("");

  const filteredPaiement = paiementService.filter(item => 
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderScreen title={t('bills.billPayment')} />
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <Ionicons name="search-outline" size={moderateScale(20)} color={COLORS.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder={t('bills.searchService')}
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.grid}>
            {filteredPaiement.map((service, index) => (
              <TouchableOpacity
                key={index}
                style={styles.serviceCard}
                activeOpacity={0.7}
                onPress={() => navigation.navigate(service.route as any)}
              >
                <View style={styles.imageContainer}>
                  <Image source={service.img} style={styles.image} />
                </View>
                <Text style={styles.serviceLabel}>{service.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {filteredPaiement.length === 0 && (
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={moderateScale(60)} color={COLORS.textSecondary} />
              <Text style={styles.emptyText}>{t('bills.noServiceFound')}</Text>
            </View>
          )}
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
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(15),
    marginBottom: verticalScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.05,
    shadowRadius: moderateScale(4),
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: moderateScale(15),
    color: COLORS.textPrimary,
    paddingVertical: verticalScale(14),
  },
  scrollContent: {
    paddingBottom: verticalScale(20),
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(12),
  },
  serviceCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(14),
    padding: scale(15),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(6),
    elevation: 3,
  },
  imageContainer: {
    width: scale(80),
    height: scale(80),
    borderRadius: moderateScale(12),
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(12),
    overflow: 'hidden',
  },
  image: {
    width: scale(70),
    height: scale(70),
    borderRadius: moderateScale(10),
  },
  serviceLabel: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(80),
  },
  emptyText: {
    fontSize: moderateScale(16),
    color: COLORS.textSecondary,
    marginTop: verticalScale(15),
  },
});