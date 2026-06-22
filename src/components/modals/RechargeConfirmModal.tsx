import { COLORS } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <Ionicons name="wallet-outline" size={scale(40)} color={COLORS.primary} />
          </View>

          {/* Title */}
          <Text style={styles.title}>Confirmer la recharge</Text>
          <Text style={styles.subtitle}>Vérifiez les informations avant de continuer</Text>

          {/* Details */}
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Montant envoyé</Text>
              <Text style={styles.detailValue}>{parseFloat(amount).toLocaleString()} GNF</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Frais (1%)</Text>
              <Text style={styles.detailValueFees}>
                {(parseFloat(amount) * 0.01).toLocaleString()} GNF
              </Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Montant reçu</Text>
              <Text style={styles.detailValueSuccess}>{receivedAmount} GNF</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Source</Text>
              <Text style={styles.detailValue}>{operator}</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose} activeOpacity={0.7}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm} activeOpacity={0.7}>
              <Text style={styles.confirmButtonText}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.overlay,
  },
  container: {
    width: '85%',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(20),
    padding: scale(24),
    alignItems: 'center',
  },
  iconContainer: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    marginBottom: verticalScale(20),
    textAlign: 'center',
  },
  detailsCard: {
    width: '100%',
    backgroundColor: COLORS.background,
    borderRadius: moderateScale(12),
    padding: scale(16),
    marginBottom: verticalScale(20),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: verticalScale(4),
  },
  detailLabel: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  detailValueFees: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: COLORS.error,
  },
  detailValueSuccess: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.success,
  },
  actions: {
    flexDirection: 'row',
    width: '100%',
    gap: scale(12),
  },
  cancelButton: {
    flex: 1,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    backgroundColor: COLORS.background,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  cancelButtonText: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: COLORS.white,
  },
});
