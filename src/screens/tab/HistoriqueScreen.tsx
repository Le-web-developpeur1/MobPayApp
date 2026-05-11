import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import DetailTransaction from '../../components/modals/DetailTransactionModal';
import { COLORS } from '../../constants';
import { useTranslation } from 'react-i18next';

const week = [
    {
        name: "Boubacar Bah",
        amount: "600 000",
        date: "01 Fév 2026",
        status: "entrant",
        phone: "626058033",
    },
    {
        name: "Fodé Douno",
        amount: "849 000",
        date: "02 Fév 2026",
        status: "sortant",
        phone: "626058033",
    },
];
const month = [
    {
        name: "Rouguiatou Diallo",
        amount: "1 200 000",
        date: "28 Jan 2026",
        status: "sortant",
        phone: "626058033",
    },
    {
        name: "Alphonse Kaman",
        amount: "599 000",
        date: "21 Déc 2025",
        status: "entrant",
        phone: "626058033",
        
    },
    {
        name: "Boubacar Bah",
        amount: "600 000",
        date: "01 Fév 2026",
        status: "entrant",
        phone: "626058033",
    },
    {
        name: "Fodé Douno",
        amount: "849 000",
        date: "02 Fév 2026",
        status: "sortant",
        phone: "626058033",
    },
];
const all = [
    {
        name: "Rouguiatou Diallo",
        amount: "1 200 000",
        date: "28 Jan 2026",
        status: "sortant",
        phone: "626058033",
    },
    {
        name: "Alphonse Kaman",
        amount: "599 000",
        date: "21 Déc 2025",
        status: "entrant",
        phone: "626058033",
        
    },
    {
        name: "Boubacar Bah",
        amount: "600 000",
        date: "01 Fév 2026",
        status: "entrant",
        phone: "626058033",
    },
    {
        name: "Fodé Douno",
        amount: "849 000",
        date: "02 Fév 2026",
        status: "sortant",
        phone: "626058033",
    },
];
const year = [
    {
        name: "Rouguiatou Diallo",
        amount: "1 200 000",
        date: "28 Jan 2026",
        status: "sortant",
        phone: "626058033",
    },
    {
        name: "Alphonse Kaman",
        amount: "599 000",
        date: "21 Déc 2025",
        status: "entrant",
        phone: "626058033",
        
    },
    {
        name: "Boubacar Bah",
        amount: "600 000",
        date: "01 Fév 2026",
        status: "entrant",
        phone: "626058033",
    },
    {
        name: "Fodé Douno",
        amount: "849 000",
        date: "02 Fév 2026",
        status: "sortant",
        phone: "626058033",
    },
];

