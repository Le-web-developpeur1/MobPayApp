import { COLORS, ROUTES } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CreatePinScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { phone } = route.params as { phone: string };

  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const handleCreatePin = () => {
    if (!pin || !confirmPin) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (pin.length !== 4 || confirmPin.length !== 4) {
      Alert.alert('Erreur', 'Le PIN doit contenir exactement 4 chiffres');
      return;
    }

    if (pin !== confirmPin) {
      Alert.alert('Erreur', 'Les PINs ne correspondent pas');
      return;
    }

    // Simulation de création de compte
    Alert.alert(
      'Succès',
      'Votre compte a été créé avec succès',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate(ROUTES.MAIN),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={scale(24)} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Créer un PIN</Text>
        <View style={{ width: scale(24) }} />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: verticalScale(20)}}
        >
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Ionicons name="lock-closed-outline" size={scale(60)} color={COLORS.primary} />
            </View>

            <Text style={styles.title}>Sécurisez votre compte</Text>
            <Text style={styles.subtitle}>
              Créez un code PIN de 4 chiffres pour sécuriser vos transactions
            </Text>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Code PIN</Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    value={pin}
                    onChangeText={setPin}
                    placeholder="••••"
                    placeholderTextColor={COLORS.textSecondary}
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry={!showPin}
                    autoCorrect={false}
                    autoComplete="off"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPin(!showPin)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showPin ? 'eye-outline' : 'eye-off-outline'}
                      size={scale(20)}
                      color={COLORS.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirmer le PIN</Text>
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

              <View style={styles.infoCard}>
                <Ionicons name="information-circle-outline" size={scale(20)} color={COLORS.primary} />
                <Text style={styles.infoText}>
                  Ne partagez jamais votre PIN avec personne
                </Text>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleCreatePin}>
                <Text style={styles.buttonText}>Créer mon compte</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(30),
    paddingTop: verticalScale(20),
  },
  iconContainer: {
    width: scale(100),
    height: scale(100),
    borderRadius: moderateScale(100),
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: verticalScale(30),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: verticalScale(10),
  },
  subtitle: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: moderateScale(22),
    marginBottom: verticalScale(40),
  },
  form: {
    flex: 1,
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
    backgroundColor: COLORS.background,
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
  infoCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    padding: scale(15),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(30),
    gap: scale(10),
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: moderateScale(13),
    color: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(12),
    alignItems: 'center',
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.white,
  },
});
