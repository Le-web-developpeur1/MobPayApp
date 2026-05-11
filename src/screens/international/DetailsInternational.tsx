import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { FontAwesome6 } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { ConfirmModal } from '../../components/modals/ConfirmModal';
import HeaderScreen from '../../components/ui/HeaderScreen';
import { useTranslation } from 'react-i18next';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type DetailsInterRouteProp = RouteProp<RootStackParamList, 'DetailsInternational'>;

export default function DetailsInternational() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<DetailsInterRouteProp>();
  
  const country = route.params?.country || '';

  const [phone, setPhone] = useState(route.params?.phone || '');
  const [name, setName] = useState(route.params?.name || '');
  const [gnf, setGnf] = useState('');
  const [xof, setXof] = useState('');
  const [fraisValue, setFraisValue] = useState(0);
  const [taxeValue, setTaxeValue] = useState(0);
  const [montantFacturer, setMontantFacturer] = useState(0);
  const [calcul, setCalcul] = useState(false);
  const [visible, setVisible] = useState(false);

  const tauxValue = 0.5;

  const handleContactPress = () => {
    // Passer country à Contact pour qu'il puisse le repasser à DetailsInternational
    navigation.navigate(ROUTES.CONTACT, { 
      type: 'International',
      country: country
    });
  };

  const handleGnfChange = (val: string) => {
    setGnf(val);
    const recu = Number(val);
    if (!isNaN(recu)) {
      setXof((recu * tauxValue).toString());
    }
  };

  const handleXofChange = (val: string) => {
    setXof(val);
    const recu = Number(val);
    if (!isNaN(recu)) {
      setGnf((recu / tauxValue).toString());
    }
  };

  const handleCalcul = () => {
    const recu = Number(gnf);
    const frais = recu * 0.01;
    const taxe = 0;
    const facturer = recu + taxe + frais;
    setFraisValue(frais);
    setTaxeValue(taxe);
    setMontantFacturer(facturer);
    setCalcul(true);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderScreen title="Transfert International" />
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
            <Text style={styles.sectionTitle}>Détails du bénéficiaire</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={country}
                editable={false}
                placeholderTextColor={COLORS.textSecondary}
              />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Numéro du bénéficiaire"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                placeholderTextColor={COLORS.textSecondary}
              />
              <TouchableOpacity onPress={handleContactPress}>
                <FontAwesome6 name="user" size={moderateScale(20)} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Prénom et Nom"
                value={name}
                onChangeText={setName}
                placeholderTextColor={COLORS.textSecondary}
              />
            </View>

            <Text style={styles.sectionTitle}>Montant du transfert</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Montant en GNF"
                keyboardType="numeric"
                value={gnf}
                onChangeText={handleGnfChange}
                placeholderTextColor={COLORS.textSecondary}
              />
              <Text style={styles.currency}>GNF</Text>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Montant en XOF"
                keyboardType="numeric"
                value={xof}
                onChangeText={handleXofChange}
                placeholderTextColor={COLORS.textSecondary}
              />
              <Text style={styles.currency}>XOF</Text>
            </View>

            {calcul && (
              <View style={styles.fraisCard}>
                <View style={styles.fraisRow}>
                  <Text style={styles.fraisLabel}>Taux de change</Text>
                  <Text style={styles.fraisValue}>{tauxValue}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.fraisRow}>
                  <Text style={styles.fraisLabel}>Frais</Text>
                  <Text style={styles.fraisValue}>{formatNumber(fraisValue)} GNF</Text>
                </View>
                <View style={styles.fraisRow}>
                  <Text style={styles.fraisLabel}>Taxe</Text>
                  <Text style={styles.fraisValue}>{taxeValue} GNF</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.fraisRow}>
                  <Text style={styles.totalLabel}>Montant à facturer</Text>
                  <Text style={styles.totalValue}>{formatNumber(montantFacturer)} GNF</Text>
                </View>
              </View>
            )}

            {!calcul ? (
              <TouchableOpacity style={styles.button} onPress={handleCalcul} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Calculer</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => setVisible(true)}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Suivant</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      
      <ConfirmModal
        visible={visible}
        onClose={() => setVisible(false)}
        beneficiaire={{ name: name, phone: phone }}
        transaction={{ 
          montant: formatNumber(Number(gnf)), 
          frais: formatNumber(fraisValue), 
          taxe: `${taxeValue} GNF`, 
          total: formatNumber(montantFacturer) 
        }}
        isInternational={true}
        country={country}
        amountReceived={`${formatNumber(Number(xof))} XOF`}
        exchangeRate={`1 GNF = ${tauxValue} XOF`}
        transactionType="cashmoov"
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
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(12),
    marginTop: verticalScale(8),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(15),
    marginBottom: verticalScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.05,
    shadowRadius: moderateScale(4),
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: moderateScale(15),
    color: COLORS.textPrimary,
    paddingVertical: verticalScale(14),
  },
  currency: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: scale(10),
  },
  fraisCard: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: moderateScale(12),
    padding: scale(16),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(15),
  },
  fraisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(6),
  },
  fraisLabel: {
    fontSize: moderateScale(14),
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  fraisValue: {
    fontSize: moderateScale(14),
    color: COLORS.primary,
    fontWeight: '600',
  },
  divider: {
    height: scale(1),
    backgroundColor: COLORS.primary + '20',
    marginVertical: verticalScale(8),
  },
  totalLabel: {
    fontSize: moderateScale(15),
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  totalValue: {
    fontSize: moderateScale(16),
    color: COLORS.primary,
    fontWeight: '700',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(8),
    elevation: 5,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: moderateScale(16),
  },
});
