import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import { verticalScale, moderateScale, scale } from 'react-native-size-matters';
import { COLORS } from '@/src/constants';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type ButtonProps = {
    handleConfirm: () => void;
};

export default function Buttons({ handleConfirm }: ButtonProps) {
    const navigation = useNavigation()
  return (
    <View style={styles.buttonView}>
        <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
            <Feather name="chevron-left" size={scale(20)} color={COLORS.textSecondary} />
            <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Continuer</Text>
            <Feather name="arrow-right" size={scale(20)} color={COLORS.primary} />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    buttonView: {
        flexDirection: 'row',
        gap: scale(12),
      },
      backButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: scale(8),
        borderRadius: moderateScale(12),
        borderColor: COLORS.border,
        borderWidth: 2,
        paddingVertical: verticalScale(14),
        backgroundColor: COLORS.white,
        flex: 1,
      },
      backText: {
        color: COLORS.textSecondary,
        fontSize: moderateScale(15),
        fontWeight: '600',
      },
      confirmButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: scale(8),
        borderRadius: moderateScale(12),
        paddingVertical: verticalScale(14),
        backgroundColor: COLORS.secondary,
        flex: 2,
      },
      confirmText: {
        color: COLORS.primary,
        fontSize: moderateScale(15),
        fontWeight: '700',
      },
})