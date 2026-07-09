import HeaderScreen from '@/src/components/ui/HeaderScreen'
import { COLORS } from '@/src/constants'
import { RootStackParamList } from '@/src/navigation/types'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { ROUTES } from '@/src/constants'

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const OPERATEURS = [
    { id: 'agent',          type: 'icon',   label: "Chez un agent",          icon: 'person-outline' },
    { id: 'code',           type: 'icon',   label: "Retrait code",           icon: 'key-outline' },
    { id: 'mobile',         type: 'icon',   label: "Mobile Money",           icon: 'card-outline' },
    { id: 'bank',           type: 'icon',   label: "Depuis ma banque",       icon: 'business-outline' },
    { id: 'international',  type: 'icon',   label: "Depuis l'international", icon: 'globe-outline' },
];

const LISTE = [
    {numero: 1, descprition: "Se présenter dans une agence CashMoov ou chez un partenaire" },
    {numero: 2, descprition: "Se présenter dans une agence CashMoov ou chez un partenaire" },
    {numero: 3, descprition: "Se présenter dans une agence CashMoov ou chez un partenaire" },
    {numero: 4, descprition: "Se présenter dans une agence CashMoov ou chez un partenaire" },
    {numero: 5, descprition: "Se présenter dans une agence CashMoov ou chez un partenaire" },
];

export default function MRecharger() {
    const [openModal, setOpenModal] = useState(false);
    const navigation = useNavigation<NavigationProp>();
    
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
                        Comment voulez-vous recharger votre compte CashMoov ?
                    </Text>
                </View>
                <View style={styles.operateurGrid}>
                    {OPERATEURS.map((op, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.operateurCard}
                            onPress={() => {
                                if (op.id === 'mobile') {
                                    navigation.navigate('Recharger');
                                } else if (op.id === 'agent') {
                                    setOpenModal(true);
                                } else if (op.id === 'code') {
                                    navigation.navigate("RetraitCode");
                                } else if (op.id === 'international') {
                                    navigation.navigate(ROUTES.INTERNATIONAL, { transactionType: "Recharge"});
                                }
                            }}
                        >
                            <View style={styles.iconCircle}>
                                <Ionicons name={op.icon as any} size={scale(28)} color={COLORS.white}/>
                            </View>
                            <Text style={styles.operateurLabel}>{op.label}</Text>
                        </TouchableOpacity>
                    ))}
                    
                </View>
            </ScrollView>
            <Modal visible={openModal} transparent={true} animationType='fade'>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
                        <View style={styles.modalBackdrop} />
                    </TouchableWithoutFeedback>
                    
                    <View style={styles.modalContent}>
                        {/* Header Modal */}
                        <View style={styles.modalHeader}>
                            <View style={styles.modalIconWrapper}>
                                <Ionicons name='information-circle' size={scale(32)} color={COLORS.primary}/>
                            </View>
                            <Text style={styles.modalTitle}>Recharge chez un agent</Text>
                            <TouchableOpacity 
                                style={styles.closeButton}
                                onPress={() => setOpenModal(false)}
                            >
                                <Ionicons name='close' size={scale(24)} color={COLORS.textSecondary}/>
                            </TouchableOpacity>
                        </View>

                        {/* Alert Info */}
                        <View style={styles.alerteInfo}>
                            <Text style={styles.alerteText}>
                                Il est possible d'alimenter votre compte CashMoov directement dans nos agences et points partenaires.
                            </Text>
                        </View>

                        {/* Steps Section */}
                        <View style={styles.stepsSection}>
                            <View style={styles.stepsTitleRow}>
                                <MaterialIcons name='format-list-numbered' size={scale(24)} color={COLORS.primary}/>
                                <Text style={styles.stepsTitle}>Étapes à suivre</Text>
                            </View>
                            
                            <View style={styles.stepsList}>
                                {LISTE.map((list, index) => (
                                    <View key={index} style={styles.stepItem}>
                                        <View style={styles.stepNumber}>
                                            <Text style={styles.stepNumberText}>{list.numero}</Text>
                                        </View>
                                        <Text style={styles.stepDescription}>{list.descprition}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Action Button */}
                        <TouchableOpacity 
                            style={styles.modalButton}
                            onPress={() => setOpenModal(false)}
                        >
                            <Text style={styles.modalButtonText}>J'ai compris</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
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
        padding: scale(15),
        alignItems: 'center',
        borderWidth: scale(2),
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        minHeight: verticalScale(140),
    },
    operateurCardSelected: {
        borderColor: COLORS.primary,
    },
    operateurImg: {
        height: scale(60),
        width: scale(60),
        borderRadius: scale(30),
        marginBottom: verticalScale(10),
    },
    iconCircle: {
        height: scale(60),
        width: scale(60),
        borderRadius: scale(30),
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(10),
    },
    operateurLabel: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: verticalScale(4),
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalBackdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    modalContent: {
        width: "95%",
        maxWidth: scale(400),
        backgroundColor: COLORS.white,
        borderRadius: moderateScale(20),
        padding: scale(20),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(16),
    },
    modalIconWrapper: {
        width: scale(48),
        height: scale(48),
        borderRadius: scale(24),
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        width: scale(32),
        height: scale(32),
        borderRadius: scale(16),
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: moderateScale(20),
        fontWeight: '700',
        color: COLORS.textPrimary,
        textAlign: "center",
    },
    alerteInfo: {
        backgroundColor: COLORS.secondary,
        padding: scale(16),
        borderRadius: moderateScale(12),
        marginBottom: verticalScale(20),
        borderLeftWidth: scale(4),
        borderLeftColor: COLORS.primary,
    },
    alerteText: {
        fontSize: moderateScale(14),
        color: COLORS.textSecondary,
        lineHeight: moderateScale(20),
    },
    stepsSection: {
        marginBottom: verticalScale(24),
    },
    stepsTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8),
        marginBottom: verticalScale(16),
    },
    stepsTitle: {
        fontSize: moderateScale(16),
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    stepsList: {
        gap: verticalScale(12),
    },
    stepItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: scale(12),
    },
    stepNumber: {
        width: scale(28),
        height: scale(28),
        borderRadius: scale(14),
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(2),
    },
    stepNumberText: {
        fontSize: moderateScale(14),
        fontWeight: '700',
        color: COLORS.white,
    },
    stepDescription: {
        flex: 1,
        fontSize: moderateScale(13),
        color: COLORS.textSecondary,
        lineHeight: moderateScale(20),
    },
    modalButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: verticalScale(14),
        borderRadius: moderateScale(12),
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    modalButtonText: {
        fontSize: moderateScale(15),
        fontWeight: '600',
        color: COLORS.white,
    }
});