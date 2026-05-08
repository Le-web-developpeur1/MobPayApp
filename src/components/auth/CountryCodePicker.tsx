import { COLORS } from '@/src/constants';
import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

const COUNTRIES: Country[] = [
    { code: 'GN', name: 'Guinée', flag: '🇬🇳', dialCode: '+224' },
    { code: 'ZA', name: 'Afrique du Sud', flag: '🇿🇦', dialCode: '+27' },
    { code: 'DZ', name: 'Algérie', flag: '🇩🇿', dialCode: '+213' },
    { code: 'DE', name: 'Allemagne', flag: '🇩🇪', dialCode: '+49' },
    { code: 'AO', name: 'Angola', flag: '🇦🇴', dialCode: '+244' },
    { code: 'SA', name: 'Arabie Saoudite', flag: '🇸🇦', dialCode: '+966' },
    { code: 'AR', name: 'Argentine', flag: '🇦🇷', dialCode: '+54' },
    { code: 'AU', name: 'Australie', flag: '🇦🇺', dialCode: '+61' },
    { code: 'BE', name: 'Belgique', flag: '🇧🇪', dialCode: '+32' },
    { code: 'BJ', name: 'Bénin', flag: '🇧🇯', dialCode: '+229' },
    { code: 'BR', name: 'Brésil', flag: '🇧🇷', dialCode: '+55' },
    { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', dialCode: '+226' },
    { code: 'CM', name: 'Cameroun', flag: '🇨🇲', dialCode: '+237' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1' },
    { code: 'CN', name: 'Chine', flag: '🇨🇳', dialCode: '+86' },
    { code: 'CY', name: 'Chypre', flag: '🇨🇾', dialCode: '+357' },
    { code: 'CG', name: 'Congo', flag: '🇨🇬', dialCode: '+242' },
    { code: 'CD', name: 'Congo (RD)', flag: '🇨🇩', dialCode: '+243' },
    { code: 'KR', name: 'Corée du Sud', flag: '🇰🇷', dialCode: '+82' },
    { code: 'CI', name: 'Côte d\'Ivoire', flag: '🇨🇮', dialCode: '+225' },
    { code: 'DK', name: 'Danemark', flag: '🇩🇰', dialCode: '+45' },
    { code: 'EG', name: 'Égypte', flag: '🇪🇬', dialCode: '+20' },
    { code: 'AE', name: 'Émirats arabes unis', flag: '🇦🇪', dialCode: '+971' },
    { code: 'ES', name: 'Espagne', flag: '🇪🇸', dialCode: '+34' },
    { code: 'US', name: 'États-Unis', flag: '🇺🇸', dialCode: '+1' },
    { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33' },
    { code: 'GA', name: 'Gabon', flag: '🇬🇦', dialCode: '+241' },
    { code: 'GM', name: 'Gambie', flag: '🇬🇲', dialCode: '+220' },
    { code: 'GH', name: 'Ghana', flag: '🇬🇭', dialCode: '+233' },
    { code: 'GR', name: 'Grèce', flag: '🇬🇷', dialCode: '+30' },
    { code: 'GW', name: 'Guinée-Bissau', flag: '🇬🇼', dialCode: '+245' },
    { code: 'GQ', name: 'Guinée équatoriale', flag: '🇬🇶', dialCode: '+240' },
    { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', dialCode: '+852' },
    { code: 'IN', name: 'Inde', flag: '🇮🇳', dialCode: '+91' },
    { code: 'ID', name: 'Indonésie', flag: '🇮🇩', dialCode: '+62' },
    { code: 'IE', name: 'Irlande', flag: '🇮🇪', dialCode: '+353' },
    { code: 'IT', name: 'Italie', flag: '🇮🇹', dialCode: '+39' },
    { code: 'JP', name: 'Japon', flag: '🇯🇵', dialCode: '+81' },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪', dialCode: '+254' },
    { code: 'LR', name: 'Liberia', flag: '🇱🇷', dialCode: '+231' },
    { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', dialCode: '+352' },
    { code: 'MY', name: 'Malaisie', flag: '🇲🇾', dialCode: '+60' },
    { code: 'ML', name: 'Mali', flag: '🇲🇱', dialCode: '+223' },
    { code: 'MA', name: 'Maroc', flag: '🇲🇦', dialCode: '+212' },
    { code: 'MR', name: 'Mauritanie', flag: '🇲🇷', dialCode: '+222' },
    { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', dialCode: '+258' },
    { code: 'NE', name: 'Niger', flag: '🇳🇪', dialCode: '+227' },
    { code: 'NG', name: 'Nigéria', flag: '🇳🇬', dialCode: '+234' },
    { code: 'NO', name: 'Norvège', flag: '🇳🇴', dialCode: '+47' },
    { code: 'PK', name: 'Pakistan', flag: '🇵🇰', dialCode: '+92' },
    { code: 'NL', name: 'Pays-Bas', flag: '🇳🇱', dialCode: '+31' },
    { code: 'PL', name: 'Pologne', flag: '🇵🇱', dialCode: '+48' },
    { code: 'PT', name: 'Portugal', flag: '🇵🇹', dialCode: '+351' },
    { code: 'GB', name: 'Royaume-Uni', flag: '🇬🇧', dialCode: '+44' },
    { code: 'SN', name: 'Sénégal', flag: '🇸🇳', dialCode: '+221' },
    { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', dialCode: '+232' },
    { code: 'CH', name: 'Suisse', flag: '🇨🇭', dialCode: '+41' },
    { code: 'SE', name: 'Suède', flag: '🇸🇪', dialCode: '+46' },
    { code: 'TH', name: 'Thaïlande', flag: '🇹🇭', dialCode: '+66' },
    { code: 'TG', name: 'Togo', flag: '🇹🇬', dialCode: '+228' },
    { code: 'TN', name: 'Tunisie', flag: '🇹🇳', dialCode: '+216' },
    { code: 'TR', name: 'Turquie', flag: '🇹🇷', dialCode: '+90' },
    { code: 'UA', name: 'Ukraine', flag: '🇺🇦', dialCode: '+380' },
];  

interface CountryCodePickerProps {
  selectedCountry: Country;
  onSelectCountry: (country: Country) => void;
}

export default function CountryCodePicker({ selectedCountry, onSelectCountry }: CountryCodePickerProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const normalizeString = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const filteredCountries = COUNTRIES.filter(country =>
    normalizeString(country.name).includes(normalizeString(searchQuery)) ||
    country.dialCode.includes(searchQuery)
  );

  const handleSelectCountry = (country: Country) => {
    onSelectCountry(country);
    setModalVisible(false);
    setSearchQuery('');
  };

  const renderCountryItem = ({ item }: { item: Country }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => handleSelectCountry(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.flag}>{item.flag}</Text>
      <Text style={styles.countryName}>{item.name}</Text>
      <Text style={styles.dialCode}>{item.dialCode}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.flag}>{selectedCountry.flag}</Text>
        <Text style={styles.selectedDialCode}>{selectedCountry.dialCode}</Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Sélectionner un pays</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={filteredCountries}
              renderItem={renderCountryItem}
              keyExtractor={(item) => item.code}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>Aucun pays trouvé</Text>
                </View>
              }
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

export { COUNTRIES };

const styles = StyleSheet.create({
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(16),
    borderRightWidth: scale(1),
    borderRightColor: COLORS.border,
    gap: scale(6),
  },
  flag: {
    fontSize: moderateScale(24),
  },
  selectedDialCode: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  arrow: {
    fontSize: moderateScale(10),
    color: COLORS.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    maxHeight: '80%',
    paddingBottom: verticalScale(20),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(15),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  closeButton: {
    fontSize: moderateScale(24),
    color: COLORS.textSecondary,
    fontWeight: '300',
  },
  searchContainer: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  searchInput: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(12),
    fontSize: moderateScale(15),
    color: COLORS.textPrimary,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
    gap: scale(15),
  },
  countryName: {
    flex: 1,
    fontSize: moderateScale(16),
    color: COLORS.textPrimary,
  },
  dialCode: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.textSecondary,
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
