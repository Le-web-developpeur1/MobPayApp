import HeaderScreen from "@/src/components/ui/HeaderScreen";
import { COLORS, ROUTES } from "@/src/constants";
import { RootStackParamList } from "@/src/navigation/types";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type DetailPaiementRouteProp = RouteProp<RootStackParamList, "DetailFacture">;

export default function DetailFacture() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<DetailPaiementRouteProp>();

    const [inputShow, setInputShow] = useState(false);
    const [selectedFacture, setSelectedFacture] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [numero, setNumero] = useState("");
    const [num, setNum] = useState("");

    const factures = [
        "Facture Janvier",
        "Facture Février",
        "Facture Mars",
        "Facture Avril",
    ];

    const handleDetail = () => {
        setTimeout(() => {
            setInputShow(true);
            setNum(numero);
        }, 2000);
    };

    const { typeFacture } = route.params as {
        typeFacture: "postpaye" | "prepaye";
    };

    const headerTitle = typeFacture === "postpaye" ? "Facture Postpayée" : "Facture Prépayée";
    const placeholderTitle = typeFacture === "postpaye" 
        ? "Entrez le numéro de la référence" 
        : "Entrez le numéro du compteur";

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <View style={{ flex: 1, backgroundColor: COLORS.background }}>
                <HeaderScreen title={headerTitle} />
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ paddingBottom: verticalScale(20) }}
                    >
                        <View style={styles.container}>
                            <Text style={styles.title}>Détails de la transaction</Text>
                            
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    value="Guinée"
                                    editable={false}
                                />
                            </View>

                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={placeholderTitle}
                                    value={numero}
                                    onChangeText={setNumero}
                                    keyboardType="numeric"
                                />
                            </View>

                            {typeFacture === "postpaye" && inputShow && (
                                <View style={styles.inputWrapper}>
                                    <TouchableOpacity
                                        style={styles.dropdownButton}
                                        onPress={() => setDropdownOpen(!dropdownOpen)}
                                    >
                                        <Text style={styles.dropdownButtonText}>
                                            {selectedFacture || "Sélectionnez une facture"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {dropdownOpen && (
                                <View style={styles.dropdown}>
                                    {factures.map((facture, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.dropdownItem}
                                            onPress={() => {
                                                setSelectedFacture(facture);
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            <Text style={styles.dropdownItemText}>{facture}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                            {inputShow && (
                                <View style={styles.frais}>
                                    {typeFacture === "postpaye" ? (
                                        <>
                                            <Text style={styles.text}>Nom du client: </Text>
                                            <Text style={styles.text}>Numéro de référence: </Text>
                                            <Text style={styles.text}>Identifiant de facture: </Text>
                                            <Text style={styles.text}>Montant: </Text>
                                        </>
                                    ) : (
                                        <>
                                            <Text style={styles.text}>Nom du client: </Text>
                                            <Text style={styles.text}>Code de référence: </Text>
                                            <Text style={styles.text}>Numéro de l'appareil: {num}</Text>
                                        </>
                                    )}
                                </View>
                            )}

                            {inputShow ? (
                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={() => navigation.navigate(ROUTES.DETAIL_DEBIT, {headerTitle})}
                                >
                                    <Text style={styles.buttonText}>Suivant</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={[styles.button, !numero && styles.buttonDisabled]}
                                    onPress={handleDetail}
                                    disabled={!numero}
                                >
                                    <Text style={styles.buttonText}>Voir les détails</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginTop: verticalScale(20),
        paddingHorizontal: scale(20),
    },
    title: {
        fontSize: moderateScale(18),
        paddingHorizontal: scale(2),
        fontWeight: "bold",
        marginBottom: verticalScale(10),
        color: COLORS.textPrimary,
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
    input: {
        flex: 1,
        fontSize: moderateScale(16),
        color: COLORS.textPrimary,
        paddingVertical: verticalScale(12),
    },
    dropdownButton: {
        flex: 1,
        paddingVertical: verticalScale(12),
    },
    dropdownButtonText: {
        fontSize: moderateScale(16),
        color: COLORS.textPrimary,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: verticalScale(12),
        paddingHorizontal: scale(4),
        borderRadius: moderateScale(8),
        alignItems: "center",
        justifyContent: "center",
        marginTop: verticalScale(15),
    },
    buttonDisabled: {
        backgroundColor: COLORS.textSecondary,
        opacity: 0.5,
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: "700",
        fontSize: moderateScale(18),
    },
    frais: {
        backgroundColor: "#0069FF1A",
        padding: scale(15),
        gap: verticalScale(10),
        borderRadius: moderateScale(8),
        marginTop: verticalScale(15),
    },
    text: {
        fontWeight: "600",
        fontSize: moderateScale(15),
        color: COLORS.primary,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: moderateScale(8),
        backgroundColor: COLORS.white,
        marginVertical: verticalScale(6),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dropdownItem: {
        padding: verticalScale(12),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
    },
    dropdownItemText: {
        fontSize: moderateScale(15),
        color: COLORS.textPrimary,
    },
});
