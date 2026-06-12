import { COLORS } from '@/src/constants';
import * as Contacts from "expo-contacts";
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import HeaderScreen from '../ui/HeaderScreen';
import SearchBar from '../ui/SearchBar';
import ContactListSection from './ContactListSection';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/navigation/types';
import { ROUTES } from '@/src/constants';
import { TextInput } from 'react-native-paper';
import CountryCodePicker, { Country, COUNTRIES } from '../auth/CountryCodePicker';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


type ContactProps = {
  searchExterne?: string;   // valeur de recherche externe (ex: TransfertProgramme)
  showSearchBar?: boolean;  // afficher ou non la SearchBar interne
  onSelectContact?: (contact: Contacts.Contact) => void;
  useSafeArea?: boolean;    // utiliser SafeAreaView ou non (par défaut: true)
};

export default function Contact({ searchExterne = "", showSearchBar = true, onSelectContact, useSafeArea = true }: ContactProps) {
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

  // // Redirection automatique vers DetailsInternational si pays != Guinée
  // useEffect(() => {
  //   if (showCountryPicker && selectedCountry.dialCode !== '+224' && phone.length > 0) {
  //     navigation.navigate(ROUTES.DETAILINTERNATIONAL, {
  //       name: '',
  //       phone: phone,
  //       country: selectedCountry.name,
  //     });
  //     // Réinitialiser après navigation
  //     setPhone('');
  //     setSelectedCountry(COUNTRIES[0]);
  //   }
  // }, [selectedCountry, phone, showCountryPicker]);

  // Choisir la source de recherche
  const activeSearch = showCountryPicker ? phone : (showSearchBar ? search : searchExterne);

  const filteredContacts = activeSearch === ""
    ? contacts.slice(0, 5)
    : contacts.filter(contact =>
        contact.name?.toLowerCase().includes(activeSearch.toLowerCase()) ||
        contact.phoneNumbers?.some(p => p?.number?.includes(activeSearch))
      );

  const Wrapper = useSafeArea ? SafeAreaView : View;

  return (
    <Wrapper style={{ flex: 1, backgroundColor: COLORS.primary }}>
      {showSearchBar && <HeaderScreen title={t('contacts.title')} />}
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
              <TextInput
                style={styles.phoneInput}
                placeholder={t('contacts.enterPhoneNumber')}
                placeholderTextColor="#aaa"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                mode="flat"
                underlineColor="transparent"
                activeUnderlineColor="transparent"
                theme={{
                  colors: {
                    text: '#fff',
                    placeholder: '#aaa',
                  },
                }}
              />
            </View>
          </View>
        ) : showSearchBar ? (
          <SearchBar
            value={search}
            onChangeText={setSearch}
          />
        ) : null}

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
    paddingVertical: verticalScale(15),
    backgroundColor: COLORS.background
  },
  contact: {
    paddingHorizontal: scale(15)
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2A4A',
    borderRadius: moderateScale(15),
    marginVertical: verticalScale(5),
    overflow: 'hidden',
  },
  countryPickerWrapper: {
    borderRightWidth: 1,
    borderRightColor: '#ffffff20',
  },
  phoneInputWrapper: {
    flex: 1,
  },
  phoneInput: {
    backgroundColor: 'transparent',
    fontSize: moderateScale(15),
    paddingHorizontal: scale(10),
  },
});
