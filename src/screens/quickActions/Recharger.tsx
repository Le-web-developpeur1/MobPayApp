import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '@/src/constants'
import { scale, moderateScale, verticalScale } from 'react-native-size-matters'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderScreen from '@/src/components/ui/HeaderScreen'
import { FontAwesome5, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import Contact from './../../components/contact/Contact';

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
      const [amount, setAmount]                   = useState("");
    const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
      
    
  return (
    <SafeAreaView style={styles.safe}>
        <HeaderScreen title='Recharger mon compte' />
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.title}>
                <FontAwesome5 name='money-bill-alt' size={scale(22)} color={COLORS.primary}/>
                <Text style={styles.titleText}>Montant à recharger</Text>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    label="Montant transféré"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    theme={{
                        colors: {
                            placeholder: COLORS.textSecondary,
                            text: COLORS.textPrimary,
                            primary: COLORS.primary,
                        },
                    }}
                    mode="outlined"
                />
                <TextInput
                    style={styles.input}
                    label="Montant reçu"
                    keyboardType="numeric"
                    theme={{
                        colors: {
                            placeholder: COLORS.textSecondary,
                            text: COLORS.textPrimary,
                            primary: COLORS.primary,
                        },
                    }}
                    mode="outlined"
                />
            </View>
            <View style={{ flexDirection: "row", paddingTop: verticalScale(10),}}>
                <Text>Solde disponible </Text>
                <Text> 2 000 000 GNF</Text>
            </View>
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
                        {c.prix.toLocaleString()} GNF
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Choisir l'opérateur</Text>
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
        paddingHorizontal: scale(20),
        backgroundColor: COLORS.background,
        paddingTop: verticalScale(10)
    },
    scrollContent: {
        paddingBottom: verticalScale(20),
    },
    title: {
        flexDirection: 'row',
        alignItems: "center",
        gap: scale(10)
    },
    titleText: {
        fontSize: moderateScale(18),
        fontWeight: "bold",
    },
    inputView: {
        backgroundColor: "#ccc",
        height: "auto",
        padding: scale(10),
        marginTop: verticalScale(10),
        borderRadius: moderateScale(10)
    },
    input:{
        backgroundColor: COLORS.white,
        fontSize: moderateScale(16),
    },
    solde: {
        flexDirection: "row",
    },
    section: {
        marginTop: verticalScale(10),
    },
    sectionTitle: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        paddingBottom: verticalScale(5)
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
        paddingVertical: verticalScale(16),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    amountText: {
        fontSize: moderateScale(14),
        fontWeight: '700',
        color: COLORS.textPrimary,
    },
    amountCardSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    amountTextSelected: {
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
        borderRadius: moderateScale(12),
        padding: scale(12),
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
    },
    operateurImg: {
        height: scale(60),
        width: scale(60),
        borderRadius: scale(30),
        marginBottom: verticalScale(8),
    },
    operateurLabel: {
        fontSize: moderateScale(14),
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: verticalScale(4),
    },
    radioContainer: {
        position: 'absolute',
        top: scale(8),
        right: scale(8),
    },
})