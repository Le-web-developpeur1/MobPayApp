import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from 'expo-router';
import { RootStackParamList } from '@/src/navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
    const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView
        style={{ flex: 1 }}
        edges={['top']}
    >
        <View style={styles.container}>
            <Text style={styles.title}>Profil</Text>
            <View style={styles.info}>
                <View style={styles.photoProfil}>
                    <Text style={{ fontSize: moderateScale(25), color: "white"}}>BB</Text>
                </View>

                <Text style={styles.name}>Boubacar Bah</Text>
                <Text style={styles.phone}>+224 626 05 80 33</Text>
                <View style={styles.status}>
                    <Ionicons name='shield-checkmark-outline' size={scale(15)} color={"white"}/>
                    <Text style={styles.textStatus}>Compte vérifié</Text>
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
                                <Text style={styles.subtitle}>Frais</Text>
                                <Text style={styles.parametres}>Transferts, Paiement...</Text>
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
                                <Text style={styles.subtitle}>Sécurité</Text>
                                <Text style={styles.parametres}>PIN, biométrie</Text>
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
                                <Text style={styles.subtitle}>Point de service</Text>
                                <Text style={styles.parametres}>Agences</Text>
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
                                <Text style={styles.subtitle}>Limites de transfert</Text>
                                <Text style={styles.parametres}>100 000 000 GNF/mois</Text>
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
                                <Text style={styles.subtitle}>Conditions</Text>
                                <Text style={styles.parametres}>Conditions, Politique, A propos</Text>
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
                                <Text style={styles.subtitle}>Notifications</Text>
                                <Text style={styles.parametres}>Alertes activées</Text>
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