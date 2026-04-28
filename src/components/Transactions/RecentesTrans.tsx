import { COLORS } from "@/src/constants";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import DetailTransaction from "../modals/DetailTransactionModal";

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
                >
                    <Text style={styles.link}>Voir plus</Text>
                    <Ionicons name="chevron-forward" size={scale(15)} color={COLORS.primary}/>
                </TouchableOpacity>
            </View>

            {data.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.info}
                    onPress={() => setShowModal(true)}
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
                            <View style={{ gap: scale(4)}}>
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
              amount=""
              status=""
              name=""
              date=""
              transactionId=""
              fees=""
              number=""
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
    }
});