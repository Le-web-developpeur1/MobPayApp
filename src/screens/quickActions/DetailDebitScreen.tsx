import { ConfirmModal } from "@/src/components/modals/ConfirmModal";
import HeaderScreen from "@/src/components/ui/HeaderScreen";
import { RootStackParamList } from "@/src/navigation/types";
import { useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function DetailDebitScreen() {
    const route = useRoute();
    const { headerTitle } = route.params as { headerTitle: string };
    
    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState("");
    const [bouton, setBouton] = useState(false);
    const [frais, setfrais] = useState("");
    const [taxeValue, setTaxeValue] = useState(Number);
    const [montantFacturer, setMontantFacturer] = useState(Number);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    
    const fraisValue = 0 ;
    const taxe = 0 ;
    const montant = Number(amount) + taxe + fraisValue;
    const name = "Boubacar Bah";
    
    const formAmount = new Intl.NumberFormat("fr-FR").format(Number(amount));
    const date = new Date().toLocaleDateString("fr-FR", { 
        day: "2-digit", 
        month: "long", 
        year: "numeric", 
    });
    
    const handleCalcul = () => {
        setBouton(!bouton);
        setTaxeValue(taxe);
        setMontantFacturer(montant);
        setfrais(fraisValue.toString());
    };

    const handleSuivant = () => {
        setShowConfirmModal(true);
    };

    return (
        <>
        
            <SafeAreaView style={{ flex: 1, backgroundColor: "#2A4793"}}>
                <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
                    <HeaderScreen title={headerTitle}/>
                    <KeyboardAvoidingView
                        style={{ flex: 1}}
                        behavior={ Platform.OS === "ios" ? "padding" : "height"}
                    >
                        <ScrollView
                            style={{ flex: 1 }}
                            contentContainerStyle={{ marginBottom: verticalScale(20)}}
                        >
                            <View style={styles.container}>
                                <Text style={styles.title}>Détails de la transaction</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        value="GNF"
                                        editable={false}
                                    />
                                </View>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Veuillez entrer le numéro de téléphone"
                                        value={phone}
                                        onChangeText={setPhone}
                                    />
                                </View>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Montant"
                                        value={amount}
                                        onChangeText={setAmount}
                                    />
                                </View>
                                <View style={styles.frais}>
                                    <Text style={styles.text}>Frais : {frais} GNF</Text>
                                    <Text style={styles.text}>Taxe : {taxeValue} GNF</Text>
                                    <Text style={styles.text}>Montant à facturer : {montantFacturer} GNF</Text>
                                </View>
                                {bouton ? (
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={handleSuivant}
                                    >
                                        <Text style={styles.buttonText}>Suivant</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={handleCalcul}
                                    >
                                        <Text style={styles.buttonText}>Calculer</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView>

            <ConfirmModal
                visible={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                beneficiaire={{ name, phone }}
                transaction={{
                    montant: formAmount,
                    frais: frais,
                    taxe: taxeValue.toString(),
                    total: montantFacturer.toLocaleString(),
                }}
                transactionType="paiement_facture"
            />
        </>
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
        marginBottom: verticalScale(3)
    },
    inputWrapper: { 
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "space-between", 
        borderWidth: moderateScale(1), 
        borderColor: "#ccc", 
        borderRadius: moderateScale(8), 
        paddingHorizontal: scale(10), 
        backgroundColor: "#fff", 
        marginVertical: verticalScale(6), 
    }, 
    input: { 
        fontSize: moderateScale(16), 
        color: "#000", 
        paddingVertical: verticalScale(12), 
    },
    button: {
        backgroundColor: "#2A4793",
        paddingVertical: verticalScale(12),
        paddingHorizontal: scale(4),
        borderRadius: moderateScale(8),
        alignItems: "center",
        justifyContent: "center",
        marginTop: verticalScale(8),
        marginLeft: scale(3),
        marginRight: scale(2),
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: moderateScale(18),
    },
    frais: {
        backgroundColor: "#0069FF1A",
        padding: scale(10),
        gap: verticalScale(8),
        borderRadius: moderateScale(8),
        marginBottom: verticalScale(10),
        marginTop: verticalScale(8)
    },
    text: {
        fontWeight: "bold",
        fontSize: moderateScale(16),
        color: "#2A4793"
    },
})
