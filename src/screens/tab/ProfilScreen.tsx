import { useLanguage } from '@/src/context/LanguageContext';
import { Fontisto, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, Modal, Platform, ScrollView, Share, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS, ROUTES } from '../../constants';
import { RootStackParamList } from '../../navigation/types';


type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [languageModalVisible, setLanguageModalVisible] = useState(false);
    const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
    const { t } = useTranslation();

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
        setLanguageModalVisible(true);
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
                    <Text style={styles.textStatus}>{t('profile.verified')}</Text>
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
                                <Text style={styles.subtitle}>{t('profile.fees')}</Text>
                                <Text style={styles.parametres}>{t('profile.feesDesc')}</Text>
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
                                <Text style={styles.subtitle}>{t('profile.security')}</Text>
                                <Text style={styles.parametres}>{t('profile.securityDesc')}</Text>
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
                                <Text style={styles.subtitle}>{t('profile.servicePoints')}</Text>
                                <Text style={styles.parametres}>{t('profile.servicePointsDesc')}</Text>
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
                                <Text style={styles.subtitle}>{t('profile.limits')}</Text>
                                <Text style={styles.parametres}>{t('profile.limitsDesc')}</Text>
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
                                <Text style={styles.subtitle}>{t('profile.conditions')}</Text>
                                <Text style={styles.parametres}>{t('profile.conditionsDesc')}</Text>
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
                                <Text style={styles.subtitle}>{t('profile.recommend')}</Text>
                                <Text style={styles.parametres}>{t('profile.recommendDesc')}</Text>
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
                                <Text style={styles.subtitle}>{t('profile.language')}</Text>
                                <Text style={styles.parametres}>
                                    {availableLanguages.find(l => l.code === currentLanguage)?.name || 'Français'}
                                </Text>
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
                                <Text style={styles.subtitle}>{t('profile.notifications')}</Text>
                                <Text style={styles.parametres}>{t('profile.notificationsDesc')}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="chevron-forward-sharp" size={scale(20)} color={COLORS.textSecondary}/>
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>

        <Modal
            visible={languageModalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setLanguageModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{t('profile.selectLanguage')}</Text>
                    
                    {availableLanguages.map((lang) => (
                        <TouchableOpacity
                            key={lang.code}
                            style={[
                                styles.languageOption,
                                currentLanguage === lang.code && styles.selectedOption
                            ]}
                            onPress={async () => {
                                await changeLanguage(lang.code);
                                setLanguageModalVisible(false);
                            }}
                        >
                            <Text style={styles.flag}>{lang.flag}</Text>
                            <Text style={styles.languageName}>{lang.name}</Text>
                            {currentLanguage === lang.code && (
                                <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
                            )}
                        </TouchableOpacity>
                    ))}
                    
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => setLanguageModalVisible(false)}
                    >
                        <Text style={styles.cancelButtonText}>{t('common.cancel')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
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
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: moderateScale(20),
        borderTopRightRadius: moderateScale(20),
        padding: scale(20),
        paddingBottom: verticalScale(30),
    },
    modalTitle: {
        fontSize: moderateScale(20),
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: verticalScale(20),
        textAlign: 'center',
    },
    languageOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: scale(15),
        borderRadius: moderateScale(12),
        backgroundColor: COLORS.background,
        marginBottom: verticalScale(10),
        gap: scale(15),
    },
    selectedOption: {
        backgroundColor: COLORS.secondary,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    flag: {
        fontSize: moderateScale(32),
    },
    languageName: {
        flex: 1,
        fontSize: moderateScale(16),
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    cancelButton: {
        marginTop: verticalScale(10),
        padding: scale(15),
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: moderateScale(16),
        color: COLORS.textSecondary,
        fontWeight: '600',
    },
});