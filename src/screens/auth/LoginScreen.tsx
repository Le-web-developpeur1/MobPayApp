import CountryCodePicker, { COUNTRIES, Country } from '@/src/components/auth/CountryCodePicker';
import { COLORS, ROUTES } from '@/src/constants';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);

  const { t } = useTranslation();

  const handleContinue = () => {
    if (!phone) {
      Alert.alert(t('common.error'), t('auth.enterPhoneError'));
      return;
    } else if (phone.length < 9) {
      Alert.alert(t('common.error'), t('auth.invalidPhone'));
      return;
    } else if (phone === "626058033") {
      navigation.navigate(ROUTES.LOGIN_PIN, { phone: `${selectedCountry.dialCode} ${phone}` });
    } else {
      navigation.navigate(ROUTES.REGISTER, {numero: phone});
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>CashMoov</Text>
            </View>
            <Text style={styles.title}>{t('common.welcome')}</Text>
            <Text style={styles.subtitle}>{t('auth.loginSubtitle')}</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('auth.phone')}</Text>
              <View style={styles.phoneInputWrapper}>
                <CountryCodePicker
                  selectedCountry={selectedCountry}
                  onSelectCountry={setSelectedCountry}
                />
                <TextInput
                  style={styles.phoneInput}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder={t('auth.phonePlaceholder')}
                  placeholderTextColor={COLORS.textSecondary}
                  keyboardType="phone-pad"
                  maxLength={12}
                  autoCorrect={false}
                  autoComplete="off"
                />
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>{t('common.continue')}</Text>
            </TouchableOpacity>

      
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(30),
  },
  header: {
    alignItems: 'center',
    marginTop: verticalScale(60),
    marginBottom: verticalScale(50),
  },
  logoContainer: {
    width: scale(90),
    height: scale(90),
    borderRadius: moderateScale(45),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  logo: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: COLORS.white,
  },
  title: {
    fontSize: moderateScale(32),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(10),
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: COLORS.textSecondary,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: verticalScale(25),
  },
  label: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(8),
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: moderateScale(12),
    borderWidth: scale(1),
    borderColor: COLORS.border,
  },

  phoneInput: {
    flex: 1,
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(16),
    fontSize: moderateScale(16),
    color: COLORS.textPrimary,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.white,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(20),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: scale(15),
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
  },
  registerButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    borderWidth: scale(2),
    borderColor: COLORS.primary,
  },
  registerButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.primary,
  },
});