export default function HistoriqueScreen() {
    const { t } = useTranslation();
    const [activTab, setActivTab] = useState<"all" | "week" | "month" | "year">("all");
    const data = activTab === "all" ? all : activTab === "week" ? week : activTab === "month" ? month : year;
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

    const handleTransactionPress = (item: any) => {
        setSelectedTransaction(item);
        setModalVisible(true);
    };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>{t('history.title')}</Text>
                <Text style={styles.subtitle}>{t('history.allTransactions')}</Text>
            </View>

            {/* Cartes de résumé */}
            <View style={styles.summaryRow}>
                <View style={styles.summaryCard}>
                    <View style={[styles.iconCircle, { backgroundColor: COLORS.successLight }]}>
                        <Feather name="arrow-down-left" size={scale(18)} color={COLORS.success} />
                    </View>
                    <Text style={styles.summaryLabel}>{t('history.totalReceived')}</Text>
                    <Text style={styles.summaryAmount}>1 500 000</Text>
                    <Text style={styles.summaryCurrency}>GNF {t('history.thisMonth')}</Text>
                </View>
                
                <View style={styles.summaryCard}>
                    <View style={[styles.iconCircle, { backgroundColor: COLORS.errorLight }]}>
                        <Feather name="arrow-up-right" size={scale(18)} color={COLORS.error} />
                    </View>
                    <Text style={styles.summaryLabel}>{t('history.totalSent')}</Text>
                    <Text style={styles.summaryAmount}>1 500 000</Text>
                    <Text style={styles.summaryCurrency}>GNF {t('history.thisMonth')}</Text>
                </View>
            </View>

            {/* Filtres */}
            <View style={styles.filterContainer}>
                <TouchableOpacity 
                    style={[styles.filterButton, activTab === "all" && styles.filterButtonActive]}
                    onPress={() => setActivTab("all")}
                >
                    <Text style={[styles.filterText, activTab === "all" && styles.filterTextActive]}>
                        {t('history.all')}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.filterButton, activTab === "week" && styles.filterButtonActive]}
                    onPress={() => setActivTab("week")}
                >
                    <Text style={[styles.filterText, activTab === "week" && styles.filterTextActive]}>
                        {t('history.week')}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.filterButton, activTab === "month" && styles.filterButtonActive]}
                    onPress={() => setActivTab("month")}
                >
                    <Text style={[styles.filterText, activTab === "month" && styles.filterTextActive]}>
                        {t('history.month')}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.filterButton, activTab === "year" && styles.filterButtonActive]}
                    onPress={() => setActivTab("year")}
                >
                    <Text style={[styles.filterText, activTab === "year" && styles.filterTextActive]}>
                        {t('history.year')}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Liste des transactions */}
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {data.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.transactionCard}
                        onPress={() => handleTransactionPress(item)}
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
            </ScrollView>
        </View>
        
        <DetailTransaction
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            amount={selectedTransaction?.amount || ""}
            status="success"
            name={selectedTransaction?.name || ""}
            date={selectedTransaction?.date || ""}
            transactionId={`TXN${Date.now()}`}
            fees="5 000"
            number={selectedTransaction?.phone || ""}
            note="Transaction mobile"
        />
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    container: {
        flex: 1,
        paddingHorizontal: scale(20),
        backgroundColor: COLORS.background,
    },
    header: {
        paddingTop: verticalScale(10),
        marginBottom: verticalScale(15),
    },
    title: {
        fontSize: moderateScale(28),
        fontWeight: "bold",
        color: COLORS.textPrimary,
        marginBottom: verticalScale(4),
    },
    subtitle: {
        fontSize: moderateScale(14),
        color: COLORS.textSecondary,
    },
    summaryRow: {
        flexDirection: "row",
        marginBottom: verticalScale(15),
        gap: scale(12),
    },
    summaryCard: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: scale(15),
        borderRadius: moderateScale(12),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    iconCircle: {
        width: scale(36),
        height: scale(36),
        borderRadius: scale(18),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(8),
    },
    summaryLabel: {
        fontSize: moderateScale(12),
        color: COLORS.textSecondary,
        marginBottom: verticalScale(4),
    },
    summaryAmount: {
        fontSize: moderateScale(18),
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: verticalScale(2),
    },
    summaryCurrency: {
        fontSize: moderateScale(11),
        color: COLORS.textSecondary,
    },
    filterContainer: {
        flexDirection: "row",
        backgroundColor: COLORS.white,
        borderRadius: moderateScale(10),
        padding: scale(4),
        marginBottom: verticalScale(15),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    filterButton: {
        flex: 1,
        paddingVertical: verticalScale(8),
        paddingHorizontal: scale(8),
        borderRadius: moderateScale(8),
        alignItems: 'center',
    },
    filterButtonActive: {
        backgroundColor: COLORS.primary,
    },
    filterText: {
        fontSize: moderateScale(13),
        fontWeight: "600",
        color: COLORS.textSecondary,
    },
    filterTextActive: {
        color: COLORS.white,
        fontWeight: "700",
    },
    scrollContent: {
        paddingBottom: verticalScale(100),
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
