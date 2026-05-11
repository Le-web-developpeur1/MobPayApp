import { COLORS } from '@/src/constants';
import { FontAwesome6 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export default function Notification() {
    const { t } = useTranslation();
    const [pushToggle, setPushToggle] = useState(false);
    const [smsToggle, setSmsToggle] = useState(false);
    const [offreToggle, setOffreToggle] = useState(false);

  return (
    <View style={styles.container}>
        <View style={{ borderColor: "#ccc", borderWidth: scale(0.5), backgroundColor: "white", borderRadius: moderateScale(10)}}>
            <View style={styles.card}>
                <View style={{ gap: scale(5)}}>
                    <Text style={styles.tilte}>{t('profile.pushNotifications')}</Text>
                    <Text style={{ color: "#00000095"}}>{t('profile.realTimeAlerts')}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => setPushToggle(!pushToggle)}
                >
                        {pushToggle ? (
                            <FontAwesome6 name='toggle-on' color={"#2A4793"} size={scale(25)} />
                        ) : (
                            <FontAwesome6 name='toggle-off' color={"#2A4793"} size={scale(25)} />
                        )}
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                <View style={{ gap: scale(5)}}>
                    <Text style={styles.tilte}>{t('profile.sms')}</Text>
                    <Text style={{ color: "#00000095"}}>{t('profile.textMessage')}</Text>
                </View>
                <TouchableOpacity
                        onPress={() => setSmsToggle(!smsToggle)}
                >
                        {smsToggle ? (
                            <FontAwesome6 name='toggle-on' color={"#2A4793"} size={scale(25)} />
                        ) : (
                            <FontAwesome6 name='toggle-off' color={"#2A4793"} size={scale(25)} />
                        )}
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                <View style={{ gap: scale(5)}}>
                    <Text style={styles.tilte}>{t('profile.offersPromotions')}</Text>
                    <Text style={{ color: "#00000095"}}>{t('profile.exclusiveDeals')}</Text>
                </View>
                <TouchableOpacity
                        onPress={() => setOffreToggle(!offreToggle)}
                >
                        {offreToggle ? (
                            <FontAwesome6 name='toggle-on' color={"#2A4793"} size={scale(25)} />
                        ) : (
                            <FontAwesome6 name='toggle-off' color={"#2A4793"} size={scale(25)} />
                        )}
                </TouchableOpacity>
            </View>

        </View>  
        <View 
            style={[{ 
                height: verticalScale(55), 
                paddingHorizontal: scale(15), 
                borderColor: "#ccc", 
                borderWidth: scale(0.5), 
                backgroundColor: "white", 
                borderRadius: moderateScale(10),
                marginTop: verticalScale(12),
                alignItems: "center",
                justifyContent: "center",
            }]}
        >
            <Text style={{ color: "#00000095"}}>{t('profile.securityAlertsAlways')} <Text style={{ color: "#2A4793", fontWeight: "bold", fontSize: moderateScale(15)}}>{t('profile.alwaysEnabled')}</Text> {t('profile.forYourProtection')}</Text>
        </View>  
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: scale(15),
        paddingVertical: verticalScale(10)
    },
    card: {
        paddingHorizontal: scale(15),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: verticalScale(80),
        borderBottomWidth: scale(1),
        borderColor: "#ccc",
        borderBottomRightRadius: moderateScale(8),
        borderBottomLeftRadius: moderateScale(8),
    },
    tilte: {
        fontSize: moderateScale(20),
        fontWeight: "bold",
    },
});