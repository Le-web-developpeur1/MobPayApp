import RetraitCodeConfirmModal from "@/src/components/modals/RetraitCodeConfirmModal";
import RetraitCodeReceiptModal from "@/src/components/modals/RetraitCodeReceiptModal";
import HeaderScreen from "@/src/components/ui/HeaderScreen";
import { COLORS } from "@/src/constants";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export function RetraitCode() {
    const [code, setCode] = useState("");
    const [amount, setAmount] = useState("");
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [receiptModalVisible, setReceiptModalVisible] = useState(false);
    const [transactionData, setTransactionData] = useState<any>(null);

    // Simulation de récupération des données avec le code
    useEffect(() => {
        if (code.length === 8) {
            setLoading(true);
            // Simulation d'appel API
            setTimeout(() => {
                if (code === "MM123456") {
                    setNumber("626058033");
                    setName("Boubacar Bah");
                    setAmount("1000000");
                } else {
                    setNumber("");
                    setName("");
                    setAmount("");
                    Alert.alert("Code invalide", "Le code de retrait saisi est incorrect.");
                }
                setLoading(false);
            }, 1000);
        } else {
            setNumber("");
            setName("");
            setAmount("");
        }
    }, [code]);

    const handleValidate = () => {
        if (!code || code.length !== 8) {
            Alert.alert("Code requis", "Veuillez saisir un code de retrait valide (8 caractères).");
            return;
        }
        if (!amount || parseFloat(amount) <= 0) {
            Alert.alert("Montant invalide", "Le montant doit être supérieur à 0.");
            return;
        }
        setConfirmModalVisible(true);
    };

    const handleConfirm = () => {
        setConfirmModalVisible(false);
        
        // Simulation du traitement
        setTimeout(() => {
            const transaction = {
                code,
                recipient: name,
                phone: number,
                amount: parseFloat(amount),
                date: new Date().toLocaleString('fr-FR'),
                reference: `RTR${Date.now().toString().slice(-8)}`,
                fees: 0,
                status: 'success'
            };
            setTransactionData(transaction);
            setReceiptModalVisible(true);
        }, 1500);
    };

    const handleReceiptClose = () => {
        setReceiptModalVisible(false);
        // Réinitialiser le formulaire
        setCode("");
        setAmount("");
        setNumber("");
        setName("");
        setTransactionData(null);
    };

    return (
        <SafeAreaView style={styles.safe}>
            <HeaderScreen title="Retrait Code"/>
            <View style={styles.container}>
                <KeyboardAvoidingView
                    style={{ flex: 1}}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        <View style={styles.infoCard}>
                            <Ionicons name="information-circle" size={scale(24)} color={COLORS.primary} />
                            <Text style={styles.infoText}>
                                Saisissez le code de retrait fourni par l'expéditeur pour récupérer votre argent.
                            </Text>
                        </View>

                        <View style={styles.formSection}>
                            <Text style={styles.sectionTitle}>Informations du retrait</Text>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>
                                    Code de retrait <Text style={styles.required}>*</Text>
                                </Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="key-outline" size={scale(20)} color={COLORS.textSecondary} />
                                    <TextInput 
                                        style={styles.input}
                                        placeholder="MM123456"
                                        value={code}
                                        onChangeText={setCode}
                                        maxLength={8}
                                        autoCapitalize="characters"
                                    />
                                    {loading && <ActivityIndicator size="small" color={COLORS.primary} />}
                                </View>
                                <Text style={styles.hint}>Le code contient 8 caractères</Text>
                            </View>

                            {number && name && (
                                <>
                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>Bénéficiaire</Text>
                                        <View style={[styles.inputWrapper, styles.disabledInput]}>
                                            <Ionicons name="person-outline" size={scale(20)} color={COLORS.textSecondary} />
                                            <TextInput 
                                                style={styles.input}
                                                value={name}
                                                editable={false}
                                            />
                                            <Ionicons name="checkmark-circle" size={scale(20)} color={COLORS.success} />
                                        </View>
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>Numéro de téléphone</Text>
                                        <View style={[styles.inputWrapper, styles.disabledInput]}>
                                            <Ionicons name="call-outline" size={scale(20)} color={COLORS.textSecondary} />
                                            <TextInput 
                                                style={styles.input}
                                                value={number}
                                                editable={false}
                                            />
                                            <Ionicons name="checkmark-circle" size={scale(20)} color={COLORS.success} />
                                        </View>
                                    </View>

                                    <View style={styles.inputGroup}>
                                        <Text style={styles.label}>Montant à retirer</Text>
                                        <View style={[styles.inputWrapper, styles.disabledInput]}>
                                            <Ionicons name="cash-outline" size={scale(20)} color={COLORS.textSecondary} />
                                            <TextInput 
                                                style={styles.input}
                                                value={parseFloat(amount).toLocaleString()}
                                                editable={false}
                                            />
                                            <Text style={styles.currency}>GNF</Text>
                                        </View>
                                    </View>

                                    <View style={styles.summaryCard}>
                                        <View style={styles.summaryRow}>
                                            <Text style={styles.summaryLabel}>Montant à retirer</Text>
                                            <Text style={styles.summaryValue}>{parseFloat(amount).toLocaleString()} GNF</Text>
                                        </View>
                                        <View style={styles.summaryDivider} />
                                        <View style={styles.summaryRow}>
                                            <Text style={styles.summaryLabel}>Frais</Text>
                                            <Text style={styles.summaryValue}>0 GNF</Text>
                                        </View>
                                        <View style={styles.summaryDivider} />
                                        <View style={[styles.summaryRow, styles.totalRow]}>
                                            <Text style={styles.totalLabel}>Total à recevoir</Text>
                                            <Text style={styles.totalValue}>{parseFloat(amount).toLocaleString()} GNF</Text>
                                        </View>
                                    </View>
                                </>
                            )}
                        </View>
                    </ScrollView>

                    {number && name && amount && (
                        <View style={styles.footer}>
                            <TouchableOpacity 
                                style={styles.validateButton}
                                onPress={handleValidate}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.validateButtonText}>Valider le retrait</Text>
                                <Ionicons name="arrow-forward" size={scale(20)} color={COLORS.white} />
                            </TouchableOpacity>
                        </View>
                    )}
                </KeyboardAvoidingView>
            </View>

            <RetraitCodeConfirmModal
                visible={confirmModalVisible}
                onClose={() => setConfirmModalVisible(false)}
                onConfirm={handleConfirm}
                data={{
                    code,
                    recipient: name,
                    phone: number,
                    amount: parseFloat(amount)
                }}
            />

            <RetraitCodeReceiptModal
                visible={receiptModalVisible}
                onClose={handleReceiptClose}
                transaction={transactionData}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(15),
        paddingBottom: verticalScale(120),
    },
    infoCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.secondary,
        padding: scale(15),
        borderRadius: moderateScale(12),
        marginBottom: verticalScale(20),
        gap: scale(12),
        borderLeftWidth: scale(4),
        borderLeftColor: COLORS.primary,
    },
    infoText: {
        flex: 1,
        fontSize: moderateScale(13),
        color: COLORS.textSecondary,
        lineHeight: moderateScale(18),
    },
    formSection: {
        backgroundColor: COLORS.white,
        borderRadius: moderateScale(16),
        padding: scale(20),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: verticalScale(20),
    },
    inputGroup: {
        marginBottom: verticalScale(20),
    },
    label: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: verticalScale(8),
    },
    required: {
        color: COLORS.error,
    },
    inputWrapper: { 
        flexDirection: "row", 
        alignItems: "center",
        gap: scale(10),
        borderWidth: scale(1.5), 
        borderColor: COLORS.border, 
        borderRadius: moderateScale(12), 
        paddingHorizontal: scale(15), 
        paddingVertical: verticalScale(12),
        backgroundColor: COLORS.white, 
    },
    disabledInput: {
        backgroundColor: COLORS.background,
        borderColor: COLORS.success,
    },
    input: {
        flex: 1,
        fontSize: moderateScale(15), 
        color: COLORS.textPrimary, 
    },
    hint: {
        fontSize: moderateScale(12),
        color: COLORS.textSecondary,
        marginTop: verticalScale(4),
        fontStyle: 'italic',
    },
    currency: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: COLORS.textSecondary,
    },
    summaryCard: {
        backgroundColor: COLORS.secondary,
        borderRadius: moderateScale(12),
        padding: scale(16),
        marginTop: verticalScale(10),
        borderWidth: scale(1),
        borderColor: COLORS.border,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: verticalScale(8),
    },
    summaryLabel: {
        fontSize: moderateScale(14),
        color: COLORS.textSecondary,
    },
    summaryValue: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    summaryDivider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: verticalScale(4),
    },
    totalRow: {
        paddingTop: verticalScale(12),
    },
    totalLabel: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    totalValue: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: COLORS.primary,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(15),
        paddingBottom: verticalScale(25),
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    validateButton: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: scale(10),
        paddingVertical: verticalScale(16),
        borderRadius: moderateScale(12),
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    validateButtonText: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: COLORS.white,
    },
});