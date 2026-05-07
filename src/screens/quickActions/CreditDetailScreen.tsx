import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { FontAwesome6 } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
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
import HeaderScreen from '../../components/ui/HeaderScreen';
import { CreditConfirmModal } from '../../components/modals/CreditConfirmModal';

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
      <HeaderScreen title="Achat de crédits" />
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
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Numéro du bénéficiaire"
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
            )}

            {/* Input montant */}
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Montant à envoyer"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholderTextColor={COLORS.textSecondary}
              />
              <Text style={styles.currency}>GNF</Text>
            </View>

            {/* Montants prédéfinis */}
            <View style={styles.prixSection}>
              {credit.map((c, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.card}
                  onPress={() => setAmount(String(c.prix))}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cardGnf}>{c.prix} GNF</Text>
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
              <Text style={styles.continuerText}>Continuer</Text>
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
    paddingTop: verticalScale(30),
    paddingHorizontal: scale(20),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(15),
    backgroundColor: COLORS.white,
    marginBottom: verticalScale(12),
  },
  input: {
    flex: 1,
    fontSize: moderateScale(15),
    color: COLORS.textPrimary,
    paddingVertical: verticalScale(14),
  },
  icon: {
    marginRight: scale(8),
  },
  currency: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginLeft: scale(10),
  },
  prixSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  card: {
    width: scale(80),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardGnf: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.textPrimary,
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
