import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Contacts from "expo-contacts";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import HeaderScreen from '../ui/HeaderScreen';
import SearchBar from '../ui/SearchBar';
import ContactList from './ContactList';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Contact() {
    const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<Contacts.Contact[]>([]);
    const [search, setSearch] = useState("");

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();
    const { type, country } = route.params as { type: string, country: string};

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();

            if (status === "granted") {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });

                if (data.length > 0) {
                    setContacts(data);
                    setFilteredContacts(data.slice(0,5));
                }
            }
        }) ();
    }, []);

    useEffect(() => {
        if (search === "") {
          setFilteredContacts(contacts.slice(0, 5));
        } else {
          const filtered = contacts.filter(contact =>
            contact.name?.toLowerCase().includes(search.toLowerCase()) ||
            contact.phoneNumbers?.some(p =>
              p?.number?.includes(search)
            )
          );
      
          setFilteredContacts(filtered);
        }
    }, [search, contacts]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary}}>
        <HeaderScreen title={type === "Envoi" ? "Transfert de l'argent" : type === "EnvoiOM" ? "Envoie Orange Money" : type === "ReceptionOM" ? "Réception Orange Money" : "Transfert International"}/>
        <View style={styles.container}>

            <SearchBar
                value={search}
                onChangeText={setSearch}
            />
            {filteredContacts.length === 0 && search !== "" ? (
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                        if (type === "International") {
                            navigation.navigate(ROUTES.DETAILINTERNATIONAL, { phone: search, country});
                        }
                    }}

                >
                    <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", gap: scale(20)}}>
                        <View style={styles.avatar}>
                            <Ionicons name='person-circle-outline' size={scale(22)} color={COLORS.primary}/>
                        </View>
                        <Text style={styles.avatarText}>{search}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={scale(22)} color={COLORS.primary}/>
                </TouchableOpacity>
            ) : (
                <>
                <Text style={styles.section}>CONTACTS RÉCENTS</Text>

                <ContactList contacts={filteredContacts}/>
                </>
            )}
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(15),
        backgroundColor: COLORS.white
    },
    section: {
    marginTop: verticalScale(15),
    fontSize: moderateScale(15),
    fontWeight: "800",
    letterSpacing: scale(2),
    paddingHorizontal: scale(10),
    paddingBottom: verticalScale(10),
    color: COLORS.textPrimary,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(10),
    },
    fallback: {
        padding: scale(15),
        backgroundColor: COLORS.background,
        borderRadius: moderateScale(8),
        marginTop: verticalScale(20),
        alignItems: "center"
      },
      fallbackText: {
        fontSize: moderateScale(16),
        fontWeight: "bold",
        color: COLORS.primary
    },
    avatar: {
        width: scale(60),
        height: verticalScale(60),
        borderRadius: moderateScale(60),
        borderColor: COLORS.primary,
        borderWidth: scale(2), 
        alignItems: "center",
        justifyContent: "center",
        marginRight: scale(10),
    },
    avatarText: {
        color: COLORS.primary,
        fontWeight: "bold",
        fontSize: moderateScale(20)
    },
});