import { COLORS } from "@/src/constants";
import { RootStackParamList, } from "@/src/navigation/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useEffect, useState, useMemo } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { ConfirmModal } from "../../components/modals/ConfirmModal";
import HeaderScreen from "../../components/ui/HeaderScreen";


type EnvoiRouteProp = RouteProp<RootStackParamList, "Envoi">;

export default function Envoi() {
    const [visible, setVisible] = useState(false);

    const route = useRoute<EnvoiRouteProp>();
    const { type } = route.params as { type: string };



    const [phone, setPhone] = useState(route.params.phone || "");
    const [name, setName] = useState(route.params.name || "");
    const [amount, setAmount] = useState("");


   

    const numAmount = Number(amount);
    const frais = numAmount * 0.01;
    const total = numAmount + frais;

    const formAmount = new Intl.NumberFormat("fr-FR").format(numAmount);
    const formFrais = new Intl.NumberFormat("fr-FR").format(frais);
    const formTotal = new Intl.NumberFormat("fr-FR").format(total);

    let titre = type === "Envoi" ? "Transfert de l'argent" : type === "EnvoiOM" ? "Envoie Orange Money" : "Réception Orange Money";
    let bouton = type === "Envoi" ? "Transfert Cash Moov" : type === "EnvoiOM" ? "Envoie Orange Money" : "Réception Orange Money";
    let infoText = type === "Envoi" 
        ? "Vous êtes sur le point d'effectuer un transfert CashMoov. Le bénéficiaire recevra l'argent instantanément." 
        : type === "EnvoiOM" 
        ? "Vous êtes sur le point d'envoyer de l'argent vers un compte Orange Money. Le bénéficiaire recevra l'argent instantanément."
        : "Vous êtes sur le point d'initier un retrait Orange Money, demander à votre contact de confirmer le retrait après la soumission.";

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary}}>
            <View style={{ flex: 1, backgroundColor: COLORS.background}}>
            <HeaderScreen title={titre}/>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView 
                    style={{ flex: 1}} 
                    contentContainerStyle={{ paddingBottom: verticalScale(40) }}
                >
                <View style={styles.container}>
                    <Text style={styles.title}>Détails du bénéficiare</Text>
                    <TextInput
                        style={[styles.input, styles.inputWrapper]} 
                        value="Guinée"
                        editable={false}
                    />
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input} 
                            placeholder="Numéro du bénéficiare"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>
                    <TextInput
                        style={[styles.input, styles.inputWrapper]}
                        placeholder="Prénom et Nom"
                        value={name}
                        onChangeText={setName}
                    />
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input} 
                            placeholder="Montant"
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                        />
                        <Text style={styles.icon}>GNF</Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.infoText}>{infoText}</Text>
                    </View>

                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setVisible(true)
                    }}
                    >
                        <Text style={styles.buttonText}>{bouton}</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <ConfirmModal
                visible={visible}
                onClose={() => setVisible(false)}
                beneficiaire={{ name: name, phone: phone}}
                transaction={{ montant: formAmount, frais: formFrais, taxe: "0.00 GNF", total: formTotal }}
                transactionType={type === "Envoi" ? "cashmoov" : type === "EnvoiOM" ? "orange_money_envoi" : "orange_money_reception"}
            />
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginTop: verticalScale(10),
        paddingHorizontal: scale(20),
    },
    title: {
        fontSize: moderateScale(18),
        paddingHorizontal: scale(2), 
        fontWeight: "bold",
        marginBottom: verticalScale(3),
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
    icon: { 
        marginRight: scale(8),
        color: COLORS.textSecondary,
    }, 
    input: { 
        fontSize: moderateScale(16), 
        color: COLORS.textPrimary, 
        paddingVertical: verticalScale(12), 
    },
    button: {
        backgroundColor: COLORS.secondary,
        paddingVertical: verticalScale(12),
        paddingHorizontal: scale(4),
        borderRadius: moderateScale(6),
        alignItems: "center",
        justifyContent: "center",
        marginTop: verticalScale(8),
        marginLeft: scale(3),
        marginRight: scale(2),
    },
    buttonText: {
        color: COLORS.primary,
        fontWeight: "700",
        fontSize: moderateScale(18),
    },
    infoBox: {
        backgroundColor: COLORS.primaryLight,
        padding: scale(12),
        borderRadius: moderateScale(8),
        marginTop: verticalScale(15),
        borderLeftWidth: scale(5),
        borderLeftColor: COLORS.primary,
    },
    infoText: {
        color: COLORS.textPrimary,
        fontSize: moderateScale(14),
        lineHeight: moderateScale(20),
    },
});