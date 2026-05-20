import { COLORS, ROUTES } from '@/src/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import * as LocalAuthentication from 'expo-local-authentication';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const DEFAULT_PIN = '1234';

export default function LoginPinScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { phone } = route.params as { phone: string };
  const { t } = useTranslation();

  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(4).fill(0);

  const offset = useSharedValue(0);
  
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }]
    }
  });
  
  const OFFSET = 20;
  const TIME = 80;

  useEffect(() => {
    if (code.length === 4) {
      if (code.join("") === DEFAULT_PIN) {
        Alert.alert(
          t('common.success'),
          t('auth.loginSuccess')
        );
        navigation.reset({
          index: 0,
          routes: [{ name: ROUTES.MAIN }],
        });
        setCode([]);
      } else {
        offset.value = withSequence(
          withTiming(-OFFSET, { duration: TIME / 2 }),
          withRepeat(withTiming(OFFSET, { duration: TIME / 2 }), 4, true),
          withTiming(0, { duration: TIME / 2 })
        );
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert(t('common.error'), t('auth.pinIncorrect'));
        setCode([]);
      }
    }
  }, [code]);

  const onNumberPress = (number: number) => {
    if (code.length < 4) {
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

  const onBiometricPress = async () => {
    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      Alert.alert(
        t('common.success'),
        t('auth.loginSuccess')
      );
      navigation.reset({
        index: 0,
        routes: [{ name: ROUTES.MAIN }],
      });
      setCode([]);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleForgotPin = () => {
    Alert.alert(t('auth.forgotPin'), t('auth.forgotPinMessage'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('auth.enterPin')}</Text>
        <Text style={styles.subtitle}>{phone}</Text>

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
            />
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
            <TouchableOpacity
              onPress={() => onBiometricPress()}
              style={styles.numberButton}
            >
              <MaterialCommunityIcons name="face-recognition" size={30} color={COLORS.primary} />
            </TouchableOpacity>

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
                <View style={styles.backspace} />
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={handleForgotPin}>
          <Text style={styles.forgotPin}>{t('auth.forgotPin')}</Text>
        </TouchableOpacity>
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
    gap: scale(25),
    marginVertical: verticalScale(60),
  },
  codeEmpty: {
    width: scale(25),
    height: verticalScale(25),
    borderRadius: moderateScale(25),
    borderWidth: scale(1),
    borderColor: COLORS.primary,
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
  backspace: {
    width: scale(60),
    height: scale(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(30),
  },
  forgotPin: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
  },
});
