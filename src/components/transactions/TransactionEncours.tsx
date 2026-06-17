import { COLORS } from '@/src/constants';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import DetailTransaction from '../modals/DetailTransactionModal';
import HeaderScreen from '../ui/HeaderScreen';
import { useTranslation } from 'react-i18next';

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
        const { t } = useTranslation();
        const [showModal, setShowModal] = useState(false);
        const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
    
  return (
    <SafeAreaView style={styles.safe}>
        <HeaderScreen title={t('transactions.pending')} />
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: verticalScale(20) }}
            >
                 {transactionsEncours.map((item, index) => (
                                                <TouchableOpacity
                                                    key={index}
                                                    style={styles.transactionCard}
                                                    onPress={() => {
                                                        setSelectedTransaction(item);
                                                        setShowModal(true);
                                                    }}
                                                    activeOpacity={0.7}
                                                >
                                                    <View 
                                                        style={[
                                                            styles.transactionIcon,
                                                            item.status === "entrant" ? styles.iconEntrant : styles.iconSortant,
                                                        ]}
                                                    >
                                                        <Feather 
                                                            name={item.status === "sortant" ? "arrow-up-right" : "arrow-down-left"} 
                                                            color={item.status === "entrant" ? COLORS.success : COLORS.error} 
                                                            size={scale(20)}
                                                        />
                                                    </View>
                                                    
                                                    <View style={styles.transactionInfo}>
                                                        <Text style={styles.transactionName} numberOfLines={1}>{item.name}</Text>
                                                        <Text style={styles.transactionPhone}>{item.phone}</Text>
                                                    </View>
                                                    
                                                    <View style={styles.transactionRight}>
                                                        <Text
                                                            style={[
                                                                styles.transactionAmount,
                                                                { color: item.status === "entrant" ? COLORS.success : COLORS.error }
                                                            ]}
                                                            numberOfLines={1}
                                                        >
                                                            {item.status === "entrant" ? "+" : "-"}{item.amount}
                                                        </Text>
                                                        <Text style={styles.transactionDate}>{item.date}</Text>
                                                    </View>
                                                </TouchableOpacity>
                            ))}

                <DetailTransaction
                    visible={showModal}
                    onClose={() => setShowModal(false)}
                    amount={selectedTransaction?.amount || "0"}
                    status={t('transactions.statusPending')}
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
    transactionCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderRadius: moderateScale(12),
        padding: scale(12),
        marginBottom: verticalScale(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    transactionIcon: {
        width: scale(45),
        height: scale(45),
        borderRadius: moderateScale(10),
        justifyContent: "center",
        alignItems: "center",
        marginRight: scale(12),
    },
    iconEntrant: {
        backgroundColor: COLORS.successLight,
        borderColor: COLORS.success,
        borderWidth: 1,
    },
    iconSortant: {
        backgroundColor: COLORS.errorLight,
        borderColor: COLORS.error,
        borderWidth: 1,
    },
    transactionInfo: {
        flex: 1,
        marginRight: scale(8),
    },
    transactionName: {
        fontSize: moderateScale(15),
        fontWeight: "700",
        color: COLORS.textPrimary,
        marginBottom: verticalScale(3),
    },
    transactionPhone: {
        fontSize: moderateScale(13),
        color: COLORS.textSecondary,
    },
    transactionRight: {
        alignItems: "flex-end",
    },
    transactionAmount: {
        fontSize: moderateScale(15),
        fontWeight: "700",
        marginBottom: verticalScale(3),
    },
    transactionDate: {
        fontSize: moderateScale(11),
        color: COLORS.textSecondary,
    },
});