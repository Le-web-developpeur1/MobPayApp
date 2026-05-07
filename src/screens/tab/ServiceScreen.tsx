import React from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants';
import HeaderScreen from '@/src/components/ui/HeaderScreen';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Transfert from '@/src/components/tab/services/Transfert';
import Paiement from '@/src/components/tab/services/Paiement';

export default function ServiceScreen() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <HeaderScreen title='Services' />
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{ paddingBottom: verticalScale(20)}}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Transfert d'argent</Text>
            <View style={styles.service}>
              <Transfert/>
            </View>
            
            <Text style={styles.title}>Paiement</Text>
            <View style={styles.service}>
              <Paiement />
            </View>

            <Text style={styles.title}>Marchand</Text>
            <View style={styles.service}>

            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: scale(20),
    backgroundColor: COLORS.background,
    paddingTop: verticalScale(10),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    marginBottom: verticalScale(5),
  },
  service: {
    borderColor: "#2A4793",
    borderWidth: scale(1),
    height: Platform.OS === "android" ? verticalScale(150) : verticalScale(125),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(15),
  },
});