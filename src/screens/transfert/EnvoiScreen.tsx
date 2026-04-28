import { COLORS } from "@/src/constants";
import { RootStackParamList, } from "@/src/navigation/types";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { ConfirmModal } from "../../components/modals/ConfirmModal";
import HeaderScreen from "../../components/ui/HeaderScreen";


type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type EnvoiRouteProp = RouteProp<RootStackParamList, "Envoi">;

export default function Envoi() {
    const [visible, setVisible] = useState(false);

    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<EnvoiRouteProp>();

    const { type } = route.params as { type: string};

    const [phone, setPhone] = useState(route.params?.phone || "");
    const [name, setName] = useState(route.params?.name || "");
    const [amount, setAmount] = useState("");

    const numAmount = Number(amount);
    const frais = numAmount * 0.01;
    const total = numAmount + frais;

    const formAmount = new Intl.NumberFormat("fr-FR").format(numAmount);
    const formFrais = new Intl.NumberFormat("fr-FR").format(frais);
    const formTotal = new Intl.NumberFormat("fr-FR").format(total);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary}}>
            <View style={{ flex: 1, backgroundColor: COLORS.background}}>
            <HeaderScreen title={type === "Envoi" ? "Transfert de l'argent" : type === "EnvoiOM" ? "Envoie Orange Money" : "Réception Orange Money"}/>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView 
                    style={{ flex: 1}} 
                    contentContainerStyle={{ paddingBottom: verticalScale(30) }}
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
                            keyboardType="phone-pad"
                            value={amount}
                            onChangeText={setAmount}
                        />
                        <Text style={styles.icon}>GNF</Text>
                    </View>

                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        setVisible(true)
                    }}
                    >
                        <Text style={styles.buttonText}>Transférer</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <ConfirmModal
                visible={visible}
                onClose={() => setVisible(false)}
                beneficiaire={{ name: name, phone: phone}}
                transaction={{ montant: formAmount, frais: formFrais, taxe: "0.00 GNF", total: formTotal }}
                transactionType="cashmoov"
            />
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
});