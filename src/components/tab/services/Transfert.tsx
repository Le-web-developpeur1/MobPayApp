import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type TransferType = "Envoi" | "EnvoiOM" | "ReceptionOM";

export default function Transfert() {

  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>      
        <View style={styles.row}>
            <TouchableOpacity 
                style={styles.card} 
                activeOpacity={0.7}
                onPress={() => {
                    navigation.navigate(ROUTES.TRANSFERT_NATIONAL)
                }}
            >
                <View style={styles.logoContainer}>
                    <Image 
                        source={require("@/assets/images/national/PNG.png")}
                        style={styles.logo}
                    />
                </View>
                <Text style={styles.cardTitle}>National</Text>
                <Text style={styles.cardDescription}>Instantané</Text>
            </TouchableOpacity>

        
            <TouchableOpacity 
                style={styles.internationalCard} 
                activeOpacity={0.7}
                onPress={() => navigation.navigate(ROUTES.INTERNATIONAL)}
            >
                <View style={[styles.logoContainer, { backgroundColor: COLORS.secondary }]}>
                    <Ionicons name="globe" size={moderateScale(32)} color={COLORS.primary}/>
                </View>
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>International</Text>
                    <Text style={styles.cardDescription}>Envoi vers l'étranger • 24-48h</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
    width: scale(40),
    height: scale(40),
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
    flexDirection: "column",
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
    marginLeft: scale(12),
  },
});
