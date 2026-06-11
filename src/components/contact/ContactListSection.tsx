import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, SectionList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { COLORS, ROUTES } from "@/src/constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type ContactListSectionProps = {
  contacts: any[];
  filteredContacts: any[];
  search: string;
  titleRecent: string;
  titleAll: string;
  titleSearch: string;
  onSelectContact?: (contact: any) => void;
};

export default function ContactListSection({
  contacts,
  filteredContacts,
  search,
  titleRecent,
  titleAll,
  titleSearch,
  onSelectContact,
}: ContactListSectionProps) {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { type, country } = route.params as { type: string; country: string };

  return (
    <SectionList
      sections={
        search === ""
          ? [
              { title: titleRecent, data: contacts.slice(0, 5) },
              { title: titleAll, data: contacts.slice(5) },
            ]
          : [{ title: titleSearch, data: filteredContacts }]
      }
      keyExtractor={(item, index) => item.id + index}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            if (onSelectContact) {
              onSelectContact(item);
            } else if (type === "International") {
              navigation.navigate(ROUTES.DETAILINTERNATIONAL, {
                name: item.name || "",
                phone: item.phoneNumbers?.[0]?.number || "",
                country,
              });
            } else {
              navigation.navigate(ROUTES.ENVOI, {
                name: item.name || "",
                phone: item.phoneNumbers?.[0]?.number || "",
                type,
              });

            }
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: scale(20) }}>
            <View style={styles.avatar}>
              <Ionicons name="person-circle-outline" size={scale(22)} color={COLORS.primary} />
            </View>
            <Text style={styles.avatarText}>{item.name}</Text>
          </View>
          <Ionicons name="chevron-forward" size={scale(22)} color={COLORS.primary} />
        </TouchableOpacity>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionText}>{title}</Text>
        </View>
      )}
      stickySectionHeadersEnabled={true}
      contentContainerStyle={{ paddingBottom: verticalScale(40) }}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(10),
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
    fontSize: moderateScale(20),
  },
  sectionHeader: {
    backgroundColor: COLORS.background,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(10),
  },
  sectionText: {
    fontSize: moderateScale(15),
    fontWeight: "800",
    letterSpacing: scale(2),
    color: COLORS.textPrimary,
  },
});
