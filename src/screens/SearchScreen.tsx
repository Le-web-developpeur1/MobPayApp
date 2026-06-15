import { RootStackParamList } from "@/src/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import HeaderScreen from "../components/ui/HeaderScreen";
import { COLORS, ROUTES } from "../constants";
import { Ionicons } from "@expo/vector-icons";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

type TransfertType = "EnvoiOM" | "ReceptionOM";

type Service = {
    name: string;
    route: keyof RootStackParamList;  // 👈 route doit être une clé valide
    params?: object;
    icon: string;
  };

export default function SearchScreen() {
    const [query, setQuery] = useState("");
    const navigation = useNavigation<NavigationProps>();

    const services: Service[] = [
        {name: "Transfert", route : ROUTES.TRANSFERT, icon: "swap-horizontal", }, 
        {name: "Paiement de facture", route: ROUTES.FACTURES, icon: "document-text"}, 
        {name: "Recharge crédits", route: ROUTES.CREDITS, icon: "phone-portrait"}, 
        {name: "Paiement marchands", route: ROUTES.DETAIL_MARCHAND, icon: "storefront"}, 
        {name: "Retraits", route: ROUTES.RETRAITS, icon: "cash" }, 
        {name: "Envoi vers Orange Money", route: ROUTES.CONTACT, icon: "send", params: {type: "EnvoiOM" as TransfertType}}, 
        {name: "Réception d'Orange Money", route: ROUTES.CONTACT, icon: "download", params: {type: "ReceptionOM" as TransfertType}}, 
        {name: "Historique", route: ROUTES.HISTORIQUE, icon: "time"},
        {name: "Auto-Débit", route: ROUTES.AUTO_DEBIT, icon: "calendar-sharp", params: { type: "programme" } },
        {name: "Frais et Tarifs", route: ROUTES.FRAIS, icon: "receipt"},
        
    ];

    const filtered = services.filter((s) => 
        s.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <HeaderScreen title="Rechercher"/>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Rechercher un service..."
                    value={query}
                    onChangeText={setQuery}
                />
                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.resultItem}
                            onPress={() => {
                                if (item.route === ROUTES.CONTACT) {
                                    navigation.navigate(item.route, item.params);
                                } else if (item.route === ROUTES.AUTO_DEBIT){
                                    navigation.navigate(item.route, item.params);
                                } else {
                                    navigation.navigate(item.route as any)
                                }
                            }}
                        >
                            <View style={{ flexDirection: "row", alignItems: "center", gap: scale(15)}}>
                                <Ionicons name={item.icon as any} size={scale(25)} color={COLORS.primary}/>
                                <Text style={styles.result}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    container: {
        flex: 1,
        paddingTop: verticalScale(10),
        paddingHorizontal: scale(25),
        backgroundColor: "#fff"
    },
    input: {
        borderWidth: scale(1),
        borderColor: "#ccc",
        borderRadius: moderateScale(8),
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(8),
        fontSize: moderateScale(16),
        marginBottom: verticalScale(8),
    },
    resultItem: {
        paddingVertical: verticalScale(12),
        borderBottomWidth: scale(1),
        borderBottomColor: "#c3c0c0ff"
    },
    result: {
        fontSize: moderateScale(18),
        color: "#333"
    },
});