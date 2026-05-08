import { COLORS, ROUTES } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginPinScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { phone } = route.params as { phone: string };

  const [pin, setPin] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const DEFAULT_PIN = '1234';

  const handlePinChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text[text.length - 1];
    }

    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newPin.every((digit) => digit !== '')) {
      handleLogin(newPin.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleLogin = (fullPin: string) => {
    if (fullPin.length !== 4) {
      Alert.alert('Erreur', 'Veuillez saisir votre code PIN');
      return;
    }
    
    if (fullPin === DEFAULT_PIN) {
      Alert.alert(
        'Succès',
        'Connexion réussie'
      );
      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.MAIN}],
      });
    } else {
      Alert.alert("Erreur", "Code PIN incorrect");
      setPin(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const handleForgotPin = () => {
    Alert.alert('PIN oublié', 'Contactez le service client pour réinitialiser votre PIN');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={scale(24)} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Connexion</Text>
        <View style={{ width: scale(24) }} />
      </View>

      <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Ionicons name="lock-closed-outline" size={scale(60)} color={COLORS.primary} />
            </View>

            <Text style={styles.title}>Entrez votre PIN</Text>
            <Text style={styles.subtitle}>
              Saisissez votre code PIN pour accéder à votre compte
            </Text>
            <Text style={styles.phone}>{phone}</Text>

            <View style={styles.pinContainer}>
              {pin.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {(inputRefs.current[index] = ref)}}
                  style={[styles.pinInput, digit && styles.pinInputFilled]}
                  value={digit}
                  onChangeText={(text) => handlePinChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  secureTextEntry
                  autoFocus={index === 0}
                />
              ))}
            </View>

            <TouchableOpacity onPress={handleForgotPin}>
              <Text style={styles.forgotPin}>PIN oublié ?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLogin(pin.join(''))}
            >
              <Text style={styles.buttonText}>Se connecter</Text>
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
    borderRadius: moderateScale(50),
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
    marginBottom: verticalScale(10),
  },
  phone: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: verticalScale(40),
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    marginBottom: verticalScale(30),
    gap: scale(8)
  },
  pinInput: {
    width: scale(60),
    height: verticalScale(60),
    borderWidth: scale(2),
    borderColor: COLORS.border,
    borderRadius: moderateScale(12),
    fontSize: moderateScale(32),
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.textPrimary,
    backgroundColor: COLORS.background,
  },
  pinInputFilled: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.secondary,
  },
  forgotPin: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: verticalScale(30),
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
