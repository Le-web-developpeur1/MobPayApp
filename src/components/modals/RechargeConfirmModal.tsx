import { COLORS } from '@/src/constants';
import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

interface RechargeConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: string;
  receivedAmount: string;
  operator: string;
}

export default function RechargeConfirmModal({
  visible,
  onClose,
  onConfirm,
  amount,
  receivedAmount,
  operator,
}: RechargeConfirmModalProps) {
  const amountNum = parseFloat(amount);
  const fees = Math.round(amountNum * 0.01);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalView}>
        <View style={styles.modalContent}>
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Confirmer la recharge</Text>
              <Text style={styles.subtitle}>Vérifiez les informations avant de continuer</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={scale(24)} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Montant principal */}
            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Montant à recharger</Text>
              <Text style={styles.amount}>{amountNum.toLocaleString()} GNF</Text>
            </View>

            {/* Message d'instruction important */}
            {operator === "Orange" && (
              <View style={styles.warningCard}>
                <Ionicons name="information-circle" size={scale(24)} color={COLORS.warning} />
                <View style={styles.warningTextContainer}>
                  <Text style={styles.warningTitle}>Action requise</Text>
                  <Text style={styles.warningText}>
                    Après validation, vous devrez confirmer ou demander à votre contact de confirmer le retrait depuis son compte {operator} Money pour finaliser la recharge.
                  </Text>
                </View>
              </View>
            )}

            {/* Source */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Source de recharge</Text>
              <View style={styles.card}>
                <View style={styles.row}>
                  <View style={styles.iconLabel}>
                    <Ionicons name="phone-portrait-outline" size={scale(20)} color={COLORS.primary} />
                    <Text style={styles.labelText}>Opérateur</Text>
                  </View>
                  <Text style={styles.valueText}>{operator}</Text>
                </View>
              </View>
            </View>

            {/* Détails de la transaction */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Détails de la transaction</Text>
              <View style={styles.card}>
                <View style={styles.row}>
                  <View style={styles.iconLabel}>
                    <Ionicons name="cash-outline" size={scale(20)} color={COLORS.textSecondary} />
                    <Text style={styles.labelText}>Montant envoyé</Text>
                  </View>
                  <Text style={styles.valueText}>{amountNum.toLocaleString()} GNF</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.row}>
                  <View style={styles.iconLabel}>
                    <Ionicons name="receipt-outline" size={scale(20)} color={COLORS.textSecondary} />
                    <Text style={styles.labelText}>Frais (1%)</Text>
                  </View>
                  <Text style={styles.valueTextFees}>{fees.toLocaleString()} GNF</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.row}>
                  <View style={styles.iconLabel}>
                    <Ionicons name="wallet-outline" size={scale(20)} color={COLORS.success} />
                    <Text style={styles.labelText}>Montant reçu</Text>
                  </View>
                  <Text style={styles.valueTextSuccess}>{receivedAmount} GNF</Text>
                </View>
              </View>
            </View>

            {/* Total */}
            <View style={styles.totalCard}>
              <Text style={styles.totalLabel}>Total à débiter</Text>
              <Text style={styles.totalValue}>{amountNum.toLocaleString()} GNF</Text>
            </View>

            {/* Boutons */}
            <View style={styles.buttonView}>
              <TouchableOpacity style={styles.backButton} onPress={onClose}>
                <Feather name="chevron-left" size={scale(20)} color={COLORS.textSecondary} />
                <Text style={styles.backText}>Retour</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                <Text style={styles.confirmText}>Confirmer</Text>
                <Feather name="arrow-right" size={scale(20)} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: COLORS.overlay,
  },
  modalContent: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: moderateScale(25),
    borderTopRightRadius: moderateScale(25),
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(30),
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
  amountContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: moderateScale(15),
    padding: scale(20),
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  amountLabel: {
    color: COLORS.white,
    fontSize: moderateScale(13),
    marginBottom: verticalScale(8),
    opacity: 0.9,
  },
  amount: {
    color: COLORS.white,
    fontSize: moderateScale(32),
    fontWeight: '700',
  },
  warningCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF4E5',
    borderRadius: moderateScale(12),
    padding: scale(15),
    gap: scale(12),
    marginBottom: verticalScale(15),
    borderLeftWidth: scale(4),
    borderLeftColor: COLORS.warning,
  },
  warningTextContainer: {
    flex: 1,
  },
  warningTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(4),
  },
  warningText: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
    lineHeight: moderateScale(18),
  },
  section: {
    marginBottom: verticalScale(15),
  },
  sectionTitle: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: verticalScale(10),
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: COLORS.background,
    borderRadius: moderateScale(12),
    padding: scale(15),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
  },
  iconLabel: {
    flexDirection: 'row',
    gap: scale(10),
    alignItems: 'center',
    flex: 1,
  },
  labelText: {
    color: COLORS.textSecondary,
    fontSize: moderateScale(14),
  },
  valueText: {
    fontWeight: '600',
    fontSize: moderateScale(14),
    color: COLORS.textPrimary,
    textAlign: 'right',
  },
  valueTextFees: {
    fontWeight: '600',
    fontSize: moderateScale(14),
    color: COLORS.error,
    textAlign: 'right',
  },
  valueTextSuccess: {
    fontWeight: '700',
    fontSize: moderateScale(14),
    color: COLORS.success,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: verticalScale(4),
  },
  totalCard: {
    backgroundColor: COLORS.primary,
    borderRadius: moderateScale(12),
    padding: scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  totalLabel: {
    fontWeight: '700',
    fontSize: moderateScale(16),
    color: COLORS.white,
  },
  totalValue: {
    fontWeight: '700',
    fontSize: moderateScale(20),
    color: COLORS.white,
  },
  buttonView: {
    flexDirection: 'row',
    gap: scale(12),
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(8),
    borderRadius: moderateScale(12),
    borderColor: COLORS.border,
    borderWidth: 2,
    paddingVertical: verticalScale(14),
    backgroundColor: COLORS.white,
    flex: 1,
  },
  backText: {
    color: COLORS.textSecondary,
    fontSize: moderateScale(15),
    fontWeight: '600',
  },
  confirmButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(8),
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(14),
    backgroundColor: COLORS.secondary,
    flex: 2,
  },
  confirmText: {
    color: COLORS.primary,
    fontSize: moderateScale(15),
    fontWeight: '700',
  },
});
