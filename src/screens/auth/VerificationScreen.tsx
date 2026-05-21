import { COLORS, ROUTES } from '@/src/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function VerificationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { phone } = route.params as { phone: string };
  const { t } = useTranslation();

  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(6).fill(0);
  const [timer, setTimer] = useState(60);

  const offset = useSharedValue(0);
  
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }]
    }
  });
  
  const OFFSET = 20;
  const TIME = 80;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (code.length === 6) {
      // Simulation de vérification - Navigation vers création de PIN
      Alert.alert(
        t('common.success'),
        t('auth.numberVerifiedSuccess'),
        [
          {
            text: t('common.ok'),
            onPress: () => navigation.navigate(ROUTES.CREATE_PIN, { phone }),
          },
        ]
      );
      setCode([]);
    }
  }, [code]);

  const onNumberPress = (number: number) => {
    if (code.length < 6) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setCode([...code, number]);
    }
  };

  const onBackspacePress = () => {
    if (code.length > 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setCode(code.slice(0, -1));
    }
  };

  const handleResend = () => {
    if (timer > 0) return;

    setTimer(60);
    Alert.alert('Code envoyé', 'Un nouveau code a été envoyé à votre numéro');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('auth.verifyNumber')}</Text>
        <Text style={styles.subtitle}>
          {t('auth.verificationCodeSent')}
        </Text>
        <Text style={styles.phone}>{phone}</Text>

        <Animated.View style={[styles.codeView, style]}>
          {codeLength.map((_, index) => (
            <View
              key={index}
              style={[
                styles.codeEmpty,
                {
                  backgroundColor: code[index] !== undefined ? COLORS.primary : "transparent"
                }
              ]}
            >
              {code[index] !== undefined && (
                <Text style={styles.codeText}>{code[index]}</Text>
              )}
            </View>
          ))}
        </Animated.View>

        <View style={styles.numberGrid}>
          <View style={styles.numberView}>
            {[1, 2, 3].map((number) => (
              <TouchableOpacity
                key={number}
                onPress={() => onNumberPress(number)}
                style={styles.numberButton}
              >
                <Text style={styles.number}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.numberView}>
            {[4, 5, 6].map((number) => (
              <TouchableOpacity
                key={number}
                onPress={() => onNumberPress(number)}
                style={styles.numberButton}
              >
                <Text style={styles.number}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.numberView}>
            {[7, 8, 9].map((number) => (
              <TouchableOpacity
                key={number}
                onPress={() => onNumberPress(number)}
                style={styles.numberButton}
              >
                <Text style={styles.number}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.numberView}>
            <View style={styles.emptyButton} />

            <TouchableOpacity
              onPress={() => onNumberPress(0)}
              style={styles.numberButton}
            >
              <Text style={styles.number}>0</Text>
            </TouchableOpacity>

            <View style={{ width: scale(60), alignItems: "center" }}>
              {code.length > 0 ? (
                <TouchableOpacity
                  onPress={() => onBackspacePress()}
                  style={styles.numberButton}
                >
                  <MaterialCommunityIcons name="backspace-outline" size={scale(30)} color={COLORS.textPrimary} />
                </TouchableOpacity>
              ) : (
                <View style={styles.emptyButton} />
              )}
            </View>
          </View>
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>{t('auth.didntReceiveCode')}</Text>
          <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
            <Text style={[styles.resendButton, timer > 0 && styles.resendButtonDisabled]}>
              {timer > 0 ? `${t('auth.resend')} (${timer}s)` : t('auth.resend')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
  },
  title: {
    textAlign: "center",
    fontSize: moderateScale(22),
    color: COLORS.textPrimary,
    fontWeight: '700',
    marginBottom: verticalScale(10),
  },
  subtitle: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: verticalScale(5),
  },
  phone: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: verticalScale(20),
  },
  codeView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(15),
    marginVertical: verticalScale(40),
  },
  codeEmpty: {
    width: scale(40),
    height: verticalScale(40),
    borderRadius: moderateScale(8),
    borderWidth: scale(1),
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeText: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    color: COLORS.white,
  },
  numberGrid: {
    marginHorizontal: scale(30),
    gap: scale(35),
    marginBottom: verticalScale(30),
  },
  numberView: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  number: {
    fontSize: moderateScale(32),
    color: COLORS.textPrimary,
  },
  numberButton: {
    width: scale(60),
    height: scale(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(30),
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  emptyButton: {
    width: scale(60),
    height: scale(60),
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
});
