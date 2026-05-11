import { COLORS, ROUTES } from '@/src/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import * as LocalAuthentication from 'expo-local-authentication';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { RootStackParamList } from '../../navigation/types';
import PurchaseReceiptModal from './PurchaseReceiptModal';
import { useTranslation } from 'react-i18next';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface PurchaseCodeModalProps {
  visible: boolean;
  onClose: () => void;
  productType: 'esim' | 'giftcard';
  productName: string;
  country?: string;
  typeEsim?: string;
  beneficiary: {
    name: string;
    email: string;
  };
  purchase: {
    amount: string;
    amountGnf: string;
  };
}

export default function PurchaseCodeModal({
  visible,
  onClose,
  productType,
  productName,
  country,
  typeEsim,
  beneficiary,
  purchase,
}: PurchaseCodeModalProps) {
  const { t } = useTranslation();
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(4).fill(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const navigation = useNavigation<NavigationProp>();

  const offset = useSharedValue(0);
  const rotation = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const loaderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const OFFSET = 20;
  const TIME = 80;

  useEffect(() => {
    if (showLoader) {
      rotation.value = withRepeat(withTiming(360, { duration: 1000 }), -1, false);
    } else {
      rotation.value = 0;
    }
  }, [showLoader]);

  useEffect(() => {
    if (code.length === 4) {
      if (code.join('') === '1234') {
        onClose();
        setTimeout(() => {
          setShowLoader(true);
          setTimeout(() => {
            setShowLoader(false);
            Alert.alert(t('purchase.purchaseSuccess'));
            setShowReceipt(true);
          }, 2000);
        }, 300);
        setCode([]);
      } else {
        offset.value = withSequence(
          withTiming(-OFFSET, { duration: TIME / 2 }),
          withRepeat(withTiming(OFFSET, { duration: TIME / 2 }), 4, true),
          withTiming(0, { duration: TIME / 2 })
        );
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
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
      onClose();
      setTimeout(() => {
        setShowLoader(true);
        setTimeout(() => {
          setShowLoader(false);
          Alert.alert(t('purchase.purchaseSuccess'));
          setShowReceipt(true);
        }, 2000);
      }, 300);
      setCode([]);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleReceiptClose = () => {
    setShowReceipt(false);
    navigation.navigate(ROUTES.MAIN);
  };

  return (
    <>
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>{t('auth.enterPin')}</Text>
            <Animated.View style={[styles.codeView, style]}>
              {codeLength.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.codeEmpty,
                    {
                      backgroundColor: code[index] !== undefined ? COLORS.primary : 'transparent',
                    },
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
                <TouchableOpacity onPress={() => onBiometricPress()} style={styles.numberButton}>
                  <MaterialCommunityIcons name="face-recognition" size={30} color={COLORS.primary} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onNumberPress(0)} style={styles.numberButton}>
                  <Text style={styles.number}>0</Text>
                </TouchableOpacity>

                <View style={{ width: scale(60), alignItems: 'center' }}>
                  {code.length > 0 ? (
                    <TouchableOpacity onPress={() => onBackspacePress()} style={styles.numberButton}>
                      <MaterialCommunityIcons
                        name="backspace-outline"
                        size={scale(30)}
                        color={COLORS.textPrimary}
                      />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.backspace} />
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Loader Modal */}
      <Modal visible={showLoader} transparent animationType="fade">
        <View style={styles.loaderOverlay}>
          <View style={styles.loaderContainer}>
            <Animated.View style={loaderStyle}>
              <MaterialCommunityIcons name="loading" size={scale(60)} color={COLORS.primary} />
            </Animated.View>
            <Text style={styles.loaderText}>{t('common.processing')}</Text>
            <Text style={styles.loaderSubtext}>{t('common.pleaseWait')}</Text>
          </View>
        </View>
      </Modal>

      <PurchaseReceiptModal
        visible={showReceipt}
        onClose={handleReceiptClose}
        productType={productType}
        productName={productName}
        country={country}
        typeEsim={typeEsim}
        beneficiary={beneficiary}
        purchase={purchase}
      />
    </>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: COLORS.overlay,
  },
  modalContent: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
  },
  title: {
    textAlign: 'center',
    fontSize: moderateScale(22),
    color: COLORS.textPrimary,
  },
  codeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingBottom: verticalScale(85),
  },
  numberView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  number: {
    fontSize: moderateScale(32),
    color: COLORS.textPrimary,
  },
  numberButton: {
    width: scale(60),
    height: scale(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(30),
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  backspace: {
    width: scale(60),
    height: scale(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(30),
  },
  loaderOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.overlay,
  },
  loaderContainer: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(20),
    padding: scale(40),
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scale(200),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loaderText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(8),
  },
  loaderSubtext: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
  },
});
