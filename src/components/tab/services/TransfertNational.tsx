import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import HeaderScreen from '../../ui/HeaderScreen';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type TransferType = "Envoi" | "EnvoiOM" | "ReceptionOM";

export default function TransfertNational() {

  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.safe}>
        <HeaderScreen title='Transfert National'/>
        <View style={styles.container}>      
        <View style={styles.row}>
            <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.7}
            onPress={() => {
                navigation.navigate(ROUTES.CONTACT, { type: "Envoi" as TransferType })
            }}
            >
            <View style={styles.logoContainer}>
                <Image 
                source={require("@/assets/images/national/PNG.png")}
                style={styles.logo}
                />
            </View>
            <Text style={styles.cardTitle}>Cash Moov</Text>
            <Text style={styles.cardDescription}>Instantané</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.7}
            onPress={() => {
                navigation.navigate(ROUTES.CONTACT, { type: "EnvoiOM" as TransferType })
            }}
            >
            <View style={styles.logoContainer}>
                <Image 
                source={require("@/assets/images/national/logo-orange.png")}
                style={styles.logo}
                />
            </View>
            <Text style={styles.cardTitle}>Envoyez vers</Text>
            <Text style={styles.cardDescription}>Orange Money</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.7}
            onPress={() => {
                navigation.navigate(ROUTES.CONTACT, { type: "ReceptionOM" as TransferType })
            }}
            >
            <View style={styles.logoContainer}>
                <Image 
                source={require("@/assets/images/national/logo-orange.png")}
                style={styles.logo}
                />
            </View>
            <Text style={styles.cardTitle}>Récevez depuis</Text>
            <Text style={styles.cardDescription}>Orange Money</Text>
            </TouchableOpacity>
        </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: verticalScale(20),
    paddingHorizontal: scale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(15),
    marginTop: verticalScale(10),
  },
  row: {
    flexDirection: 'row',
    gap: scale(10),
    marginBottom: verticalScale(10),
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(16),
    padding: scale(12),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(6),
    elevation: 3,
  },
  logoContainer: {
    width: scale(60),
    height: scale(60),
    borderRadius: moderateScale(14),
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(10),
  },
  logo: {
    width: scale(48),
    height: scale(48),
    borderRadius: moderateScale(10),
  },
  cardTitle: {
    fontSize: moderateScale(13),
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
  internationalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(16),
    padding: scale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(6),
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    marginLeft: scale(12),
  },
});
