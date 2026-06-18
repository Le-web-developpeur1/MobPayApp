import { COLORS, ROUTES } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CompleteProfileBanner() {
  const navigation = useNavigation<NavigationProp>();
  const [isVisible, setIsVisible] = useState(true);

  // TODO: Vérifier si le profil est complet via un contexte ou un state global
  const isProfileComplete = false; // À remplacer par une vraie vérification

  if (!isVisible || isProfileComplete) {
    return null;
  }

  const handleComplete = () => {
    navigation.navigate(ROUTES.COMPLETE_PROFILE);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="person-circle-outline" size={scale(40)} color={COLORS.primary} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Complétez votre profil</Text>
        <Text style={styles.description}>
          Ajoutez vos informations pour accéder à toutes les fonctionnalités et sécuriser vos transactions.
        </Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.buttonSecondary} 
            onPress={handleDismiss}
          >
            <Text style={styles.buttonSecondaryText}>Plus tard</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.buttonPrimary} 
            onPress={handleComplete}
          >
            <Text style={styles.buttonPrimaryText}>Compléter</Text>
            <Ionicons name="arrow-forward" size={scale(16)} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.closeButton} onPress={handleDismiss}>
        <Ionicons name="close" size={scale(20)} color={COLORS.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8E7',
    marginHorizontal: scale(20),
    marginVertical: verticalScale(15),
    borderRadius: moderateScale(16),
    padding: scale(16),
    flexDirection: 'row',
    borderWidth: scale(1),
    borderColor: '#FFE082',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    marginRight: scale(12),
    justifyContent: 'flex-start',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(6),
  },
  description: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    lineHeight: moderateScale(18),
    marginBottom: verticalScale(12),
  },
  buttonRow: {
    flexDirection: 'row',
    gap: scale(10),
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    borderWidth: scale(1),
    borderColor: COLORS.border,
  },
  buttonSecondaryText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  buttonPrimary: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scale(6),
  },
  buttonPrimaryText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.white,
  },
  closeButton: {
    position: 'absolute',
    top: scale(12),
    right: scale(12),
    padding: scale(4),
  },
});
