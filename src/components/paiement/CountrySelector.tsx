import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CountrySelectorProps {
  type: 'esim' | 'giftcard';
}

const countries = [
  { name: "Afrique du Sud", flag: "🇿🇦" },
  { name: "Algérie", flag: "🇩🇿" },
  { name: "Allemagne", flag: "🇩🇪" },
  { name: "Angola", flag: "🇦🇴" },
  { name: "Arabie Saoudite", flag: "🇸🇦" },
  { name: "Argentine", flag: "🇦🇷" },
  { name: "Australie", flag: "🇦🇺" },
  { name: "Belgique", flag: "🇧🇪" },
  { name: "Bénin", flag: "🇧🇯" },
  { name: "Brésil", flag: "🇧🇷" },
  { name: "Burkina Faso", flag: "🇧🇫" },
  { name: "Cameroun", flag: "🇨🇲" },
  { name: "Canada", flag: "🇨🇦" },
  { name: "Chine", flag: "🇨🇳" },
  { name: "Chypre", flag: "🇨🇾" },
  { name: "Congo", flag: "🇨🇬" },
  { name: "Congo (République démocratique du)", flag: "🇨🇩" },
  { name: "Corée (République de)", flag: "🇰🇷" },
  { name: "Cote d'Ivoire", flag: "🇨🇮" },
  { name: "Danemark", flag: "🇩🇰" },
  { name: "Egypte", flag: "🇪🇬" },
  { name: "Emirats arabes unis", flag: "🇦🇪" },
  { name: "Espagne", flag: "🇪🇸" },
  { name: "France", flag: "🇫🇷" },
  { name: "Gabon", flag: "🇬🇦" },
  { name: "Gambie", flag: "🇬🇲" },
  { name: "Ghana", flag: "🇬🇭" },
  { name: "Grèce", flag: "🇬🇷" },
  { name: "Guinée-Bissau", flag: "🇬🇼" },
  { name: "Guinée équatoriale", flag: "🇬🇶" },
  { name: "Hong Kong", flag: "🇭🇰" },
  { name: "Inde", flag: "🇮🇳" },
  { name: "Indonésie", flag: "🇮🇩" },
  { name: "Irlande", flag: "🇮🇪" },
  { name: "Italie", flag: "🇮🇹" },
  { name: "Japon", flag: "🇯🇵" },
  { name: "Kenya", flag: "🇰🇪" },
  { name: "Liberia", flag: "🇱🇷" },
  { name: "Luxembourg", flag: "🇱🇺" },
  { name: "Malaisie", flag: "🇲🇾" },
  { name: "Mali", flag: "🇲🇱" },
  { name: "Maroc", flag: "🇲🇦" },
  { name: "Mauritanie", flag: "🇲🇷" },
  { name: "Mozambique", flag: "🇲🇿" },
  { name: "Niger", flag: "🇳🇪" },
  { name: "Nigéria", flag: "🇳🇬" },
  { name: "Norvège", flag: "🇳🇴" },
  { name: "Pakistan", flag: "🇵🇰" },
  { name: "Pays-Bas", flag: "🇳🇱" },
  { name: "Pologne", flag: "🇵🇱" },
  { name: "Portugal", flag: "🇵🇹" },
  { name: "Royaume-Uni", flag: "🇬🇧" },
  { name: "Sénégal", flag: "🇸🇳" },
  { name: "Sierra Leone", flag: "🇸🇱" },
  { name: "Suisse", flag: "🇨🇭" },
  { name: "Suède", flag: "🇸🇪" },
  { name: "Thaïlande", flag: "🇹🇭" },
  { name: "Togo", flag: "🇹🇬" },
  { name: "Tunisie", flag: "🇹🇳" },
  { name: "Turquie", flag: "🇹🇷" },
  { name: "Ukraine", flag: "🇺🇦" },
  { name: "États-Unis", flag: "🇺🇸" },
];

export default function CountrySelector({ type }: CountrySelectorProps) {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState("");

  const normalizeString = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const filteredCountries = countries.filter(c =>
    normalizeString(c.name).includes(normalizeString(search))
  );

  const handleCountrySelect = (country: string) => {
    if (type === 'esim') {
      navigation.navigate(ROUTES.DETAIL_ESIM as any, { 
        country,
        name: `e-Sim ${country}`,
        logo: require("@/assets/images/national/PNG.png")
      });
    } else {
      navigation.navigate(ROUTES.GIFTCARD_SERVICE, { country });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Veuillez choisir un pays</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un pays"
        value={search}
        onChangeText={setSearch}
        placeholderTextColor={COLORS.textSecondary}
      />

      <ScrollView 
        style={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {filteredCountries.map((country, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            activeOpacity={0.7}
            onPress={() => handleCountrySelect(country.name)}
          >
            <Text style={styles.flag}>{country.flag}</Text>
            <Text style={styles.itemText}>{country.name}</Text>
          </TouchableOpacity>
        ))}

        {filteredCountries.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun pays trouvé</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
  },
  subtitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(15),
  },
  searchInput: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(12),
    fontSize: moderateScale(15),
    color: COLORS.textPrimary,
    marginBottom: verticalScale(15),
  },
  list: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    paddingVertical: verticalScale(14),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  flag: {
    fontSize: moderateScale(24),
  },
  itemText: {
    fontSize: moderateScale(15),
    color: COLORS.textPrimary,
  },
  emptyContainer: {
    paddingVertical: verticalScale(40),
    alignItems: 'center',
  },
  emptyText: {
    fontSize: moderateScale(15),
    color: COLORS.textSecondary,
  },
});
