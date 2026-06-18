import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Contacts from "expo-contacts";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import CountryCodePicker, { COUNTRIES, Country } from '../auth/CountryCodePicker';
import HeaderScreen from '../ui/HeaderScreen';
import SearchBar from '../ui/SearchBar';
import ContactListSection from './ContactListSection';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


type ContactProps = {
  searchExterne?: string;   // valeur de recherche externe (ex: TransfertProgramme)
  showSearchBar?: boolean;  // afficher ou non la SearchBar interne
  onSelectContact?: (contact: Contacts.Contact) => void;
  useSafeArea?: boolean;    // utiliser SafeAreaView ou non (par défaut: true)
  showHeader?: boolean;
};

export default function Contact({ searchExterne = "", showSearchBar = true, onSelectContact, useSafeArea = true, showHeader= false }: ContactProps) {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  
  // Récupérer le type depuis les params de la route
  const routeParams = route.params as { type?: string; country?: string } | undefined;
  const routeType = routeParams?.type;
  
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [search, setSearch] = useState("");
  
  // États pour le CountryCodePicker
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]); // Guinée par défaut
  const [phone, setPhone] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);



  // Vérifier si on vient de "Transfert" (type = undefined ou "National")
  const showCountryPicker = routeType === undefined || routeType === "Envoi";

  // Choisir la source de recherche
  const activeSearch = showCountryPicker ? phone : (showSearchBar ? search : searchExterne);

  const filteredContacts = activeSearch === ""
    ? contacts.slice(0, 5)
    : contacts.filter(contact =>
        contact.name?.toLowerCase().includes(activeSearch.toLowerCase()) ||
        contact.phoneNumbers?.some(p => p?.number?.includes(activeSearch))
  );

  const handleForMe = () => {
      navigation.navigate(ROUTES.CREDIT_DETAIL, {
        typeCredit: 'pour moi' as any,
      });
  };

  const Wrapper = useSafeArea ? SafeAreaView : View;
  

  return (
    <Wrapper style={{ flex: 1, backgroundColor: COLORS.primary }}>
      {showSearchBar  && useSafeArea && <HeaderScreen title={t('contacts.title')} />}
      <View 
        style={[
              styles.container,
              showSearchBar && styles.contact
        ]}
      >
        {/* Afficher CountryCodePicker + TextInput OU SearchBar */}
        {showCountryPicker ? (
          <View style={styles.phoneInputContainer}>
            <View style={styles.countryPickerWrapper}>
              <CountryCodePicker
                selectedCountry={selectedCountry}
                onSelectCountry={setSelectedCountry}
              />
            </View>
            <View style={styles.phoneInputWrapper}>
              <View style={styles.inputWithIcon}>
                <TextInput
                  style={styles.phoneInput}
                  placeholder={t('contacts.enterPhoneNumber')}
                  placeholderTextColor={COLORS.textSecondary}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  mode="flat"
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  theme={{
                    colors: {
                      text: COLORS.textPrimary,
                      placeholder: COLORS.textSecondary,
                      background: 'transparent',
                    },
                  }}
                />
                {phone.length > 0 && (
                  <TouchableOpacity 
                    onPress={() => setPhone('')}
                    style={styles.clearButton}
                  >
                    <Ionicons name="close-circle" size={scale(20)} color={COLORS.textSecondary} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        ) : showSearchBar ? (
          <SearchBar
            value={search}
            onChangeText={setSearch}
          />
        ) : null}

        {showHeader && 
          <View>
            {/* Bouton "Pour moi" */}
            <TouchableOpacity 
              style={styles.forMeButton}
              onPress={handleForMe}
              activeOpacity={0.7}
            >
              <View style={styles.forMeIcon}>
                <Ionicons name="person" size={scale(22)} color={COLORS.white} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.forMeText}>{t('quickActions.forMe')}</Text>
                <Text style={styles.forMeSubtext}>{t('quickActions.buyCredit')}</Text>
              </View>
              <Ionicons name="chevron-forward" size={scale(22)} color={COLORS.textSecondary} />
            </TouchableOpacity>

            {/* Séparateur avec texte */}
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>{t('quickActions.orChooseContact')}</Text>
              <View style={styles.separatorLine} />
            </View>
          </View>
        }

        <ContactListSection
          contacts={contacts}
          filteredContacts={filteredContacts}
          search={activeSearch}
          titleRecent={t("contacts.recentContacts")}
          titleAll={t("contacts.allContacts")}
          titleSearch={t("contacts.searchResults")}
          onSelectContact={onSelectContact}
          selectedCountry={showCountryPicker ? selectedCountry : undefined}
        />
      </View>
    </Wrapper>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingVertical: verticalScale(2),
    backgroundColor: COLORS.background
  },
  contact: {
    paddingHorizontal: scale(15)
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(12),
    marginVertical: verticalScale(5),
    overflow: 'hidden',
    borderWidth: scale(1),
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(4),
    elevation: 3,
  },
  countryPickerWrapper: {
    borderRightWidth: scale(1),
    borderRightColor: COLORS.border,
    paddingRight: scale(5),
  },
  phoneInputWrapper: {
    flex: 1,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: moderateScale(16),
    paddingHorizontal: scale(12),
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  clearButton: {
    padding: scale(8),
    marginRight: scale(8),
  },
  forMeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginTop: verticalScale(5),
    marginBottom: verticalScale(8),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(15),
    borderRadius: moderateScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(4),
    elevation: 3,
    borderWidth: scale(1),
    borderColor: COLORS.border,
  },
  forMeIcon: {
    width: scale(45),
    height: scale(45),
    borderRadius: moderateScale(22.5),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(15),
  },
  forMeText: {
    flex: 1,
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(2),
  },
  forMeSubtext: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    fontWeight: '400',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(10),
  },
  separatorLine: {
    flex: 1,
    height: scale(1),
    backgroundColor: COLORS.border,
  },
  separatorText: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    marginHorizontal: scale(12),
    fontWeight: '600',
  },
});
