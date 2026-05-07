import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderScreen from '../ui/HeaderScreen'
import { COLORS } from '@/src/constants';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Feather } from '@expo/vector-icons';
import DetailTransaction from '../modals/DetailTransactionModal';

const transactionsEncours = [
    {
        name: "Rouguiatou Diallo",
        amount: "1 200 000 GNF",
        date: "28 Janvier 2026",
        status: "sortant",
        phone: "626058033",
    },
    {
        name: "Rouguiatou Diallo",
        amount: "1 200 000 GNF",
        date: "28 Janvier 2026",
        status: "sortant",
        phone: "626058033",
    },
    {
        name: "Rouguiatou Diallo",
        amount: "1 200 000 GNF",
        date: "28 Janvier 2026",
        status: "sortant",
        phone: "626058033",
    },
    {
        name: "Rouguiatou Diallo",
        amount: "1 200 000 GNF",
        date: "28 Janvier 2026",
        status: "sortant",
        phone: "626058033",
    },
    {
        name: "Alphonse Kaman",
        amount: "599 000 GNF",
        date: "21 Décembre 2025",
        status: "entrant",
        phone: "626058033",
    },
    {
        name: "Alphonse Kaman",
        amount: "599 000 GNF",
        date: "21 Décembre 2025",
        status: "entrant",
        phone: "626058033",
    },
    {
        name: "Alphonse Kaman",
        amount: "599 000 GNF",
        date: "21 Décembre 2025",
        status: "entrant",
        phone: "626058033",
    },
    {
        name: "Alphonse Kaman",
        amount: "599 000 GNF",
        date: "21 Décembre 2025",
        status: "entrant",
        phone: "626058033",
    },
];

export default function TransactionEncours() {
        const [showModal, setShowModal] = useState(false);
        const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
    
  return (
    <SafeAreaView style={styles.safe}>
        <HeaderScreen title='Transactions Encours' />
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: verticalScale(20) }}
            >
                {transactionsEncours.map((item, index) => (
                    <TouchableOpacity
                        style={styles.info}
                        key={index}
                        onPress={() => {
                            setSelectedTransaction(item);
                            setShowModal(true);
                        }}
                    >
                        <View style={styles.card}>
                            <View style={{ flexDirection: "row", gap: scale(15), justifyContent: "center", alignItems: "center"}}>
                                <View 
                                    style={[
                                        styles.iconContainer,
                                        item.status === "entrant" && styles.iconContainerEntrant,
                                        item.status === "sortant" && styles.iconContainerSortant,
                                    ]}
                                >
                                    <Feather 
                                        name={item.status === "sortant" ? "arrow-up-right" : "arrow-down-left"}
                                        color={item.status === "entrant" ? COLORS.success : COLORS.error}
                                        size={scale(22)}
                                    />
                                </View>
                                <View style={{ gap: scale(4) }}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.date}>{item.phone}</Text>
                                </View>
                            </View>
                            <View style={{ gap: scale(4), alignItems: "flex-end", justifyContent: "center"}}>
                                <Text
                                    style={[
                                        styles.amount,
                                        item.status === "entrant" && {color: COLORS.success},
                                        item.status === "sortant" && {color: COLORS.error}
                                    ]}
                                >
                                    {item.amount}
                                </Text>
                                <Text style={styles.date}>{item.date}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                <DetailTransaction
                    visible={showModal}
                    onClose={() => setShowModal(false)}
                    amount={selectedTransaction?.amount || "0"}
                    status="En cours"
                    name={selectedTransaction?.name || ""}
                    date={selectedTransaction?.date || ""}
                    transactionId={`TRX${Date.now().toString().slice(-8)}`}
                    fees=""
                    number={selectedTransaction?.phone || ""}
                    note=""
                />
                
            </ScrollView>
        </View>
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
        paddingTop: verticalScale(20),
        paddingHorizontal: scale(20),
    },
    info: {
        paddingVertical: verticalScale(12),
        paddingHorizontal: scale(12),
        backgroundColor: COLORS.white,
        borderRadius: moderateScale(12),
        marginTop: verticalScale(8),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconContainer: {
        width: scale(50),
        height: verticalScale(50),
        borderRadius: moderateScale(10),
        justifyContent: "center",
        alignItems: "center",
    },
    iconContainerEntrant: {
        backgroundColor: COLORS.successLight,
        borderColor: COLORS.success,
        borderWidth: scale(1),
    },
    iconContainerSortant: {
        backgroundColor: COLORS.errorLight,
        borderColor: COLORS.error,
        borderWidth: scale(1),
    },
    name: {
        fontSize: moderateScale(16),
        fontWeight: "700",
        color: COLORS.textPrimary,
    },
    amount: {
        fontSize: moderateScale(16),
        fontWeight: "700",
    },
    date: {
        color: COLORS.textSecondary,
        fontSize: moderateScale(12),
    }
});