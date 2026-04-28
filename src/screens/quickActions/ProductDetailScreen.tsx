import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import HeaderScreen from '../../components/ui/HeaderScreen';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type ProductDetailRouteProp = RouteProp<RootStackParamList, 'DetailEsim' | 'DetailGiftCard'>;

interface PriceOption {
  mO?: string; // Description pour eSim
  euro: string;
  gnf: string;
}

// Données pour eSim
const eSimPrices: PriceOption[] = [
  { mO: "1GB 7 Days Global", euro: "€ 8.0", gnf: "77 669.9" },
  { mO: "3GB 15 Days Global", euro: "€ 20.0", gnf: "194 174.76" },
  { mO: "10GB 30 Days Global", euro: "€ 50.0", gnf: "485 436.69" },
  { mO: "20GB 7 Days Global", euro: "€ 68.0", gnf: "660 194.17" },
];

// Données pour Gift Card
const giftCardPrices: PriceOption[] = [
  { euro: "€ 5", gnf: "50 000" },
  { euro: "€ 25", gnf: "250 000" },
  { euro: "€ 50", gnf: "500 000" },
  { euro: "€ 100", gnf: "1 000 000" },
];

export default function ProductDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ProductDetailRouteProp>();
  const { country, name, logo } = route.params as {
    country: string;
    name: string;
    logo: any;
  };

  const [euroValue, setEuroValue] = useState("");
  const [gnfValue, setGnfValue] = useState("");

  // Déterminer le type basé sur le nom de la route
  const isESim = route.name === 'DetailEsim';
  const title = isESim ? name : `${name} Gift Card`;
  const prices = isESim ? eSimPrices : giftCardPrices;
  const conversion = 10000;

  const formatGnf = (value: number) => {
    return new Intl.NumberFormat('fr-FR').format(value);
  };

  const handleChange = (value: string, type: "euro" | "gnf") => {
    if (type === "euro") {
      setEuroValue(value);
      const num = parseFloat(value);
      if (!isNaN(num)) {
        setGnfValue(formatGnf(num * conversion));
      } else {
        setGnfValue("");
      }
    } else {
      setGnfValue(value);
      const num = parseFloat(value.replace(/\s/g, ""));
      if (!isNaN(num)) {
        setEuroValue((num / conversion).toString());
      } else {
        setEuroValue("");
      }
    }
  };

  const handlePriceSelect = (price: PriceOption) => {
    if (isESim) {
      navigation.navigate(ROUTES.ESIM_BENEF as any, {
        euro: price.euro,
        gnf: price.gnf,
        country,
        name,
      });
    } else {
      navigation.navigate(ROUTES.GIFTCARD_BENEF as any, {
        euro: price.euro,
        gnf: price.gnf,
        country,
        name,
      });
    }
  };

  const handleCustomAmount = () => {
    if (!isESim && euroValue && gnfValue) {
      navigation.navigate(ROUTES.GIFTCARD_BENEF as any, {
        euroValue,
        gnfValue,
        country,
        name,
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderScreen title={title} />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.container}>
            {/* Image et info du produit */}
            <View style={styles.productCard}>
              <Image source={logo} style={styles.image} />
              <Text style={styles.subtitle}>{country} - {name}</Text>
            </View>

            <Text style={styles.title}>Veuillez choisir un montant à acheter</Text>

            {/* Grille de prix */}
            <View style={styles.pricesGrid}>
              {prices.map((price, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.priceCard}
                  activeOpacity={0.7}
                  onPress={() => handlePriceSelect(price)}
                >
                  {price.mO && <Text style={styles.description}>{price.mO}</Text>}
                  <Text style={styles.priceEuro}>{price.euro}</Text>
                  <Text style={styles.priceGnf}>{price.gnf} GNF</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Champs de conversion pour Gift Card uniquement */}
            {!isESim && (
              <>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Entrer le montant de la Gift Card"
                    keyboardType="numeric"
                    value={euroValue}
                    onChangeText={(text) => handleChange(text, "euro")}
                    placeholderTextColor={COLORS.textSecondary}
                  />
                  <Text style={styles.currency}>€</Text>
                </View>

                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Montant"
                    keyboardType="numeric"
                    value={gnfValue}
                    onChangeText={(text) => handleChange(text, "gnf")}
                    placeholderTextColor={COLORS.textSecondary}
                  />
                  <Text style={styles.currency}>GNF</Text>
                </View>

                <TouchableOpacity
                  style={[styles.button, (!euroValue || !gnfValue) && styles.buttonDisabled]}
                  onPress={handleCustomAmount}
                  disabled={!euroValue || !gnfValue}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>Suivant</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  keyboardView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(20),
  },
  container: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(15),
  },
  productCard: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: moderateScale(12),
    padding: scale(15),
    marginBottom: verticalScale(15),
  },
  image: {
    width: scale(180),
    height: scale(130),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
  },
  subtitle: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  title: {
    textAlign: 'center',
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(20),
  },
  pricesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  priceCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(10),
    marginBottom: verticalScale(12),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(4),
    elevation: 2,
  },
  description: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: verticalScale(8),
  },
  priceEuro: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: verticalScale(4),
  },
  priceGnf: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(15),
    marginBottom: verticalScale(12),
  },
  input: {
    flex: 1,
    fontSize: moderateScale(15),
    color: COLORS.textPrimary,
    paddingVertical: verticalScale(14),
  },
  currency: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: scale(10),
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    marginTop: verticalScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(8),
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: moderateScale(16),
  },
});
