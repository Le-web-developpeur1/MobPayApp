import { Fontisto, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Share, StatusBar, StyleSheet, Text, TouchableOpacity, View, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS, ROUTES } from '../../constants';
import { RootStackParamList } from '../../navigation/types';
import * as ImagePicker from "expo-image-picker";
import { Image } from 'react-native';
import { useLanguage } from '@/src/context/LanguageContext';


type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState('Français');
    const { currentLanguage, changeLanguage } = useLanguage();

    const handleShareApp = async () => {
        try {
            if (Platform.OS === "android") {
                await Share.share({
                message: 'Télécharge CashMoov, la meilleure application de transfert d\'argent et de paiement mobile en Guinée ! https://play.google.com/store/apps/details?id=com.estel.cashmoovsubscriberapp',
                title: 'Recommander CashMoov',
            });
            } else {
                await Share.share({
                message: 'Télécharge CashMoov, la meilleure application de transfert d\'argent et de paiement mobile en Guinée ! https://apps.apple.com/us/app/cashmoov-client/id6642668233?l=fr-FR',
                title: 'Recommander CashMoov',
            });
            }
        } catch (error) {
            console.log('Erreur lors du partage:', error);
        }
    };

    const handleChangePhoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Permission refusée', 'Nous avons besoin de votre permission pour accéder à vos photos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleChangeLanguage = () => {
    Alert.alert(
        'Changer la langue',
        'Sélectionnez votre langue',
        [
            {
                text: 'Français 🇫🇷',
                onPress: async () => {
                    await changeLanguage('fr');
                    setSelectedLanguage('Français');
                },
            },
            {
                text: 'English 🇬🇧',
                onPress: async () => {
                    await changeLanguage('en');
                    setSelectedLanguage('English');
                },
            },
            {
                text: 'Annuler',
                style: 'cancel',
            },
        ]
    );
};

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <SafeAreaView
          style={{ flex: 1, backgroundColor: COLORS.primary }}
          edges={['top']}
      >
        <View style={styles.container}>
            <View style={styles.info}>
                <TouchableOpacity onPress={handleChangePhoto} style={styles.photoContainer}>
                    <View style={styles.photoProfil}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        ) : (
                            <Text style={{ fontSize: moderateScale(25), color: COLORS.white}}>BB</Text>
                        )}
                    </View>
                    <View style={styles.cameraIcon}>
                        <Ionicons name="camera" size={scale(16)} color={COLORS.white} />
                    </View>
                </TouchableOpacity>

                <Text style={styles.name}>Boubacar Bah</Text>
                <Text style={styles.phone}>+224 626 05 80 33</Text>
                <View style={styles.status}>
                    <Ionicons name='shield-checkmark-outline' size={scale(15)} color={COLORS.success}/>
                    <Text style={styles.textStatus}>Compte vérifié</Text>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: verticalScale(20)}}
            >
                    {/**Frais */}
                <TouchableOpacity 
                    style={styles.sectionParams}
                    onPress={() => navigation.navigate(ROUTES.FRAIS)}
                >
                    <View style={styles.card}>
                        <View style={{ flexDirection : "row", gap: scale(20), justifyContent: "center", alignItems: "center"}}>
                            <View style={styles.icon}>
                                <SimpleLineIcons name='credit-card' size={scale(23)} color={COLORS.primary}/>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>Frais</Text>
                                <Text style={styles.parametres}>Transferts, Paiement...</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="chevron-forward-sharp" size={scale(20)} color={COLORS.textSecondary}/>
                        </View>
                    </View>
                </TouchableOpacity>
                     {/**Sécurité */}
                <TouchableOpacity 
                    style={styles.sectionParams}
                    onPress={() => navigation.navigate(ROUTES.SECURITE_SCREEN)}
                >
                    <View style={styles.card}>
                        <View style={{ flexDirection : "row", gap: scale(20), justifyContent: "center", alignItems: "center"}}>
                            <View style={styles.icon}>
                                <Ionicons name='shield-checkmark-outline' size={scale(23)} color={COLORS.primary}/>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>Sécurité</Text>
                                <Text style={styles.parametres}>PIN, biométrie</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="chevron-forward-sharp" size={scale(20)} color={COLORS.textSecondary}/>
                        </View>
                    </View>
                </TouchableOpacity>
                    {/**Point de service */}
                <TouchableOpacity 
                    style={styles.sectionParams}
                    onPress={() => navigation.navigate(ROUTES.POINTS_SERVICE)}
                >
                    <View style={styles.card}>
                        <View style={{ flexDirection : "row", gap: scale(20), justifyContent: "center", alignItems: "center"}}>
                            <View style={styles.icon}>
                                <Ionicons name='location-outline' size={scale(23)} color={COLORS.primary}/>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>Point de service</Text>
                                <Text style={styles.parametres}>Agences</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="chevron-forward-sharp" size={scale(20)} color={COLORS.textSecondary}/>
                        </View>
                    </View>
                </TouchableOpacity>
                     {/**Limites */}
                <TouchableOpacity 
                    style={styles.sectionParams}
                    onPress={() => navigation.navigate(ROUTES.LIMITE)}
                >
                    <View style={styles.card}>
                        <View style={{ flexDirection : "row", gap: scale(20), justifyContent: "center", alignItems: "center"}}>
                            <View style={styles.icon}>
                                <Fontisto name='wallet' size={scale(23)} color={COLORS.primary}/>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>Limites de transfert</Text>
                                <Text style={styles.parametres}>100 000 000 GNF/mois</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="chevron-forward-sharp" size={scale(20)} color={COLORS.textSecondary}/>
                        </View>
                    </View>
                </TouchableOpacity>
                     {/**Conditions */}
                <TouchableOpacity 
                    style={styles.sectionParams}
                    onPress={() => navigation.navigate(ROUTES.CONDITIONS)}
                >
                    <View style={styles.card}>
                        <View style={{ flexDirection : "row", gap: scale(20), justifyContent: "center", alignItems: "center"}}>
                            <View style={styles.icon}>
                                <Ionicons name='alert-circle-outline' size={scale(23)} color={COLORS.primary}/>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>Conditions</Text>
                                <Text style={styles.parametres}>Conditions, Politique, A propos</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="chevron-forward-sharp" size={scale(20)} color={COLORS.textSecondary}/>
                        </View>
                    </View>
                </TouchableOpacity>
                    {/**Recommander l'application */}
                <TouchableOpacity 
                    style={styles.sectionParams}
                    onPress={handleShareApp}
                >
                    <View style={styles.card}>
                        <View style={{ flexDirection : "row", gap: scale(20), justifyContent: "center", alignItems: "center"}}>
                            <View style={styles.icon}>
                                <Ionicons name='share-social-outline' size={scale(23)} color={COLORS.primary}/>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>Recommander l'application</Text>
                                <Text style={styles.parametres}>Partager avec vos proches</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="chevron-forward-sharp" size={scale(20)} color={COLORS.textSecondary}/>
                        </View>
                    </View>
                </TouchableOpacity>
                    {/**Langue */}
                <TouchableOpacity 
                    style={styles.sectionParams}
                    onPress={handleChangeLanguage}
                >
                    <View style={styles.card}>
                        <View style={{ flexDirection : "row", gap: scale(20), justifyContent: "center", alignItems: "center"}}>
                            <View style={styles.icon}>
                                <Ionicons name='language-outline' size={scale(23)} color={COLORS.primary}/>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>Langue</Text>
                                <Text style={styles.parametres}>{selectedLanguage}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="chevron-forward-sharp" size={scale(20)} color={COLORS.textSecondary}/>
                        </View>
                    </View>
                </TouchableOpacity>
                    {/**Notifications */}
                <TouchableOpacity 
                    style={styles.sectionParams}
                    onPress={() => navigation.navigate(ROUTES.PREFERENCE_NOTIF)}
                >
                    <View style={styles.card}>
                        <View style={{ flexDirection : "row", gap: scale(20), justifyContent: "center", alignItems: "center"}}>
                            <View style={styles.icon}>
                                <Ionicons name='notifications-outline' size={scale(23)} color={COLORS.primary}/>
                            </View>
                            <View>
                                <Text style={styles.subtitle}>Notifications</Text>
                                <Text style={styles.parametres}>Alertes activées</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="chevron-forward-sharp" size={scale(20)} color={COLORS.textSecondary}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(10),
        backgroundColor: COLORS.background,
    },
    title: {
        fontSize: moderateScale(30),
        fontWeight: "bold",
    },
    info: {
        backgroundColor: COLORS.white,
        height: verticalScale(220),
        marginTop: verticalScale(5),
        borderRadius: moderateScale(15),
        justifyContent: "center",
        alignItems: "center",
        marginBottom: verticalScale(5)
    },
    photoProfil: {
        backgroundColor: COLORS.primaryMedium,
        width: scale(80),
        height: verticalScale(80),
        borderRadius: moderateScale(80),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: scale(1),
        borderColor: COLORS.primary,
        overflow: 'hidden',
    },
    photoContainer: {
        position: 'relative',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: -5,
        backgroundColor: COLORS.primary,
        width: scale(24),
        height: scale(24),
        borderRadius: moderateScale(12),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: scale(2),
        borderColor: COLORS.white,
    },
    name: {
        fontSize: moderateScale(20),
        fontWeight: "bold",
        paddingVertical: verticalScale(15)
    },
    phone: {
        color: COLORS.textSecondary
    },
    status: {
        flexDirection: "row",
        backgroundColor: COLORS.successLight,
        width: scale(130),
        padding: scale(10),
        justifyContent: "center",
        alignItems: "center",
        gap: scale(10),
        borderRadius: moderateScale(20),
        marginTop: verticalScale(10),
        borderColor: COLORS.success,
        borderWidth: scale(1)
    },
    textStatus: {
        color: COLORS.success,
        fontWeight: "700",
    },
    sectionParams: {
        paddingVertical: verticalScale(10),
        backgroundColor: COLORS.white,
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
        color: COLORS.primary
    },
    parametres: {
        color: COLORS.textSecondary
    },
    icon: {
        backgroundColor: COLORS.secondary,
        width: scale(40),
        height: verticalScale(40),
        borderRadius: moderateScale(10),
        justifyContent: "center",
        alignItems: "center",
    }
});