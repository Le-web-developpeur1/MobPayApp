import RechargeCodeModal from '@/src/components/modals/RechargeCodeModal'
import RechargeConfirmModal from '@/src/components/modals/RechargeConfirmModal'
import RechargeReceiptModal from '@/src/components/modals/RechargeReceiptModal'
import HeaderScreen from '@/src/components/ui/HeaderScreen'
import { COLORS } from '@/src/constants'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const CREDIT_AMOUNTS = [
    { prix: 10000 },
    { prix: 50000 },
    { prix: 100000 },
    { prix: 200000 },
    { prix: 500000 },
    { prix: 1000000 },
];

const OPERATEURS = [
    { id: 'orange', label: "Orange", img: require("@/assets/images/national/logo-orange.png") },
    { id: 'mtn', label: "MTN", img: require("@/assets/images/national/mtn.png") },
    { id: 'wave', label: "Wave", img: require("@/assets/images/national/wave.png") },
];

export default function Recharger() {
    const [amount, setAmount] = useState("");
    const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [codeModalVisible, setCodeModalVisible] = useState(false);
    const [receiptModalVisible, setReceiptModalVisible] = useState(false);

    const calculateReceivedAmount = () => {
        if (!amount) return "0";
        const numAmount = parseFloat(amount);
        const fees = numAmount * 0.01;
        const received = numAmount - fees;
        return received.toLocaleString();
    };

    const isFormValid = amount && selectedOperator;

    const handleContinue = () => {
        if (isFormValid) {
            setConfirmModalVisible(true);
        }
    };

    const handleConfirmRecharge = () => {
        setConfirmModalVisible(false);
        setCodeModalVisible(true);
    };

    const handleCodeSubmit = () => {
        setCodeModalVisible(false);
        setReceiptModalVisible(true);
    };

    const getOperatorLabel = () => {
        return OPERATEURS.find(op => op.id === selectedOperator)?.label || "";
    };
      
    
  return (
    <SafeAreaView style={styles.safe}>
        <HeaderScreen title='Recharger mon compte' />
        <View style={styles.container}>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Info Card */}
                <View style={styles.infoCard}>
                    <Ionicons name="information-circle" size={scale(24)} color={COLORS.primary} />
                    <Text style={styles.infoText}>
                        Rechargez votre compte CashMoov depuis votre mobile money
                    </Text>
                </View>

                {/* Solde disponible */}
                <View style={styles.balanceCard}>
                    <Text style={styles.balanceLabel}>Solde actuel</Text>
                    <Text style={styles.balanceAmount}>2 000 000 GNF</Text>
                </View>

                {/* Montant Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <FontAwesome5 name='money-bill-alt' size={scale(20)} color={COLORS.primary}/>
                        <Text style={styles.sectionTitle}>Montant à recharger</Text>
                    </View>

                    <TextInput
                        style={styles.input}
                        label="Montant"
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        placeholder="Entrez le montant"
                        right={<TextInput.Affix text="GNF" />}
                        theme={{
                            colors: {
                                placeholder: COLORS.textSecondary,
                                text: COLORS.textPrimary,
                                primary: COLORS.primary,
                            },
                        }}
                        mode="outlined"
                    />

                    {amount && (
                        <View style={styles.feeInfo}>
                            <Text style={styles.feeLabel}>Montant reçu après frais (1%)</Text>
                            <Text style={styles.feeAmount}>{calculateReceivedAmount()} GNF</Text>
                        </View>
                    )}
                </View>

                {/* Montants rapides */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Montants rapides</Text>
                    <View style={styles.amountGrid}>
                      {CREDIT_AMOUNTS.map((c, i) => (
                        <TouchableOpacity
                          key={i}
                          style={[
                            styles.amountCard,
                            amount === String(c.prix) && styles.amountCardSelected
                          ]}
                          onPress={() => setAmount(String(c.prix))}
                          activeOpacity={0.7}
                        >
                          <Text style={[
                            styles.amountText,
                            amount === String(c.prix) && styles.amountTextSelected
                          ]}>
                            {c.prix.toLocaleString()}
                          </Text>
                          <Text style={[
                            styles.amountCurrency,
                            amount === String(c.prix) && styles.amountCurrencySelected
                          ]}>
                            GNF
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                </View>

                {/* Opérateurs */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name='phone-portrait-outline' size={scale(20)} color={COLORS.primary}/>
                        <Text style={styles.sectionTitle}>Source de recharge</Text>
                    </View>
                    <View style={styles.operateurGrid}>
                        {OPERATEURS.map((operateur) => (
                            <TouchableOpacity 
                                key={operateur.id}
                                style={[
                                    styles.operateurCard,
                                    selectedOperator === operateur.id && styles.operateurCardSelected
                                ]}
                                onPress={() => setSelectedOperator(operateur.id)}
                                activeOpacity={0.7}
                            >
                                <Image source={operateur.img} style={styles.operateurImg}/>
                                <Text style={styles.operateurLabel}>{operateur.label}</Text>
                                <View style={styles.radioContainer}>
                                    <Ionicons 
                                    name={selectedOperator === operateur.id ? 'radio-button-on' : 'radio-button-off'} 
                                    size={scale(24)}
                                    color={selectedOperator === operateur.id ? COLORS.primary : COLORS.textSecondary}
                                    />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Bouton de validation */}
            <View style={styles.footer}>
                <TouchableOpacity 
                    style={[
                        styles.submitButton,
                        !isFormValid && styles.submitButtonDisabled
                    ]}
                    onPress={handleContinue}
                    disabled={!isFormValid}
                    activeOpacity={0.7}
                >
                    <Text style={styles.submitButtonText}>Continuer</Text>
                    <Ionicons name="arrow-forward" size={scale(20)} color={COLORS.white} />
                </TouchableOpacity>
            </View>
        </View>

        {/* Modals */}
        <RechargeConfirmModal
            visible={confirmModalVisible}
            onClose={() => setConfirmModalVisible(false)}
            onConfirm={handleConfirmRecharge}
            amount={amount}
            receivedAmount={calculateReceivedAmount()}
            operator={getOperatorLabel()}
        />

        <RechargeCodeModal
            visible={codeModalVisible}
            onClose={() => setCodeModalVisible(false)}
            onSubmit={handleCodeSubmit}
        />

        <RechargeReceiptModal
            visible={receiptModalVisible}
            onClose={() => setReceiptModalVisible(false)}
            amount={amount}
            receivedAmount={calculateReceivedAmount()}
            operator={getOperatorLabel()}
        />
    </SafeAreaView>
  )
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
        paddingBottom: verticalScale(100),
    },
    infoCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.secondary,
        padding: scale(15),
        borderRadius: moderateScale(12),
        marginBottom: verticalScale(15),
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
    balanceCard: {
        backgroundColor: COLORS.white,
        padding: scale(16),
        borderRadius: moderateScale(12),
        marginBottom: verticalScale(20),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    balanceLabel: {
        fontSize: moderateScale(13),
        color: COLORS.textSecondary,
        marginBottom: verticalScale(6),
    },
    balanceAmount: {
        fontSize: moderateScale(24),
        fontWeight: '700',
        color: COLORS.primary,
    },
    section: {
        marginBottom: verticalScale(20),
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: "center",
        gap: scale(10),
        marginBottom: verticalScale(12),
    },
    sectionTitle: {
        fontSize: moderateScale(16),
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    input: {
        backgroundColor: COLORS.white,
        fontSize: moderateScale(16),
    },
    feeInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.successLight,
        padding: scale(12),
        borderRadius: moderateScale(10),
        marginTop: verticalScale(10),
    },
    feeLabel: {
        fontSize: moderateScale(13),
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
    feeAmount: {
        fontSize: moderateScale(15),
        fontWeight: '700',
        color: COLORS.success,
    },
    amountGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: scale(10),
    },
    amountCard: {
        width: '31%',
        backgroundColor: COLORS.white,
        borderWidth: scale(2),
        borderColor: COLORS.border,
        borderRadius: moderateScale(12),
        paddingVertical: verticalScale(14),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    amountText: {
        fontSize: moderateScale(15),
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    amountCurrency: {
        fontSize: moderateScale(11),
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginTop: verticalScale(2),
    },
    amountCardSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    amountTextSelected: {
        color: COLORS.white,
    },
    amountCurrencySelected: {
        color: COLORS.white,
    },
    operateurGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: scale(12),
    },
    operateurCard: {
        width: '48%',
        backgroundColor: COLORS.white,
        borderRadius: moderateScale(15),
        padding: scale(16),
        alignItems: 'center',
        borderWidth: scale(2),
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    operateurCardSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primaryLight,
    },
    operateurImg: {
        height: scale(60),
        width: scale(60),
        borderRadius: scale(30),
        marginBottom: verticalScale(10),
    },
    operateurLabel: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: verticalScale(4),
    },
    radioContainer: {
        position: 'absolute',
        top: scale(12),
        right: scale(12),
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(16),
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    submitButton: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        paddingVertical: verticalScale(16),
        borderRadius: moderateScale(12),
        alignItems: 'center',
        justifyContent: 'center',
        gap: scale(10),
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    submitButtonDisabled: {
        backgroundColor: COLORS.border,
        shadowOpacity: 0,
        elevation: 0,
    },
    submitButtonText: {
        fontSize: moderateScale(16),
        fontWeight: '700',
        color: COLORS.white,
    },
})
