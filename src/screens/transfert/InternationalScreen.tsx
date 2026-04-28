import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import HeaderScreen from '../../components/ui/HeaderScreen';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Country {
  name: string;
  flag: string;
}

const COUNTRIES: Country[] = [
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

export default function International() {
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation<NavigationProp>();

  // Fonction pour normaliser les caractères accentués
  const normalizeString = (str: string) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  };

  const filteredCountries = COUNTRIES.filter(country => {
    const normalizedCountry = normalizeString(country.name);
    const normalizedQuery = normalizeString(searchQuery);
    return normalizedCountry.includes(normalizedQuery);
  });

  const renderCountryItem = ({ item }: { item: Country }) => (
    <TouchableOpacity 
        style={styles.countryItem} 
        activeOpacity={0.7}
        onPress={() => navigation.navigate(ROUTES.OPTION_TRANSFERT, { country: item.name })}
    >
      <Text style={styles.flagEmoji}>{item.flag}</Text>
      <Text style={styles.countryName}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={moderateScale(20)} color={COLORS.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <HeaderScreen title='Transfert International' />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={moderateScale(20)} color={COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un pays..."
            placeholderTextColor={COLORS.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={moderateScale(20)} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.resultCount}>
          {filteredCountries.length} {filteredCountries.length > 1 ? 'pays disponibles' : 'pays disponible'}
        </Text>

        <FlatList
          data={filteredCountries}
          renderItem={renderCountryItem}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
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
    paddingTop: verticalScale(15),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.05,
    shadowRadius: moderateScale(4),
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: moderateScale(15),
    color: COLORS.textPrimary,
    marginLeft: scale(10),
  },
  resultCount: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    marginBottom: verticalScale(10),
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: verticalScale(20),
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(12),
    padding: scale(16),
    marginBottom: verticalScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.05,
    shadowRadius: moderateScale(4),
    elevation: 2,
  },
  flagEmoji: {
    fontSize: moderateScale(32),
    marginRight: scale(15),
  },
  countryName: {
    flex: 1,
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});
