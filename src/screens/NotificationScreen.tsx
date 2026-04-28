import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import HeaderScreen from '../components/ui/HeaderScreen';
import { COLORS } from '../constants';

const notification = [
    {title: "Argent reçu", detail: "Ibrahima Bah vous a envoyé 1 000 000 GNF.", date: "il y a 2min", status: "recu"},
    {title: "Argent reçu", detail: "Tidiane Bah vous a envoyé 850 000 GNF.", date: "il y a 15min", status: "recu"},
    {title: "Offre Spéciale 🎁", detail: "Transferts gratuits tout les week-ends ! Profitez-en maintenant.", date: "il y a 3h", status: "offre"},
    {title: "Envoi Confirmé", detail: "Votre envoi de 10 000 000 GNF à Papa est réussi.", date: "il y a 10h", status: "envoie"},
    {title: "Argent reçu", detail: "Ibrahima Bah vous a envoyé 1 000 000 GNF", date: "il y a 10h", status: "recu"},
    {title: "Connexion détectée", detail: "Nouvelle connexion depuis Paris, France. Ce n'est pas vous ?", date: "il y a 12h", status: "warning"},
    {title: "Résumé mensuel", detail: "Vous avez économisé 755 000 GNF en frais ce mois-ci.", date: "il y a 22h", status: "resume"},
    {title: "Argent reçu", detail: "Ibrahima Bah vous a envoyé 1 000 000 GNF", date: "Hier", status: "envoie"},
    {title: "Argent reçu", detail: "Ibrahima Bah vous a envoyé 1 000 000 GNF", date: "Hier", status: "envoie"},
];

const getIconConfig = (status: string) => {
    switch(status) {
        case "recu":
            return {
                icon: "arrow-down-left",
                bgColor: COLORS.successLight,
                borderColor: COLORS.success,
                iconColor: COLORS.success,
            };
        case "envoie":
            return {
                icon: "arrow-up-right",
                bgColor: COLORS.errorLight,
                borderColor: COLORS.error,
                iconColor: COLORS.error,
            };
        case "offre":
            return {
                icon: "gift",
                bgColor: COLORS.primaryLight,
                borderColor: COLORS.primary,
                iconColor: COLORS.primary,
            };
        case "warning":
            return {
                icon: "alert-circle",
                bgColor: "#F7CE4720",
                borderColor: COLORS.secondary,
                iconColor: COLORS.secondary,
            };
        case "resume":
            return {
                icon: "trending-up",
                bgColor: COLORS.successLight,
                borderColor: COLORS.success,
                iconColor: COLORS.success,
            };
        default:
            return {
                icon: "bell",
                bgColor: COLORS.primaryLight,
                borderColor: COLORS.primary,
                iconColor: COLORS.primary,
            };
    }
};

export default function NotificationScreen() {
  return (
   <SafeAreaView style={styles.safeArea}>
        <HeaderScreen title='Notifications'/>
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {notification.map((notif, index) => {
                    const iconConfig = getIconConfig(notif.status);
                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.notificationCard}
                            activeOpacity={0.7}
                        >
                            <View 
                                style={[
                                    styles.iconContainer,
                                    {
                                        backgroundColor: iconConfig.bgColor,
                                        borderColor: iconConfig.borderColor,
                                    }
                                ]}
                            >
                                <Feather 
                                    name={iconConfig.icon as any}
                                    size={scale(20)}
                                    color={iconConfig.iconColor}
                                />
                            </View>
                            
                            <View style={styles.notificationContent}>
                                <Text style={styles.notificationTitle} numberOfLines={1}>
                                    {notif.title}
                                </Text>
                                <Text style={styles.notificationDetail} numberOfLines={2}>
                                    {notif.detail}
                                </Text>
                                <Text style={styles.notificationDate}>
                                    {notif.date}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(10),
    },
    scrollContent: {
        paddingBottom: verticalScale(20),
    },
    notificationCard: {
        flexDirection: 'row',
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
    iconContainer: {
        width: scale(45),
        height: scale(45),
        borderRadius: moderateScale(10),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        marginRight: scale(12),
        flexShrink: 0,
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        fontWeight: '700',
        fontSize: moderateScale(16),
        color: COLORS.textPrimary,
        marginBottom: verticalScale(4),
    },
    notificationDetail: {
        fontSize: moderateScale(14),
        color: COLORS.textSecondary,
        marginBottom: verticalScale(6),
        lineHeight: moderateScale(20),
    },
    notificationDate: {
        fontSize: moderateScale(12),
        color: COLORS.textSecondary,
    },
});
