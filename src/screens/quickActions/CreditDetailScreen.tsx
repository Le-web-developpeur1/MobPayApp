import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { FontAwesome6 } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { CreditConfirmModal } from '../../components/modals/CreditConfirmModal';
import HeaderScreen from '../../components/ui/HeaderScreen';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type DetailCreditRouteProp = RouteProp<RootStackParamList, 'CreditDetail'>;

const credit = [
  { prix: 1000 },
  { prix: 2000 },
  { prix: 5000 },
  { prix: 10000 },
  { prix: 15000 },
  { prix: 20000 },
];

export default function CreditDetailScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<DetailCreditRouteProp>();

  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState(route.params?.phone || '');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { typeCredit } = route.params as {
    typeCredit: 'pour moi' | 'pour autre';
    phone?: string;
  };

  const showInput = typeCredit === 'pour autre' || phone !== '';
  const isSelfPurchase = typeCredit === 'pour moi';

  const handleContactsPermission = async () => {
    // TODO: Implement contact permission handler
    navigation.navigate(ROUTES.CONTACT, { type: 'CreditDetail' } as any);
  };

  const handleContinue = () => {
    setShowConfirmModal(true);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderScreen title={t('credit.creditPurchase')} />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Input téléphone si "pour autre" */}
            {showInput && (
              <>
                <Text style={styles.sectionTitle}>
                  {t('credit.beneficiary')}
                </Text>
                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder={t('credit.beneficiaryNumber')}
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    placeholderTextColor={COLORS.textSecondary}
                  />
                  <TouchableOpacity onPress={handleContactsPermission}>
                    <FontAwesome6
                      name="user"
                      size={moderateScale(20)}
                      color={COLORS.primary}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* Input montant */}
            <Text style={styles.sectionTitle}>
              {t('credit.amount')}
            </Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder={t('credit.amountToSend')}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholderTextColor={COLORS.textSecondary}
              />
              <Text style={styles.currency}>GNF</Text>
            </View>

            {/* Montants prédéfinis */}
            <Text style={styles.sectionTitle}>
              {t('credit.quickAmounts')}
            </Text>
            <View style={styles.prixSection}>
              {credit.map((c, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.card,
                    amount === String(c.prix) && styles.cardSelected
                  ]}
                  onPress={() => setAmount(String(c.prix))}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.cardGnf,
                    amount === String(c.prix) && styles.cardGnfSelected
                  ]}>
                    {c.prix} GNF
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Bouton continuer */}
            <TouchableOpacity
              style={[
                styles.continuer, 
                !amount && typeCredit === "pour autre" && !phone && styles.continuerDisabled,
                
              ]}
              onPress={handleContinue}
              disabled={!amount}
              activeOpacity={0.8}
            >
              <Text style={styles.continuerText}>{t('common.continue')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreditConfirmModal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        phone={phone}
        amount={amount}
        isSelfPurchase={isSelfPurchase}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  keyboardView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: verticalScale(20),
  },
  container: {
    paddingTop: verticalScale(20),
    paddingHorizontal: scale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(10),
    marginTop: verticalScale(5),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: scale(1),
    borderColor: COLORS.border,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(15),
    backgroundColor: COLORS.background,
    marginBottom: verticalScale(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(1) },
    shadowOpacity: 0.05,
    shadowRadius: moderateScale(3),
    elevation: 1,
  },
  input: {
    flex: 1,
    fontSize: moderateScale(16),
    color: COLORS.textPrimary,
    paddingVertical: verticalScale(14),
    fontWeight: '500',
  },
  icon: {
    padding: scale(8),
  },
  currency: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: COLORS.primary,
    marginLeft: scale(10),
    paddingLeft: scale(10),
    borderLeftWidth: scale(1),
    borderLeftColor: COLORS.border,
  },
  prixSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: verticalScale(15),
  },
  card: {
    width: '31%',
    backgroundColor: COLORS.white,
    borderWidth: scale(1.5),
    borderColor: COLORS.border,
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(16),
    marginBottom: verticalScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(4),
    elevation: 2,
  },
  cardGnf: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  cardSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  cardGnfSelected: {
    color: COLORS.white,
  },
  continuer: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(8),
    elevation: 5,
  },
  continuerDisabled: {
    opacity: 0.5,
  },
  continuerText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: moderateScale(16),
  },
});
