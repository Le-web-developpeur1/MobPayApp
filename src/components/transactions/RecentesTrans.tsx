import { COLORS, ROUTES } from "@/src/constants";
import { RootStackParamList } from "@/src/navigation/types";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import DetailTransaction from "../modals/DetailTransactionModal";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const transactionsReussies = [
    {
        name: "Boubacar Bah",
        amount: "600 000",
        date: "01 Fév 2026",
        type: "entrant",
        phone: "626058033",
        typeTransaction: "Réception OM",
        status: "success"
    },
    {
        name: "Fodé Dounoh",
        amount: "849 000",
        date: "02 Fév 2026",
        type: "sortant",
        phone: "626058033",
        typeTransaction: "Transfert Cash Moov",
        status: "success"
    },
];
const transactionsEncours = [
    {
        name: "Rouguiatou Diallo",
        amount: "1 200 000",
        date: "28 Jan '26",
        type: "sortant",
        phone: "626058033",
        typeTransaction: "Envoi OM",
        status: "pending"
    },
    {
        name: "Alphonse Kaman",
        amount: "599 000",
        date: "21 Déc 2025",
        type: "entrant",
        phone: "626058033",
        typeTransaction: "Recharge Crédit",
        status: "success"
    },
];


export default function RecentesTransaction() {
    const { t } = useTranslation();
    const [activTab, setActivTab] = useState<"reussies" | "encours">("reussies");
    const data = activTab === "reussies" ? transactionsReussies : transactionsEncours;
    const [showModal, setShowModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<any>();
    const navigation = useNavigation<NavigationProp>();

    const navigationTrans = () => {
        if (activTab === "reussies") {
            navigation.navigate("History");
        } else {
            navigation.navigate(ROUTES.TRANSACTIONS_ENCOURS);
        }
    };
   

    return (
        <View style={styles.container}>
            <View style={styles.statusView}>
                <Text style={styles.title}>{t('transactions.recent')}</Text>
                {/* <View style={styles.status}>
                    <TouchableOpacity
                        onPress={() => setActivTab("reussies")}
                    >
                        <Text
                            style={[
                                styles.tab,
                                activTab === "reussies" && styles.activeTab,
                            ]}
                        >
                            {t('transactions.completed')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setActivTab("encours")}
                    >
                        <Text
                            style={[
                                styles.tab,
                                activTab === "encours" && styles.activeTab,
                            ]}
                        >
                            {t('transactions.pending')}
                        </Text>
                    </TouchableOpacity>
                </View> */}
                <TouchableOpacity
                    style={styles.voirPlus}
                    onPress={navigationTrans}
                >
                    <Text style={styles.link}>{t('common.seeMore')}</Text>
                    <Ionicons name="chevron-forward" size={scale(15)} color={COLORS.primary}/>
                </TouchableOpacity>
            </View>

            {data.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.transactionCard}
                    onPress={() => {
                        setSelectedTransaction(item);
                        setShowModal(true);
                    }}
                    activeOpacity={0.7}
                >
                    {/* Côté gauche avec icône et info */}
                    <View style={styles.leftSection}>
                        <View style={[
                            styles.iconContainer,
                            item.type === "entrant" ? styles.iconContainerEntrant : styles.iconContainerSortant
                        ]}>
                            <Feather 
                                name={item.type === "sortant" ? "arrow-up-right" : "arrow-down-left"} 
                                color={item.type === "entrant" ? COLORS.success : COLORS.error} 
                                size={scale(22)}
                            />
                        </View>
                        
                        <View style={styles.transactionInfo}>
                            <Text style={styles.transactionName} numberOfLines={1}>{item.name}</Text>
                            <Text style={styles.transactionType}>{item.typeTransaction}</Text>
                            <View style={styles.phoneRow}>
                                <Ionicons name="call-outline" size={scale(11)} color={COLORS.textSecondary} />
                                <Text style={styles.transactionPhone}>{item.phone}</Text>
                            </View>
                        </View>
                    </View>
                    
                    {/* Côté droit avec montant et statut */}
                    <View style={styles.rightSection}>
                        <Text
                            style={[
                                styles.transactionAmount,
                                { color: item.type === "entrant" ? COLORS.success : COLORS.error }
                            ]}
                            numberOfLines={1}
                        >
                            {item.type === "entrant" ? "+" : "-"}{item.amount} GNF
                        </Text>
                        <Text style={styles.transactionDate}>{item.date}</Text>
                        <View style={[
                            styles.statusBadge,
                            item.status === "success" ? styles.statusSuccess : styles.statusPending
                        ]}>
                            <View style={[
                                styles.statusDot,
                                item.status === "success" ? styles.dotSuccess : styles.dotPending
                            ]} />
                            <Text style={[
                                styles.statusText,
                                item.status === "success" ? styles.statusSuccessText : styles.statusPendingText
                            ]}>
                                {item.status === "success" ? t('common.success') : t('transactions.statusPending')}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
            <DetailTransaction
              visible={showModal}
              onClose={() => setShowModal(false)}
              amount={selectedTransaction?.amount}
              status={selectedTransaction?.status}
              name={selectedTransaction?.name}
              date={selectedTransaction?.date}
              transactionId={selectedTransaction?.amount}
              fees=""
              number={selectedTransaction?.phone}
              note=""
              transferType={selectedTransaction?.typeTransaction}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: scale(20), 
        paddingVertical: verticalScale(15),
    },
    title: {
        fontSize: Platform.OS === "android" ? moderateScale(20) : moderateScale(15),
        fontWeight: "bold",
        // paddingBottom: verticalScale(10),
        color: COLORS.textPrimary,
    },
    statusView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: verticalScale(10),
    },
    status: {
        flexDirection: "row",
        gap: scale(15),
    },
    voirPlus: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: scale(4)
    },
    tab: {
        fontSize: moderateScale(14),
        fontWeight: "600",
        color: COLORS.textSecondary,
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(6),
    },
    activeTab: {
        color: COLORS.white, 
        fontWeight: "700", 
        backgroundColor: COLORS.primary, 
        borderRadius: moderateScale(8),
    },
    link: {
        color: COLORS.primary,
        fontWeight: "600",
        fontSize: moderateScale(13),
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
    },
    transactionCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderRadius: moderateScale(15),
        padding: scale(16),
        marginBottom: verticalScale(12),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
        borderLeftWidth: scale(4),
        borderLeftColor: COLORS.primary,
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    iconContainer: {
        width: scale(48),
        height: scale(48),
        borderRadius: moderateScale(12),
        justifyContent: "center",
        alignItems: "center",
        marginRight: scale(12),
    },
    iconContainerEntrant: {
        backgroundColor: COLORS.successLight,
    },
    iconContainerSortant: {
        backgroundColor: COLORS.errorLight,
    },
    transactionInfo: {
        flex: 1,
    },
    transactionName: {
        fontSize: moderateScale(16),
        fontWeight: "700",
        color: COLORS.textPrimary,
        marginBottom: verticalScale(4),
    },
    transactionType: {
        fontSize: moderateScale(13),
        color: COLORS.textSecondary,
        marginBottom: verticalScale(4),
    },
    phoneRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(4),
    },
    transactionPhone: {
        fontSize: moderateScale(12),
        color: COLORS.textSecondary,
    },
    rightSection: {
        alignItems: "flex-end",
        justifyContent: "center",
    },
    transactionAmount: {
        fontSize: moderateScale(17),
        fontWeight: "700",
        marginBottom: verticalScale(6),
    },
    dateRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(4),
        marginBottom: verticalScale(8),
    },
    transactionDate: {
        fontSize: moderateScale(12),
        color: COLORS.textSecondary,
        fontWeight: "500",
        marginBottom: verticalScale(8),
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(6),
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(5),
        borderRadius: moderateScale(8),
    },
    statusSuccess: {
        backgroundColor: COLORS.successLight,
    },
    statusPending: {
        backgroundColor: COLORS.warningLight ,
    },
    statusDot: {
        width: scale(6),
        height: scale(6),
        borderRadius: scale(3),
    },
    dotSuccess: {
        backgroundColor: COLORS.success,
    },
    dotPending: {
        backgroundColor: COLORS.warning || '#FFA500',
    },
    statusText: {
        fontSize: moderateScale(11),
        fontWeight: "600",
    },
    statusSuccessText: {
        color: COLORS.success,
    },
    statusPendingText: {
        color: COLORS.warning || '#FFA500',
    },
});