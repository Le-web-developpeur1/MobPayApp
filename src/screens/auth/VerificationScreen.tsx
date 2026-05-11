import { COLORS, ROUTES } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { RootStackParamList } from '../../navigation/types';
import { useTranslation } from 'react-i18next';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function VerificationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { phone } = route.params as { phone: string };
  const { t } = useTranslation();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text[text.length - 1];
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every((digit) => digit !== '')) {
      handleVerify(newCode.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (fullCode: string) => {
    if (fullCode.length !== 6) {
      Alert.alert(t('common.error'), t('auth.enterPinError'));
      return;
    }

    // Simulation de vérification - Navigation vers création de PIN
    Alert.alert(
      t('common.success'),
      'Votre numéro a été vérifié avec succès',
      [
        {
          text: t('common.ok'),
          onPress: () => navigation.navigate(ROUTES.CREATE_PIN, { phone }),
        },
      ]
    );
  };

  const handleResend = () => {
    if (timer > 0) return;

    setTimer(60);
    Alert.alert('Code envoyé', 'Un nouveau code a été envoyé à votre numéro');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={scale(24)} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('auth.verification')}</Text>
        <View style={{ width: scale(24) }} />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: verticalScale(10)}}
        >
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Ionicons name="mail-outline" size={scale(60)} color={COLORS.primary} />
            </View>

            <Text style={styles.title}>{t('auth.verifyNumber')}</Text>
            <Text style={styles.subtitle}>
              {t('auth.verificationCodeSent')}{'\n'}
              <Text style={styles.phone}>{phone}</Text>
            </Text>

            <View style={styles.codeContainer}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {(inputRefs.current[index] = ref)}}
                  style={[styles.codeInput, digit && styles.codeInputFilled]}
                  value={digit}
                  onChangeText={(text) => handleCodeChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  autoFocus={index === 0}
                />
              ))}
            </View>

            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>{t('auth.didntReceiveCode')}</Text>
              <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
                <Text style={[styles.resendButton, timer > 0 && styles.resendButtonDisabled]}>
                  {timer > 0 ? `${t('auth.resend')} (${timer}s)` : t('auth.resend')}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleVerify(code.join(''))}
            >
              <Text style={styles.buttonText}>{t('auth.verify')}</Text>
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
    paddingTop: verticalScale(40),
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
  phone: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(30),
  },
  codeInput: {
    width: scale(50),
    height: verticalScale(60),
    borderWidth: scale(2),
    borderColor: COLORS.border,
    borderRadius: moderateScale(12),
    fontSize: moderateScale(24),
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.textPrimary,
    backgroundColor: COLORS.background,
  },
  codeInputFilled: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.secondary,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(30),
    gap: scale(5),
  },
  resendText: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
  },
  resendButton: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.primary,
  },
  resendButtonDisabled: {
    color: COLORS.textSecondary,
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
