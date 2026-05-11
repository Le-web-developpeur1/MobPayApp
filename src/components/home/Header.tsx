import { COLORS, ROUTES } from "@/src/constants";
import { RootStackParamList } from "@/src/navigation/types";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "expo-router";
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Header() {
    const { t } = useTranslation();
    const unreadCount = 2;
    const navigation = useNavigation<NavigationProps>();
    
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.greeting}>{t('home.hello')} 👋</Text>
                <Text style={styles.name}>Boubacar Bah</Text>
            </View>
            <TouchableOpacity 
                style={styles.icon}
                onPress={() => navigation.navigate(ROUTES.NOTIFICATION)}
            >
                <View style={{ position: "relative"}}>
                    <Ionicons name="notifications-outline" size={scale(24)} color={COLORS.primary}/>
                    {unreadCount > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{unreadCount}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(10),
        alignItems: "center",
        paddingBottom: verticalScale(10),
    },
    info: {
        flexDirection: "column",
        gap: scale(5),
    },
    greeting: {
        fontSize: moderateScale(14),
        color: COLORS.textPrimary,
    },
    name: {
        fontWeight: "bold",
        fontSize: moderateScale(22),
        color: COLORS.textPrimary,
    },
    icon: {
        backgroundColor: COLORS.primaryLight,
        borderColor: COLORS.primary,
        borderWidth: scale(1),
        height: verticalScale(40),
        width: scale(40),
        borderRadius: moderateScale(20),
        alignItems: "center",
        justifyContent: "center",
    },
    badge: {
        position: "absolute",
        right: scale(-5),
        top: verticalScale(-5),
        backgroundColor: COLORS.secondary,
        borderRadius: moderateScale(10),
        width: scale(18),
        height: verticalScale(18),
        alignItems: "center",
        justifyContent: "center",
      },
      badgeText: {
        color: COLORS.primary,
        fontSize: moderateScale(10),
        fontWeight: "bold",
      },
})