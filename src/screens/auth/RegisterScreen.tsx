import { COLORS, ROUTES } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, KeyboardAvoidingView, Linking, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();

  const route = useRoute();
  
  const { numero } = route.params as { numero: string }

  const [phone, setPhone] = useState(numero ||'');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState(false);

  const handleContinue = () => {
    if (!prenom || !nom) {
      Alert.alert(t('common.error'), 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Validation email si fourni
    if (email && !email.includes('@')) {
      Alert.alert(t('common.error'), 'Veuillez entrer une adresse email valide');
      return;
    }

    if (!checked) {
      Alert.alert(t('common.error'), 'Veuillez accepter les conditions générales');
      return;
    }

    // Navigation vers vérification OTP
    navigation.navigate(ROUTES.VERIFICATION, { phone });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={scale(24)} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('auth.registration')}</Text>
        <View style={{ width: scale(24) }} />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.infoContainer}>
            <Ionicons name="information-circle-outline" size={scale(20)} color={COLORS.primary} />
            <Text style={styles.infoText}>
              Créez votre compte rapidement. Vous pourrez compléter votre profil après la connexion.
            </Text>
          </View>

          <TextInput
            style={[styles.input, { fontSize: moderateScale(20), fontWeight: '600' }]}
            value={phone}
            onChangeText={setPhone}
            placeholder="+224 626 05 80 33"
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="phone-pad"
            editable={false}
          />

          <TextInput
            style={styles.input}
            value={prenom}
            onChangeText={setPrenom}
            placeholder="Prénom*"
            placeholderTextColor={COLORS.textSecondary}
            autoCorrect={false}
            autoComplete="off"
          />

          <TextInput
            style={styles.input}
            value={nom}
            onChangeText={setNom}
            placeholder="Nom de famille*"
            placeholderTextColor={COLORS.textSecondary}
            autoCorrect={false}
            autoComplete="off"
          />

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email (optionnel)"
            placeholderTextColor={COLORS.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
          />

          <View style={styles.checkboxRow}>
            <TouchableOpacity onPress={() => setChecked(!checked)}>
              <View style={[styles.checkbox, checked && styles.checkedBox]}>
                {checked && <Ionicons name="checkmark" color={COLORS.white} size={scale(16)} />}
              </View>
            </TouchableOpacity>
            <Text style={styles.checkboxText}>
              {t('auth.acceptTerms')}{' '}
              <Text
                style={styles.link}
                onPress={() => Linking.openURL('https://mobpay.gn/conditions')}
              >
                {t('auth.termsAndConditions')}
              </Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>{t('common.continue')}</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            * Champs obligatoires
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
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
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
    paddingBottom: verticalScale(40),
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    padding: scale(12),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(20),
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: scale(10),
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    lineHeight: moderateScale(18),
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: scale(1),
    borderColor: COLORS.border,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(14),
    fontSize: moderateScale(16),
    color: COLORS.textPrimary,
    marginBottom: verticalScale(15),
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(25),
    marginTop: verticalScale(10),
  },
  checkbox: {
    width: scale(24),
    height: scale(24),
    borderRadius: moderateScale(6),
    borderWidth: scale(2),
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(10),
  },
  checkedBox: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxText: {
    flex: 1,
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
  },
  link: {
    color: COLORS.primary,
    fontWeight: '600',
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
  footerText: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: verticalScale(15),
  },
});
