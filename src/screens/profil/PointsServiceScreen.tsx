import HeaderScreen from '@/src/components/ui/HeaderScreen';
import { COLORS } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

interface PointService {
  name: string;
  address: string;
  commune: string;
  phone: string;
  hours: string;
}

const pointsService: PointService[] = [
  {
    name: 'Agence Kaloum',
    address: 'Avenue de la République',
    commune: 'Kaloum',
    phone: '+224 622 00 00 00',
    hours: 'Lun-Sam: 8h-18h',
  },
  {
    name: 'Agence Matam',
    address: 'Carrefour Matam Centre',
    commune: 'Matam',
    phone: '+224 622 00 00 01',
    hours: 'Lun-Sam: 8h-18h',
  },
  {
    name: 'Agence Ratoma',
    address: 'Marché Madina',
    commune: 'Ratoma',
    phone: '+224 622 00 00 02',
    hours: 'Lun-Sam: 8h-18h',
  },
  {
    name: 'Agence Dixinn',
    address: 'Centre commercial Hamdallaye',
    commune: 'Dixinn',
    phone: '+224 622 00 00 03',
    hours: 'Lun-Sam: 8h-18h',
  },
];

export default function PointsServiceScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <HeaderScreen title="Points de service" />
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Trouvez l'agence la plus proche de vous
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: verticalScale(20) }}
        >
          {pointsService.map((point, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.iconContainer}>
                <Ionicons name="location" size={scale(24)} color={COLORS.primary} />
              </View>
              
              <View style={styles.cardContent}>
                <Text style={styles.name}>{point.name}</Text>
                <Text style={styles.commune}>{point.commune}</Text>
                <Text style={styles.address}>{point.address}</Text>
                
                <View style={styles.infoRow}>
                  <Ionicons name="call-outline" size={scale(14)} color={COLORS.textSecondary} />
                  <Text style={styles.infoText}>{point.phone}</Text>
                </View>
                
                <View style={styles.infoRow}>
                  <Ionicons name="time-outline" size={scale(14)} color={COLORS.textSecondary} />
                  <Text style={styles.infoText}>{point.hours}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.directionButton}>
                <Ionicons name="navigate-outline" size={scale(20)} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(15),
  },
  subtitle: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    marginBottom: verticalScale(15),
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(12),
    padding: scale(15),
    marginBottom: verticalScale(12),
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: scale(50),
    height: scale(50),
    borderRadius: moderateScale(25),
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(2),
  },
  commune: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: verticalScale(4),
  },
  address: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    marginBottom: verticalScale(8),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(4),
  },
  infoText: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
    marginLeft: scale(6),
  },
  directionButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
