import HeaderScreen from '@/src/components/ui/HeaderScreen';
import { COLORS } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export default function ChangePinScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showCurrentPin, setShowCurrentPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const handleChangePin = () => {
    if (!currentPin || !newPin || !confirmPin) {
      Alert.alert(t('common.error'), 'Veuillez remplir tous les champs');
      return;
    }

    if (currentPin.length !== 4 || newPin.length !== 4 || confirmPin.length !== 4) {
      Alert.alert(t('common.error'), 'Le PIN doit contenir exactement 4 chiffres');
      return;
    }

    if (newPin !== confirmPin) {
      Alert.alert(t('common.error'), 'Les nouveaux PINs ne correspondent pas');
      return;
    }

    if (currentPin === newPin) {
      Alert.alert(t('common.error'), 'Le nouveau PIN doit être différent de l\'ancien');
      return;
    }

    // Simulation de changement de PIN
    Alert.alert(
      t('common.success'),
      'Votre PIN a été modifié avec succès',
      [
        {
          text: t('common.ok'),
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <HeaderScreen title={t('auth.changePin')} />
      <View style={styles.container}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: verticalScale(20)}}
        >
          <View style={styles.infoCard}>
            <Ionicons name="information-circle-outline" size={scale(24)} color={COLORS.primary} />
            <Text style={styles.infoText}>
              {t('auth.pinInfo')}
            </Text>
          </View>

          {/* PIN actuel */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('auth.currentPin')}</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={currentPin}
                onChangeText={setCurrentPin}
                placeholder="••••"
                placeholderTextColor={COLORS.textSecondary}
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry={!showCurrentPin}
                autoCorrect={false}
                autoComplete="off"
              />
              <TouchableOpacity
                onPress={() => setShowCurrentPin(!showCurrentPin)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showCurrentPin ? 'eye-outline' : 'eye-off-outline'}
                  size={scale(20)}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Nouveau PIN */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('auth.newPin')}</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={newPin}
                onChangeText={setNewPin}
                placeholder="••••"
                placeholderTextColor={COLORS.textSecondary}
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry={!showNewPin}
                autoCorrect={false}
                autoComplete="off"
              />
              <TouchableOpacity
                onPress={() => setShowNewPin(!showNewPin)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showNewPin ? 'eye-outline' : 'eye-off-outline'}
                  size={scale(20)}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirmer PIN */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('auth.confirmNewPin')}</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={confirmPin}
                onChangeText={setConfirmPin}
                placeholder="••••"
                placeholderTextColor={COLORS.textSecondary}
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry={!showConfirmPin}
                autoCorrect={false}
                autoComplete="off"
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPin(!showConfirmPin)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showConfirmPin ? 'eye-outline' : 'eye-off-outline'}
                  size={scale(20)}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleChangePin}>
            <Text style={styles.buttonText}>{t('auth.changePin')}</Text>
          </TouchableOpacity>
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
    paddingTop: verticalScale(20),
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    padding: scale(15),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(25),
    gap: scale(12),
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: moderateScale(13),
    color: COLORS.primary,
    lineHeight: moderateScale(20),
  },
  inputContainer: {
    marginBottom: verticalScale(20),
  },
  label: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(8),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(12),
    borderWidth: scale(1),
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(14),
    fontSize: moderateScale(16),
    color: COLORS.textPrimary,
    letterSpacing: scale(8),
  },
  eyeIcon: {
    paddingHorizontal: scale(15),
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.white,
  },
});
