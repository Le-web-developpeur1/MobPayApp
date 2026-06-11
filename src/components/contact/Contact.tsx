import { COLORS } from '@/src/constants';
import * as Contacts from "expo-contacts";
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { scale, verticalScale } from 'react-native-size-matters';
import HeaderScreen from '../ui/HeaderScreen';
import SearchBar from '../ui/SearchBar';
import ContactListSection from './ContactListSection';

type ContactProps = {
  searchExterne?: string;   // valeur de recherche externe (ex: TransfertProgramme)
  showSearchBar?: boolean;  // afficher ou non la SearchBar interne
  onSelectContact?: (contact: Contacts.Contact) => void;
  useSafeArea?: boolean;    // utiliser SafeAreaView ou non (par défaut: true)
};

export default function Contact({ searchExterne = "", showSearchBar = true, onSelectContact, useSafeArea = true }: ContactProps) {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [search, setSearch] = useState("");

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

  // choisir la source de recherche : interne ou externe
  const activeSearch = showSearchBar ? search : searchExterne;

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
        {showSearchBar && (
          <SearchBar
            value={search}
            onChangeText={setSearch}
          />
        )}

        <ContactListSection
          contacts={contacts}
          filteredContacts={filteredContacts}
          search={activeSearch}
          titleRecent={t("contacts.recentContacts")}
          titleAll={t("contacts.allContacts")}
          titleSearch={t("contacts.searchResults")}
          onSelectContact={onSelectContact}
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
  }
});
