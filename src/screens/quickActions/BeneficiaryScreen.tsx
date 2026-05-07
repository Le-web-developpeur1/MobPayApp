import { COLORS } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { PurchaseConfirmModal } from '../../components/modals/PurchaseConfirmModal';
import HeaderScreen from '../../components/ui/HeaderScreen';

type BeneficiaryRouteProp = RouteProp<RootStackParamList, 'EsimBenef' | 'GiftCardBenef'>;

export default function BeneficiaryScreen() {
  const route = useRoute<BeneficiaryRouteProp>();
  
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Récupérer les params
  const params = route.params as any;
  const { euro, gnf, euroValue, gnfValue, country, name, typeEsim } = params;

  // Déterminer le type basé sur le nom de la route
  const isESim = route.name === 'EsimBenef';
  const productType: 'esim' | 'giftcard' = isESim ? 'esim' : 'giftcard';
  const title = `Achat de ${isESim ? 'eSim' : 'Gift Card'}`;
  
  // Montant à afficher (priorité aux valeurs fixes, sinon custom)
  const displayEuro = euro || euroValue;
  const displayGnf = gnf || gnfValue;

  const handlePurchase = () => {
    setShowConfirmModal(true);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderScreen title="Détails du bénéficiaire" />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.container}>
            {/* Section achat */}
            <Text style={styles.sectionTitle}>{title}</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={country || typeEsim}
                editable={false}
                placeholderTextColor={COLORS.textSecondary}
              />
            </View>

            <Text style={styles.subtitle}>
              {productType} : {displayEuro}
            </Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={displayGnf}
                editable={false}
                placeholderTextColor={COLORS.textSecondary}
              />
              <Text style={styles.currency}>GNF</Text>
            </View>

            <View style={styles.separator} />

            {/* Section bénéficiaire */}
            <Text style={styles.sectionTitle}>Détails du bénéficiaire</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Prénom et Nom"
                value={nom}
                onChangeText={setNom}
                placeholderTextColor={COLORS.textSecondary}
              />
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Veuillez entrer l'adresse e-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={COLORS.textSecondary}
              />
            </View>

            {/* Avertissement */}
            {typeEsim === "Global" ? (
              <View style={styles.warningContainer}>
                  <Text style={styles.warningText}>
                    Achat non remboursable et utilisable partout dans le monde.
                </Text>
              </View>
            ) : typeEsim === "Europe" ? (
              <View style={styles.warningContainer}>
                  <Text style={styles.warningText}>
                    Achat non remboursable et utilisable seulement en :
                    <Text style={styles.warningCountry}> {typeEsim}</Text>
                </Text>
              </View>
            ) : ( 
              <View style={styles.warningContainer}>
                <Text style={styles.warningText}>
                  Achat non remboursable et utilisable seulement par les comptes en :
                  <Text style={styles.warningCountry}> {country}</Text>
                </Text>
              </View>
            )}

            {/* Bouton d'achat */}
            <TouchableOpacity
              style={[styles.button, (!nom || !email) && styles.buttonDisabled]}
              onPress={handlePurchase}
              disabled={!nom || !email}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Acheter</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <PurchaseConfirmModal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        productType={productType}
        productName={name}
        country={country}
        beneficiary={{ name: nom, email }}
        purchase={{ amount: displayEuro, amountGnf: displayGnf }}
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(20),
  },
  container: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(15),
  },
  sectionTitle: {
    fontSize: moderateScale(17),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(12),
  },
  subtitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.primary,
    marginVertical: verticalScale(8),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(15),
    marginBottom: verticalScale(12),
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
    color: COLORS.textSecondary,
    marginLeft: scale(10),
  },
  separator: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.borderLight,
    marginVertical: verticalScale(20),
  },
  warningContainer: {
    backgroundColor: '#FFF3CD',
    borderWidth: 1,
    borderColor: '#FFE69C',
    borderRadius: moderateScale(8),
    padding: scale(12),
    marginTop: verticalScale(10),
  },
  warningText: {
    color: '#856404',
    fontSize: moderateScale(12),
    lineHeight: moderateScale(18),
  },
  warningCountry: {
    fontWeight: '700',
    fontSize: moderateScale(14),
    color: COLORS.primary,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    marginTop: verticalScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(4) },
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(8),
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: moderateScale(16),
  },
});
