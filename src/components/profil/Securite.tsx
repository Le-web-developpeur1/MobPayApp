import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { FontAwesome6, Ionicons, MaterialIcons, } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Securite() {
    const navigation = useNavigation<NavigationProp>();
    const [bioToggle, setBioToggle] = useState(true);
    const [authToggle, setAuthToggle] = useState(false);

    const handleLogout = () => {
        Alert.alert(
            "Êtes-vous sûr de vouloir vous déconnecter de l'application ?",
            "Cette action vous déconnectera de l'application",
            [
                {
                    text: "Ok",
                    onPress: () => navigation.navigate(ROUTES.LOGIN),
                }
            ]
        )
    };

  return (
    <View style={styles.container}>
        <View style={styles.cardGroup}>
            <View style={styles.card}>
                <View style={styles.cardLeft}>
                    <View style={[styles.icon, { backgroundColor: "#2BA66860", borderColor: "#2BA668",}]}>
                        <Ionicons name='finger-print-outline' size={scale(30)} color={"#2BA668"}/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.tilte}>Biométrie</Text>
                        <Text style={styles.subtitle}>Empreinte & Face ID</Text>
                    </View>
                </View>
                <TouchableOpacity
                        onPress={() => setBioToggle(!bioToggle)}
                >
                        {bioToggle ? (
                            <FontAwesome6 name='toggle-on' color={COLORS.primary} size={scale(25)} />
                        ) : (
                            <FontAwesome6 name='toggle-off' color={COLORS.primary} size={scale(25)} />
                        )}
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                <View style={styles.cardLeft}>
                    <View style={[styles.icon, { backgroundColor: "#6A1B9A40", borderColor: "#6A1B9A"}]}>
                        <Ionicons name='shield-checkmark-outline' size={scale(30)} color={"#6A1B9A"}/>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.tilte}>Double authentification</Text>
                        <Text style={styles.subtitle}>Via SMS ou email</Text>
                    </View>
                </View>
                <TouchableOpacity
                        onPress={() => setAuthToggle(!authToggle)}
                >
                        {authToggle ? (
                            <FontAwesome6 name='toggle-on' color={COLORS.primary} size={scale(25)} />
                        ) : (
                            <FontAwesome6 name='toggle-off' color={COLORS.primary} size={scale(25)} />
                        )}
                </TouchableOpacity>
            </View>

        </View>
        <TouchableOpacity 
            style={styles.singleCard}
            onPress={() => navigation.navigate(ROUTES.CHANGE_PIN)}
        >
            <View style={styles.cardLeft}>
                <View style={[styles.icon, { backgroundColor: "#FBC02D40", borderColor: "#FBC02D",}]}>
                    <Ionicons name='lock-closed-outline' size={scale(30)} color={"#FBC02D"}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.tilte}>Changer le PIN</Text>
                    <Text style={styles.subtitle}>4 chiffres requis</Text>
                </View>
            </View>
            <Ionicons name='chevron-forward' size={scale(20)} color={COLORS.textSecondary}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.singleCard}>
            <View style={styles.cardLeft}>
                <View style={[styles.icon, { backgroundColor: "#1976D240", borderColor: "#1976D2",}]}>
                    <Ionicons name='globe-outline' size={scale(30)} color={"#1976D2"}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.tilte}>Session actives</Text>
                    <Text style={styles.subtitle}>1 appareil connecté</Text>
                </View>
            </View>
            <Ionicons name='chevron-forward' size={scale(20)} color={COLORS.textSecondary}/>
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.singleCard}
            onPress={() => handleLogout()}
        >
            <View style={styles.cardLeft}>
                <View style={[styles.icon, { backgroundColor: "#D32F2F40", borderColor: "#D32F2F",}]}>
                    <MaterialIcons name='logout' size={scale(30)} color={"#D32F2F"}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={[styles.tilte, { color: "#D32F2F"}]}>Déconnexion</Text>
                    <Text style={styles.subtitle}>Terminer la session</Text>
                </View>
            </View>
            <Ionicons name='chevron-forward' size={scale(20)} color={COLORS.textSecondary}/>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        
    },
    cardGroup: {
        backgroundColor: COLORS.white,
        borderRadius: moderateScale(12),
        overflow: 'hidden',
        marginBottom: verticalScale(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    card: {
        paddingHorizontal: scale(15),
        paddingVertical: verticalScale(15),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: verticalScale(80),
        borderBottomWidth: scale(1),
        borderBottomColor: COLORS.border,
    },
    singleCard: {
        paddingHorizontal: scale(15),
        paddingVertical: verticalScale(15),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: verticalScale(80),
        backgroundColor: COLORS.white,
        borderRadius: moderateScale(12),
        marginBottom: verticalScale(10),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(12),
        flex: 1,
    },
    textContainer: {
        gap: scale(5),
        flex: 1,
    },
    tilte: {
        fontSize: moderateScale(16),
        fontWeight: "700",
        color: COLORS.textPrimary,
    },
    subtitle: {
        fontSize: moderateScale(13),
        color: COLORS.textSecondary,
    },
    icon: {
        height: scale(45),
        width: scale(45),
        alignItems: "center",
        justifyContent: "center",
        borderWidth: scale(1),
        borderRadius: moderateScale(12),
    },
});