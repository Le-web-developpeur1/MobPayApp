import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import HeaderScreen from '../../components/ui/HeaderScreen';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const paiementService = [
  { 
    label: "e-Sim", 
    img: require("@/assets/images/national/PNG.png"), 
    type: "esim" as const
  },
  { 
    label: "Gift Card", 
    img: require("@/assets/images/national/logo-orange.png"), 
    type: "giftcard" as const
  },
];

export default function PaiementProduitScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderScreen title="Produits digitaux" />
      <View style={styles.container}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Veuillez choisir un service</Text>
          
          <View style={styles.grid}>
            {paiementService.map((service, index) => (
              <TouchableOpacity
                key={index}
                style={styles.serviceCard}
                activeOpacity={0.7}
                onPress={() => navigation.navigate(ROUTES.COUNTRY_SELECTOR, { type: service.type })}
              >
                <View style={styles.imageContainer}>
                  <Image source={service.img} style={styles.image} />
                </View>
                <Text style={styles.serviceLabel}>{service.label}</Text>
              </TouchableOpacity>
            ))}
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
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
  },
  scrollContent: {
    paddingBottom: verticalScale(20),
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: moderateScale(18),
    color: COLORS.textPrimary,
    marginBottom: verticalScale(25),
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
    width: scale(90),
    height: scale(90),
    borderRadius: moderateScale(12),
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(12),
    overflow: 'hidden',
  },
  image: {
    width: scale(80),
    height: scale(80),
    borderRadius: moderateScale(10),
  },
  serviceLabel: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
});
