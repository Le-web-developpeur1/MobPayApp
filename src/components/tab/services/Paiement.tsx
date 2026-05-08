import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import HeaderScreen from '../../ui/HeaderScreen';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const paiementService = [
  { 
    label: "e-Sim", 
    img: require("@/assets/images/paiement/esim.jpg"), 
    type: "esim" as const,
    description: "Achetez des forfaits eSIM pour rester connecté partout dans le monde"
  },
  { 
    label: "Gift Card", 
    img: require("@/assets/images/paiement/giftcard.png"), 
    type: "giftcard" as const,
    description: "Payez en ligne sans carte bancaire sur vos plateformes préférées"
  },
  { 
    label: "EDG", 
    img: require("@/assets/images/paiement/edg.jpeg"), 
    description: "Payez en ligne sans carte bancaire sur vos plateformes préférées"
  },
];

export default function Paiement() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
        <View style={styles.grid}>
            {paiementService.map((service, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.serviceCard}
                    activeOpacity={0.7}
                    onPress={() => {
                        if (service.type === "esim") {
                            navigation.navigate(ROUTES.ESIM, { type: service.type })
                        } else if (service.type === "giftcard") {
                            navigation.navigate(ROUTES.COUNTRY_SELECTOR, {type: service.type})
                        } else {
                            navigation.navigate(ROUTES.PAIEMENTS_FACTURES)
                        }
                    }}
                >
                    <View style={styles.imageContainer}>
                        <Image source={service.img} style={styles.image} />
                    </View>
                    <Text style={styles.serviceLabel}>{service.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
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
    paddingHorizontal: scale(8),
    paddingTop: verticalScale(10),
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
    justifyContent: "space-between",
  },
  serviceCard: {
    width: '32%',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(14),
    padding: scale(8),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(6),
    elevation: 3,
  },
  imageContainer: {
    width: scale(55),
    height: scale(55),
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
    marginBottom: verticalScale(6),
  },
  serviceDescription: {
    fontSize: moderateScale(11),
    fontWeight: '400',
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: moderateScale(16),
  },
});
