import { COLORS, ROUTES } from "@/src/constants";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import DetailTransaction from "../modals/DetailTransactionModal";
import { RootStackParamList } from "@/src/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const transactionsReussies = [
    {
        name: "Boubacar Bah",
        amount: "600 000 GNF",
        date: "01 Février 2026",
        status: "entrant",
        phone: "626058033",
    },
    {
        name: "Fodé Douno",
        amount: "849 000 GNF",
        date: "02 Février 2026",
        status: "sortant",
        phone: "626058033",
    },
];
const transactionsEncours = [
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
];


export default function RecentesTransaction() {
    const [activTab, setActivTab] = useState<"reussies" | "encours">("reussies");
    const data = activTab === "reussies" ? transactionsReussies : transactionsEncours;
    const [showModal, setShowModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<any>();
    const navigation = useNavigation<NavigationProp>();

    const navigationTrans = () => {
        if (activTab === "reussies") {
            navigation.navigate(ROUTES.HISTORIQUE);
        } else {
            navigation.navigate(ROUTES.TRANSACTIONS_ENCOURS);
        }
    };
   

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transactions récentes</Text>
            <View style={styles.statusView}>
                <View style={styles.status}>
                    <TouchableOpacity
                        onPress={() => setActivTab("reussies")}
                    >
                        <Text
                            style={[
                                styles.tab,
                                activTab === "reussies" && styles.activeTab,
                            ]}
                        >Réussies</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setActivTab("encours")}
                    >
                        <Text
                            style={[
                                styles.tab,
                                activTab === "encours" && styles.activeTab,
                            ]}
                        >En cours</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.voirPlus}
                    onPress={navigationTrans}
                >
                    <Text style={styles.link}>Voir plus</Text>
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
              amount={selectedTransaction?.amount}
              status={selectedTransaction?.status}
              name={selectedTransaction?.name}
              date={selectedTransaction?.date}
              transactionId={selectedTransaction?.amount}
              fees=""
              number={selectedTransaction?.phone}
              note=""
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
        fontSize: moderateScale(20),
        fontWeight: "bold",
        paddingBottom: verticalScale(10),
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