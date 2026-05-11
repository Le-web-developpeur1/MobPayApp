import { COLORS } from '@/src/constants';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import HeaderScreen from '../../components/ui/HeaderScreen';

export default function National() {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <HeaderScreen title={t('transfer.nationalTransfer')}/>
        <View style={styles.container}>
            <Text style={styles.subtitle}>{t('transfer.chooseOperator')}</Text>
            
            <View style={styles.grid}>
                <TouchableOpacity style={styles.card} activeOpacity={0.7}>
                    <View style={styles.logoContainer}>
                        <Image 
                            source={require("@/assets/images/national/PNG.png")}
                            style={styles.logo}
                        />
                    </View>
                    <Text style={styles.cardTitle}>Cash Moov</Text>
                    <Text style={styles.cardDescription}>{t('transfer.instant')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} activeOpacity={0.7}>
                    <View style={styles.logoContainer}>
                        <Image 
                            source={require("@/assets/images/national/logo-orange.png")}
                            style={styles.logo}
                        />
                    </View>
                    <Text style={styles.cardTitle}>Orange Money</Text>
                    <Text style={styles.cardDescription}>{t('transfer.send')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} activeOpacity={0.7}>
                    <View style={styles.logoContainer}>
                        <Image 
                            source={require("@/assets/images/national/logo-orange.png")}
                            style={styles.logo}
                        />
                    </View>
                    <Text style={styles.cardTitle}>Orange Money</Text>
                    <Text style={styles.cardDescription}>{t('transfer.receive')}</Text>
                </TouchableOpacity>
            </View>
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
        paddingTop: verticalScale(20),
    },
    subtitle: {
        fontSize: moderateScale(16),
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginBottom: verticalScale(20),
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: scale(15),
    },
    card: {
        width: '48%',
        backgroundColor: COLORS.white,
        borderRadius: moderateScale(16),
        padding: scale(20),
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: verticalScale(2) },
        shadowOpacity: 0.06,
        shadowRadius: moderateScale(8),
        elevation: 3,
    },
    logoContainer: {
        width: scale(70),
        height: scale(70),
        borderRadius: moderateScale(16),
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(12),
    },
    logo: {
        width: scale(55),
        height: scale(55),
        borderRadius: moderateScale(12),
    },
    cardTitle: {
        fontSize: moderateScale(15),
        fontWeight: '700',
        color: COLORS.textPrimary,
        marginBottom: verticalScale(4),
        textAlign: 'center',
    },
    cardDescription: {
        fontSize: moderateScale(12),
        color: COLORS.textSecondary,
        textAlign: 'center',
    },
});