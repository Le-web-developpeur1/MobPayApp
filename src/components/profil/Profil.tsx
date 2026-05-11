import { RootStackParamList } from '@/src/navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { t } = useTranslation();

  return (
    <SafeAreaView
        style={{ flex: 1 }}
        edges={['top']}
    >
        <View style={styles.container}>
            <Text style={styles.title}>{t('profile.profile')}</Text>
            <View style={styles.info}>
                <View style={styles.photoProfil}>
                    <Text style={{ fontSize: moderateScale(25), color: "white"}}>BB</Text>
                </View>

                <Text style={styles.name}>Boubacar Bah</Text>
                <Text style={styles.phone}>+224 626 05 80 33</Text>
                <View style={styles.status}>
                    <Ionicons name='shield-checkmark-outline' size={scale(15)} color={"white"}/>
                    <Text style={styles.textStatus}>{t('profile.verifiedAccount')}</Text>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: verticalScale(20)}}
            >
                    {/**Frais */}
                <TouchableOpacity style={styles.sectionParams}>
                    <View style={styles.card}>
                        <View style={{ flexDirection : "row", gap: scale(20), justifyContent: "center", alignItems: "center"}}>
                            <View style={styles.icon}>
                                <Ionicons name='shield-checkmark-outline' size={scale(23)} color={"white"}/>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>{t('profile.fees')}</Text>
                                <Text style={styles.parametres}>{t('profile.transfersPayments')}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="chevron-forward-sharp" size={scale(20)} color={"#ccc"}/>
                        </View>
                    </View>
                </TouchableOpacity>
                     {/**Sécurité */}
                <TouchableOpacity 
                    style={styles.sectionParams}
                    onPress={() => navigation.navigate("SecuriteScreen")}
                >
                    <View style={styles.card}>
                        <View style={{ flexDirection : "row", gap: scale(20), justifyContent: "center", alignItems: "center"}}>
                            <View style={styles.icon}>
                                <Ionicons name='shield-checkmark-outline' size={scale(23)} color={"white"}/>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>{t('profile.security')}</Text>
                                <Text style={styles.parametres}>{t('profile.pinBiometric')}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="chevron-forward-sharp" size={scale(20)} color={"#ccc"}/>
                        </View>
                    </View>
                </TouchableOpacity>
                    {/**Point de service */}
                <TouchableOpacity style={styles.sectionParams}>
                    <View style={styles.card}>
                        <View style={{ flexDirection : "row", gap: scale(20), justifyContent: "center", alignItems: "center"}}>
                            <View style={styles.icon}>
                                <Ionicons name='shield-checkmark-outline' size={scale(23)} color={"white"}/>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>{t('profile.servicePoints')}</Text>
                                <Text style={styles.parametres}>{t('profile.agencies')}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="chevron-forward-sharp" size={scale(20)} color={"#ccc"}/>
                        </View>
                    </View>
                </TouchableOpacity>
                     {/**Limites */}
                <TouchableOpacity 
                    style={styles.sectionParams}
                    onPress={() => navigation.navigate("Limite")}
                >
                    <View style={styles.card}>
                        <View style={{ flexDirection : "row", gap: scale(20), justifyContent: "center", alignItems: "center"}}>
                            <View style={styles.icon}>
                                <Ionicons name='shield-checkmark-outline' size={scale(23)} color={"white"}/>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>{t('profile.transferLimits')}</Text>
                                <Text style={styles.parametres}>100 000 000 GNF/{t('profile.month')}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="chevron-forward-sharp" size={scale(20)} color={"#ccc"}/>
                        </View>
                    </View>
                </TouchableOpacity>
                     {/**Conditions */}
                <TouchableOpacity style={styles.sectionParams}>
                    <View style={styles.card}>
                        <View style={{ flexDirection : "row", gap: scale(20), justifyContent: "center", alignItems: "center"}}>
                            <View style={styles.icon}>
                                <Ionicons name='shield-checkmark-outline' size={scale(23)} color={"white"}/>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>{t('profile.terms')}</Text>
                                <Text style={styles.parametres}>{t('profile.termsPrivacyAbout')}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="chevron-forward-sharp" size={scale(20)} color={"#ccc"}/>
                        </View>
                    </View>
                </TouchableOpacity>
                    {/**Notifications */}
                <TouchableOpacity 
                    style={styles.sectionParams}
                    onPress={() => navigation.navigate("PreferenceNotif")}
                >
                    <View style={styles.card}>
                        <View style={{ flexDirection : "row", gap: scale(20), justifyContent: "center", alignItems: "center"}}>
                            <View style={styles.icon}>
                                <Ionicons name='notifications-outline' size={scale(23)} color={"white"}/>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>{t('profile.notifications')}</Text>
                                <Text style={styles.parametres}>{t('profile.alertsEnabled')}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="chevron-forward-sharp" size={scale(20)} color={"#ccc"}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(10),
    },
    title: {
        fontSize: moderateScale(30),
        fontWeight: "bold",
    },
    info: {
        backgroundColor: "#000000",
        height: verticalScale(250),
        marginTop: verticalScale(10),
        borderRadius: moderateScale(15),
        justifyContent: "center",
        alignItems: "center",
    },
    photoProfil: {
        backgroundColor: "#2A4793",
        width: scale(80),
        height: verticalScale(80),
        borderRadius: moderateScale(80),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: scale(1),
        borderColor: "#2A4793",
    },
    name: {
        fontSize: moderateScale(20),
        fontWeight: "bold",
        color: "white",
        paddingVertical: verticalScale(15)
    },
    phone: {
        color: "#ccc"
    },
    status: {
        flexDirection: "row",
        backgroundColor: "green",
        width: scale(130),
        padding: scale(10),
        justifyContent: "center",
        alignItems: "center",
        gap: scale(10),
        borderRadius: moderateScale(20),
        marginTop: verticalScale(10)
    },
    textStatus: {
        color: "white",
        fontWeight: "700",
    },
    sectionParams: {
        paddingVertical: verticalScale(10),
        backgroundColor: "#2A479399",
        borderRadius: moderateScale(12),
        marginTop: verticalScale(10)
    },
    card: {
        flexDirection: "row",
        paddingHorizontal: scale(10),
        justifyContent: "space-between",
    },
    subtitle: {
        fontSize: moderateScale(18),
        fontWeight: "bold",
        color: "white"
    },
    parametres: {
        color: "#ccc"
    },
    icon: {
        backgroundColor: "#2A4793",
        width: scale(40),
        height: verticalScale(40),
        borderRadius: moderateScale(10),
        justifyContent: "center",
        alignItems: "center",
    }
});