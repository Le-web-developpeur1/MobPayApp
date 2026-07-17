import { PrimaryStatusBar } from '@/src/components/ui';
import { useLanguage } from '@/src/context/LanguageContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from 'expo-router';
import { AlertCircle, Bell, Camera, CheckCircle2, ChevronRight, CreditCard, FileText, Languages, MapPin, Share2, ShieldCheck, UserPlus, Wallet } from 'lucide-react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, Modal, Platform, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS, ROUTES } from '../../constants';
import { RootStackParamList } from '../../navigation/types';
import HeaderScreen from '@/src/components/ui/HeaderScreen';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
    const navigation = useNavigation<NavigationProp>();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [languageModalVisible, setLanguageModalVisible] = useState(false);
    const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
    const { t } = useTranslation();

    const handleShareApp = async () => {
        try {
            const androidLink = "https://play.google.com/store/apps/details?id=com.estel.cashmoovsubscriberapp";
            const iosLink     = "https://apps.apple.com/us/app/cashmoov-client/id6642668233?l=fr-FR";
            await Share.share({
                message: `${t('profile.shareMessage')}\n\nAndroid: ${androidLink}\n\nIOS: ${iosLink}`,
                title: t('profile.shareTitle'),
            });
        } catch (error) {
            console.log('Erreur lors du partage:', error);
        }
    };

    const handleChangePhoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert(t('profile.permissionDenied'), t('profile.permissionMessage'));
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
      <PrimaryStatusBar />
      <SafeAreaView
          style={{ flex: 1, backgroundColor: COLORS.primary }}
          edges={['top', 'bottom']}
      >
        <HeaderScreen title='Profil' />
        <View style={styles.container}>
            <View style={styles.info}>
                <TouchableOpacity onPress={handleChangePhoto} style={styles.photoContainer}>
                    <View style={styles.photoProfil}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={styles.profileImage} />
                        ) : (
                            <Text style={{ fontSize: moderateScale(20), color: COLORS.white}}>BB</Text>
                        )}
                    </View>
                    <View style={styles.cameraIcon}>
                        <Camera size={scale(16)} color={COLORS.white} strokeWidth={2} />
                    </View>
                </TouchableOpacity>

                <Text style={styles.name}>Boubacar Bah</Text>
                <Text style={styles.phone}>+224 626 05 80 33</Text>
                <View style={styles.status}>
                    <ShieldCheck size={ Platform.OS === 'android' ? scale(15) : scale(20)} color={COLORS.success} strokeWidth={2} />
                    <Text style={styles.textStatus}>{t('profile.verified')}</Text>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: verticalScale(40)}}
            >
                <TouchableOpacity 
                    style={[styles.sectionParams, { backgroundColor: '#FFF8E7', borderWidth: scale(1), borderColor: '#FFE082' }]}
                    onPress={() => navigation.navigate(ROUTES.COMPLETE_PROFILE)}
                    activeOpacity={0.7}
                >
                    <View style={styles.card}>
                        <View style={{ flexDirection : "row", gap: scale(20), justifyContent: "center", alignItems: "center"}}>
                            <View style={[styles.icon, { backgroundColor: COLORS.primary }]}>
                                <UserPlus size={scale(23)} color={COLORS.white} strokeWidth={2} />
                            </View>
                            <View>
                                <Text style={styles.subtitle}>{t('profile.completeProfile')}</Text>
                                <Text style={styles.parametres}>{t('profile.completeProfileDesc')}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <ChevronRight size={scale(20)} color={COLORS.primary} strokeWidth={2} />
                        </View>
                    </View>
                </TouchableOpacity>
                    {/**Frais */}
                <TouchableOpacity 
                    style={styles.sectionParams}
                    onPress={() => navigation.navigate(ROUTES.FRAIS)}
                >
                    <View style={styles.card}>
                        <View style={{ flexDirection : "row", gap: scale(20), justifyContent: "center", alignItems: "center"}}>
                            <View style={styles.icon}>
                                <CreditCard size={scale(23)} color={COLORS.primary} strokeWidth={2} />
                            </View>
                            <View>
                                <Text style={styles.subtitle}>{t('profile.fees')}</Text>
                                <Text style={styles.parametres}>{t('profile.feesDesc')}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <ChevronRight size={scale(20)} color={COLORS.textSecondary} strokeWidth={2} />
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
                                <ShieldCheck size={scale(23)} color={COLORS.primary} strokeWidth={2} />
                            </View>
                            <View>
                                <Text style={styles.subtitle}>{t('profile.security')}</Text>
                                <Text style={styles.parametres}>{t('profile.securityDesc')}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <ChevronRight size={scale(20)} color={COLORS.textSecondary} strokeWidth={2} />
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
                                <MapPin size={scale(23)} color={COLORS.primary} strokeWidth={2} />
                            </View>
                            <View>
                                <Text style={styles.subtitle}>{t('profile.servicePoints')}</Text>
                                <Text style={styles.parametres}>{t('profile.servicePointsDesc')}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <ChevronRight size={scale(20)} color={COLORS.textSecondary} strokeWidth={2} />
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
                                <Wallet size={scale(23)} color={COLORS.primary} strokeWidth={2} />
                            </View>
                            <View>
                                <Text style={styles.subtitle}>{t('profile.limits')}</Text>
                                <Text style={styles.parametres}>{t('profile.limitsDesc')}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <ChevronRight size={scale(20)} color={COLORS.textSecondary} strokeWidth={2} />
                        </View>
                    </View>
                </TouchableOpacity>
                     {/**Relevé de compte */}
                <TouchableOpacity 
                    style={styles.sectionParams}
                    onPress={() => navigation.navigate("Releve")}
                >
                    <View style={styles.card}>
                        <View style={{ flexDirection : "row", gap: scale(20), justifyContent: "center", alignItems: "center"}}>
                            <View style={styles.icon}>
                                <FileText size={scale(23)} color={COLORS.primary} strokeWidth={2} />
                            </View>
                            <View>
                                <Text style={styles.subtitle}>{t('profile.statement') || 'Relevé de compte'}</Text>
                                <Text style={styles.parametres}>{t('profile.statementDesc') || 'Téléchargez vos relevés'}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <ChevronRight size={scale(20)} color={COLORS.textSecondary} strokeWidth={2} />
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
                                <AlertCircle size={scale(23)} color={COLORS.primary} strokeWidth={2} />
                            </View>
                            <View>
                                <Text style={styles.subtitle}>{t('profile.conditions')}</Text>
                                <Text style={styles.parametres}>{t('profile.conditionsDesc')}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <ChevronRight size={scale(20)} color={COLORS.textSecondary} strokeWidth={2} />
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
                                <Share2 size={scale(23)} color={COLORS.primary} strokeWidth={2} />
                            </View>
                            <View>
                                <Text style={styles.subtitle}>{t('profile.recommend')}</Text>
                                <Text style={styles.parametres}>{t('profile.recommendDesc')}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <ChevronRight size={scale(20)} color={COLORS.textSecondary} strokeWidth={2} />
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
                                <Languages size={scale(23)} color={COLORS.primary} strokeWidth={2} />
                            </View>
                            <View>
                                <Text style={styles.subtitle}>{t('profile.language')}</Text>
                                <Text style={styles.parametres}>
                                    {availableLanguages.find(l => l.code === currentLanguage)?.name || 'Français'}
                                </Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <ChevronRight size={scale(20)} color={COLORS.textSecondary} strokeWidth={2} />
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
                                <Bell size={scale(23)} color={COLORS.primary} strokeWidth={2} />
                            </View>
                            <View>
                                <Text style={styles.subtitle}>{t('profile.notifications')}</Text>
                                <Text style={styles.parametres}>{t('profile.notificationsDesc')}</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <ChevronRight size={scale(20)} color={COLORS.textSecondary} strokeWidth={2} />
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
                                <CheckCircle2 size={24} color={COLORS.primary} strokeWidth={2} />
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
        paddingVertical: verticalScale(5),
        backgroundColor: COLORS.background,
    },
    title: {
        fontSize: moderateScale(30),
        fontWeight: "bold",
    },
    info: {
        backgroundColor: COLORS.white,
        height:  Platform.OS === 'android' ? verticalScale(200) : verticalScale(180),
        borderRadius: moderateScale(15),
        justifyContent: "center",
        alignItems: "center",
        marginBottom: verticalScale(5)
    },
    photoProfil: {
        backgroundColor: COLORS.primaryMedium,
        width: Platform.OS === 'android' ? scale(80) : scale(70),
        height:  Platform.OS === 'android' ? verticalScale(80) : scale(70),
        borderRadius:  Platform.OS === 'android' ? moderateScale(80) : scale(70),
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
        paddingVertical: verticalScale(10)
    },
    phone: {
        color: COLORS.textSecondary
    },
    status: {
        flexDirection: "row",
        backgroundColor: COLORS.successLight,
        width: Platform.OS === 'android' ? scale(130) : scale(150),
        padding: scale(10),
        justifyContent: "center",
        alignItems: "center",
        gap: scale(8),
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