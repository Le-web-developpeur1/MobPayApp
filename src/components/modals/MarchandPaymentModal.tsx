import { COLORS } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

interface MarchandPaymentModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (amount: string, note: string) => void;
  marchandName: string;
  marchandPhone: string;
}

const QUICK_AMOUNTS = [10000, 25000, 50000, 100000, 200000, 500000];

export default function MarchandPaymentModal({
  visible,
  onClose,
  onSubmit,
  marchandName,
  marchandPhone,
}: MarchandPaymentModalProps) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (amount && parseFloat(amount) > 0) {
      onSubmit(amount, note);
      setAmount("");
      setNote("");
    }
  };

  const isValid = amount && parseFloat(amount) > 0;

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Paiement marchand</Text>
              <Text style={styles.subtitle}>Entrez le montant à payer</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={scale(24)} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Marchand Info */}
            <View style={styles.marchandCard}>
              <View style={styles.marchandIcon}>
                <Ionicons name="storefront" size={scale(24)} color={COLORS.primary} />
              </View>
              <View style={styles.marchandInfo}>
                <Text style={styles.marchandName}>{marchandName}</Text>
                <Text style={styles.marchandPhone}>{marchandPhone}</Text>
              </View>
            </View>

            {/* Amount Input */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Montant</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  placeholderTextColor={COLORS.textSecondary}
                />
                <Text style={styles.currency}>GNF</Text>
              </View>
            </View>

            {/* Quick Amounts */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Montants rapides</Text>
              <View style={styles.amountGrid}>
                {QUICK_AMOUNTS.map((amt) => (
                  <TouchableOpacity
                    key={amt}
                    style={[
                      styles.amountCard,
                      amount === String(amt) && styles.amountCardSelected
                    ]}
                    onPress={() => setAmount(String(amt))}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.amountText,
                      amount === String(amt) && styles.amountTextSelected
                    ]}>
                      {amt.toLocaleString()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Note (Optional) */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Note (optionnel)</Text>
              <TextInput
                style={styles.noteInput}
                placeholder="Ex: Achat de produits..."
                value={note}
                onChangeText={setNote}
                multiline
                numberOfLines={3}
                placeholderTextColor={COLORS.textSecondary}
              />
            </View>
          </ScrollView>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={!isValid}
            activeOpacity={0.7}
          >
            <Text style={styles.submitButtonText}>Continuer</Text>
            <Ionicons name="arrow-forward" size={scale(20)} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.overlay,
  },
  container: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: moderateScale(25),
    borderTopRightRadius: moderateScale(25),
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(20),
    maxHeight: '90%',
  },
  handleBar: {
    width: scale(40),
    height: verticalScale(4),
    backgroundColor: COLORS.border,
    borderRadius: moderateScale(2),
    alignSelf: 'center',
    marginBottom: verticalScale(15),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: verticalScale(20),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(4),
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: moderateScale(13),
  },
  closeButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: moderateScale(18),
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marchandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: moderateScale(12),
    padding: scale(15),
    marginBottom: verticalScale(20),
    gap: scale(12),
  },
  marchandIcon: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marchandInfo: {
    flex: 1,
  },
  marchandName: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(4),
  },
  marchandPhone: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: verticalScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(12),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(15),
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    fontSize: moderateScale(32),
    fontWeight: '700',
    color: COLORS.textPrimary,
    paddingVertical: verticalScale(16),
  },
  currency: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(10),
  },
  amountCard: {
    width: '31%',
    backgroundColor: COLORS.white,
    borderWidth: scale(2),
    borderColor: COLORS.border,
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountCardSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  amountText: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  amountTextSelected: {
    color: COLORS.white,
  },
  noteInput: {
    backgroundColor: COLORS.background,
    borderRadius: moderateScale(12),
    padding: scale(15),
    fontSize: moderateScale(15),
    color: COLORS.textPrimary,
    borderWidth: 2,
    borderColor: COLORS.border,
    textAlignVertical: 'top',
    minHeight: verticalScale(80),
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(10),
    marginTop: verticalScale(10),
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.border,
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.white,
  },
});
