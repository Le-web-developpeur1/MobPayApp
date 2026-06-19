import Contact from '@/src/components/contact/Contact';
import { CreditConfirmModal } from '@/src/components/modals/CreditConfirmModal';
import HeaderScreen from '@/src/components/ui/HeaderScreen';
import { COLORS } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const CREDIT_AMOUNTS = [
  { prix: 1000 },
  { prix: 2000 },
  { prix: 5000 },
  { prix: 10000 },
  { prix: 15000 },
  { prix: 20000 },
];

const OPERATEURS = [
  { id: 'orange', label: "Orange", img: require("@/assets/images/national/logo-orange.png") },
  { id: 'mtn', label: "MTN", img: require("@/assets/images/national/mtn.png") },
  { id: 'cellcom', label: "Cellcom", img: require("@/assets/images/national/cellcom.png") },
];

type RecipientType = 'self' | 'other';

export default function Credit() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  const [recipientType, setRecipientType] = useState<RecipientType>('self');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handlePurchase = () => {
    setShowConfirmModal(true);
  };

  const isValid = selectedOperator && (recipientType === 'self' || phone) && amount;

  return (
    <SafeAreaView style={styles.area} edges={['top']}>
      <HeaderScreen title='Achat de crédit téléphonique'/>
      
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choisir l'opérateur</Text>
          <View style={styles.operateurGrid}>
            {OPERATEURS.map((operateur) => (
              <TouchableOpacity 
                key={operateur.id}
                style={[
                  styles.operateurCard,
                  selectedOperator === operateur.id && styles.operateurCardSelected
                ]}
                onPress={() => setSelectedOperator(operateur.id)}
                activeOpacity={0.7}
              >
                <Image source={operateur.img} style={styles.operateurImg}/>
                <Text style={styles.operateurLabel}>{operateur.label}</Text>
                <View style={styles.radioContainer}>
                  <Ionicons 
                    name={selectedOperator === operateur.id ? 'radio-button-on' : 'radio-button-off'} 
                    size={scale(24)}
                    color={selectedOperator === operateur.id ? COLORS.primary : COLORS.textSecondary}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[{flexDirection: "row", alignItems: 'center', gap: scale(10), marginTop: verticalScale(20), justifyContent: "center"}]}>
          <Text style={styles.sectionTitle}>Pour</Text>
          <View style={styles.recipientOptions}>
            <TouchableOpacity 
              style={styles.recipientOption}
              onPress={() => setRecipientType('self')}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={recipientType === 'self' ? 'radio-button-on' : 'radio-button-off'} 
                size={scale(22)}
                color={recipientType === 'self' ? COLORS.primary : COLORS.textSecondary}
              />
              <Text style={styles.recipientText}>Mon numéro</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.recipientOption}
              onPress={() => setRecipientType('other')}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={recipientType === 'other' ? 'radio-button-on' : 'radio-button-off'} 
                size={scale(22)}
                color={recipientType === 'other' ? COLORS.primary : COLORS.textSecondary}
              />
              <Text style={styles.recipientText}>Un autre numéro</Text>
            </TouchableOpacity>
          </View>
        </View>

        {recipientType === 'other' && (
          <View style={styles.section}>
            <Contact 
              searchExterne={phone} 
              showSearchBar={false}
              useSafeArea={false}
              onSelectContact={(contact) => {
                setPhone(contact.phoneNumbers?.[0]?.number || "");
              }}
              credit={false}
            />
          </View>
        )}

        <View style={styles.section}>
          <TextInput 
            style={styles.input}
            label="Montant personnalisé"
            keyboardType="numeric"
            theme={{
              colors: {
                placeholder: COLORS.textSecondary,
                text: COLORS.textPrimary,
                primary: COLORS.primary,
              },
            }}
            value={amount}
            onChangeText={setAmount}
            mode="outlined"
          />
        </View>

        {/* Section Montants prédéfinis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Montants rapides</Text>
          <View style={styles.amountGrid}>
            {CREDIT_AMOUNTS.map((c, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.amountCard,
                  amount === String(c.prix) && styles.amountCardSelected
                ]}
                onPress={() => setAmount(String(c.prix))}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.amountText,
                  amount === String(c.prix) && styles.amountTextSelected
                ]}>
                  {c.prix.toLocaleString()} GNF
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.footerSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Solde :</Text>
            <Text style={styles.infoValue}>23 589 556 GNF</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Frais :</Text>
            <Text style={[styles.infoValue, styles.freeText]}>Gratuit</Text>
          </View>

          <TouchableOpacity
            style={[styles.purchaseButton, !isValid && styles.purchaseButtonDisabled]}
            onPress={handlePurchase}
            disabled={!isValid}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Acheter le crédit</Text>
            <Ionicons name="arrow-forward" size={scale(20)} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de confirmation */}
      <CreditConfirmModal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        phone={recipientType === 'self' ? 'Mon numéro' : phone}
        amount={amount}
        isSelfPurchase={recipientType === 'self'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(20),
  },
  section: {
    marginTop: verticalScale(10),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    paddingBottom: verticalScale(5)
  },
  operateurGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: scale(12),
  },
  operateurCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(12),
    padding: scale(12),
    alignItems: 'center',
    borderWidth: scale(2),
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  operateurCardSelected: {
    borderColor: COLORS.primary,
  },
  operateurImg: {
    height: scale(60),
    width: scale(60),
    borderRadius: scale(30),
    marginBottom: verticalScale(8),
  },
  operateurLabel: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(4),
  },
  radioContainer: {
    position: 'absolute',
    top: scale(8),
    right: scale(8),
  },
  recipientOptions: {
    flexDirection: "row",
    gap: scale(20),
  },
  recipientOption: {
    flexDirection: 'row',
    alignItems: "center",
    gap: scale(10),
  },
  recipientText: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  input: {
    backgroundColor: COLORS.white,
    fontSize: moderateScale(16),
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: scale(10),
  },
  amountCard: {
    width: '31%',
    backgroundColor: COLORS.white,
    borderWidth: scale(2),
    borderColor: COLORS.border,
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  amountText: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  amountCardSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  amountTextSelected: {
    color: COLORS.white,
  },
  footerSection: {
    marginTop: verticalScale(24),
    paddingTop: verticalScale(16),
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
  infoLabel: {
    fontSize: moderateScale(15),
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: "#2A4793",

  },
  freeText: {
    color: COLORS.success,
  },
  purchaseButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(10),
    marginTop: verticalScale(16),
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  purchaseButtonDisabled: {
    backgroundColor: COLORS.textSecondary,
    opacity: 0.6,
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.white,
  },
});