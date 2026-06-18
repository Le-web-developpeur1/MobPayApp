import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { COLORS } from '../../constants';
import QrCode from "react-native-qrcode-svg";


export default function BalanceCard() {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(true);
    

    return (
        <View style={{ paddingHorizontal: scale(20)}}>
            <View style={styles.safe}>
                <View style={styles.container}>
                    <View style={styles.solde}>
                        <View>
                            <View style={{ flexDirection: "row", gap: scale(10), alignItems: "center"}}>
                                <Ionicons name="wallet-outline" size={scale(22)} color={COLORS.white}/>
                                <Text style={{ color: COLORS.white, fontSize: moderateScale(18)}}>{t('home.availableBalance')}</Text>
                            </View>
                            {visible ? (
                                <View> 
                                    <Text style={styles.soldeDispo}>•••••••••••••</Text>
                                </View>
                            ) : (
                                <View>
                                    <Text  style={styles.soldeDispo}>1 954 580 750 GNF</Text>
                                </View>
                            )}
                        </View>
                        <View style={styles.soldeRes}>
                            <Ionicons name="bag-outline" size={scale(15)} color={COLORS.textPrimary}/>
                            <Text style={{ color: COLORS.textPrimary, fontSize: moderateScale(12) }}>{t('home.balance')}:</Text>
                            {visible ? (
                                <View>
                                    <Text style={{ color: COLORS.textPrimary }}>•••••</Text>
                                </View>
                                ) : (
                                    <View>
                                        <Text style={{ color: COLORS.textPrimary }}>14 580 260 GNF</Text>
                                    </View>
                                )
                            }
                        </View>

                    </View>
                    <View style={styles.iconeView}>
                        <TouchableOpacity 
                            onPress={() => setVisible(!visible)}
                            style={styles.icone}
                        >
                            <Ionicons name={ visible ? "eye-off" : "eye-outline"} size={scale(22) } color={COLORS.primary}/>
                        </TouchableOpacity>
                    </View>
                </View>
                {visible && (
                    <View style={styles.qrContainer}>
                        <QrCode
                            value="626058033"
                            size={scale(70)}
                            color={COLORS.primary}
                            backgroundColor={COLORS.white}
                        />
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    safe: {
        flexDirection: "column",
        backgroundColor: COLORS.primary,
        borderRadius: moderateScale(10),
        paddingBottom: verticalScale(22)
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    solde: {
        gap: scale(15),
        paddingHorizontal: scale(15),
        padding: scale(10),
    },
    soldeDispo: {
        fontSize: moderateScale(30),
        paddingHorizontal: scale(5),
        fontWeight: "600",
        color: COLORS.white
    },
    soldeRes: {
        flexDirection: "row", 
        gap: scale(8), 
        alignItems: "center",
        paddingHorizontal: scale(10),
        backgroundColor: COLORS.secondary,
        padding: scale(5),
        borderRadius: moderateScale(10),
        fontWeight: "600"
    },
    iconeView: {
        position: "absolute",          
        top: scale(0),                 
        right: scale(0),               
        backgroundColor: "#ffffff90",
        width: scale(70),
        height: verticalScale(50),
        borderTopRightRadius: moderateScale(10), 
        justifyContent: "center",
        alignItems: "flex-end",        
        paddingRight: scale(10),
        borderBottomLeftRadius: moderateScale(80), 
    },
    icone: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(20),       
        justifyContent: "center",
        alignItems: "center",
    },
    bouton: {
        flexDirection: "row",
        backgroundColor: "#ffffff90",
        width: scale(250),
        justifyContent: "center",
        alignItems: "center",
        padding: scale(10),
        borderRadius: moderateScale(10),
        gap: scale(10),
    },
    text: {
        fontWeight: "bold",
        fontSize: moderateScale(18),
        color: COLORS.white,
    },
    qrContainer: {
        position: "absolute",          
        justifyContent:"center",
        alignItems: "center",
        padding: scale(6),
        borderRadius: moderateScale(8),
        top: verticalScale(55),
        right: scale(15),
        backgroundColor: "#ffffff30",
    },
});