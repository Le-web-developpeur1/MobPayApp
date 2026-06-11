import React, { useState } from "react";
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity } from "react-native";
import { moderateScale, verticalScale, scale } from "react-native-size-matters";
import { COLORS } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderScreen from "../components/ui/HeaderScreen";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ROUTES } from "../constants";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

type TransfertType = "EnvoiOM" | "ReceptionOM"

export default function SearchScreen() {
    const [query, setQuery] = useState("");
    const navigation = useNavigation<NavigationProps>();

    const services= [
        {name: "Transfert", route : ROUTES.TRANSFERT, }, 
        {name: "Paiement de facture", route: ROUTES.FACTURES}, 
        {name: "Recharge crédits", route: ROUTES.CREDITS}, 
        {name: "Paiement marchands", route: ROUTES.MARCHANDS}, 
        {name: "Retraits", route: ROUTES.RETRAITS}, 
        {name: "Envoi vers Orange Money", route: ROUTES.CONTACT, params: {type: "EnvoiOM" as TransfertType}}, 
        {name: "Réception d'Orange Money", route: ROUTES.CONTACT, params: {type: "ReceptionOM" as TransfertType}}, 
        {name: "Historique", route: ROUTES.HISTORIQUE}, 
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
                                } else {
                                    navigation.navigate(item.route);
                                }
                            }}
                        >
                            <Text style={styles.result}>{item.name}</Text>
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
        paddingTop: verticalScale(20),
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
        marginBottom: verticalScale(15),
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