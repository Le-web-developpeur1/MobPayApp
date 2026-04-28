import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";


type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Contact {
  name?: string;
  phoneNumbers?: { number?: string }[];
}

const ContactItem = ({ contact }: { contact: Contact }) => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();
    const { type, country } = route.params as { type: "Envoi" | "EnvoiOM" | "ReceptionOM" | "International"; country?: string };

  const initials = contact.name
    ? contact.name.split(" ").map(word => word[0]).join("").toUpperCase()
    : "?";
    const phone = contact.phoneNumbers?.[0]?.number || "";
    const name = contact.name || "";

  return (
    <TouchableOpacity 
        style={styles.item}
        onPress={() => {
            if (type === "International") {
              // Repasser country pour qu'il ne se perde pas
              navigation.navigate(ROUTES.DETAILINTERNATIONAL, { name, phone, country });
            } else {
                navigation.navigate(ROUTES.ENVOI, { name, phone});
            }
        }}
    >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <View>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.number}>{phone}</Text>
            </View>
        </View>
        <Ionicons name="chevron-forward" size={scale(22)} color={COLORS.primary}/>
    </TouchableOpacity>
  );
};

export default function ContactList({ contacts }: { contacts: Contact[] }) {
  return (
    <FlatList
      data={contacts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <ContactItem contact={item} />}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  avatar: {
    width: scale(60),
    height: verticalScale(60),
    borderRadius: moderateScale(60),
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(10),
  },
  avatarText: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: moderateScale(20)
  },
  name: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    paddingBottom: verticalScale(8)
  },
  number: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    fontWeight: "600"
  },
  list: {
    paddingBottom: verticalScale(20)
  }
});
