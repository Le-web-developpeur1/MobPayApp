import HeaderScreen from "@/src/components/ui/HeaderScreen";
import { COLORS, ROUTES } from "@/src/constants";
import { RootStackParamList } from "@/src/navigation/types";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const paiementService = [
    { 
        label: "Postpayé", 
        img: require("@/assets/images/paiement/edg.jpeg"), 
        typeFacture: "postpaye" as const
    },
    { 
        label: "Prépayée", 
        img: require("@/assets/images/paiement/edg.jpeg"), 
        typeFacture: "prepaye" as const
    },
];

export default function Facture() {
    const navigation = useNavigation<NavigationProp>();
    const [search, setSearch] = useState("");

    const filteredPaiement = paiementService.filter(item => 
        item.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <View style={{ flex: 1, backgroundColor: COLORS.background }}>
                <HeaderScreen title="Paiement de facture" />
                <View style={styles.container}>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="search-outline" size={moderateScale(20)} style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Rechercher"
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.grid}>
                            {filteredPaiement.map((service, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.item}
                                    onPress={() => navigation.navigate(ROUTES.DETAIL_FACTURE, {
                                        typeFacture: service.typeFacture,
                                    })}
                                >
                                    <Image source={service.img} style={styles.image} />
                                    <Text style={styles.itemText}>{service.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "space-around",
        marginTop: verticalScale(30),
        paddingHorizontal: scale(20),
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: moderateScale(1),
        borderColor: COLORS.border,
        borderRadius: moderateScale(8),
        paddingHorizontal: scale(10),
        backgroundColor: COLORS.white,
        marginVertical: verticalScale(6),
    },
    icon: {
        marginRight: scale(8),
        color: COLORS.textSecondary,
    },
    input: {
        flex: 1,
        fontSize: moderateScale(16),
        color: COLORS.textPrimary,
        paddingVertical: verticalScale(12),
    },
    item: {
        paddingVertical: verticalScale(12),
        backgroundColor: COLORS.white,
        borderRadius: moderateScale(10),
        marginBottom: verticalScale(15),
        alignItems: "center",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemText: {
        paddingTop: verticalScale(8),
        fontSize: moderateScale(15),
        color: COLORS.textPrimary,
        textAlign: "center",
        fontWeight: "600",
    },
    image: {
        width: scale(120),
        height: verticalScale(70),
        borderRadius: moderateScale(10),
    },
    grid: {
        flexDirection: "column",
        marginTop: verticalScale(10),
    },
});
