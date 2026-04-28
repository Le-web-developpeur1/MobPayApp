import Securite from '@/src/components/profil/Securite';
import HeaderScreen from '@/src/components/ui/HeaderScreen';
import { COLORS } from '@/src/constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';

export default function SecuriteScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
        <HeaderScreen title='Sécurité'/>
        <View style={styles.container}>
            <Securite/>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: COLORS.background,
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(10),
    }
});