import { COLORS } from '@/src/constants';
import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

interface CreditReceiptModalProps {
  visible: boolean;
  onClose: () => void;
  phone: string;
  amount: string;
  fees: string;
  total: string;
  isSelfPurchase: boolean;
}

const RowItem: React.FC<{ label: string; value: string; icon?: string }> = ({
  label,
  value,
  icon,
}) => (
  <View style={styles.row}>
    <View style={styles.labelContainer}>
      {icon && <Ionicons name={icon as any} size={scale(18)} color={COLORS.textSecondary} />}
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default function CreditReceiptModal({
  visible,
  onClose,
  phone,
  amount,
  fees,
  total,
  isSelfPurchase,
}: CreditReceiptModalProps) {
  const date = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const transactionId = `CRD${Date.now().toString().slice(-8)}`;

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Reçu d'achat</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={scale(24)} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Status Icon */}
            <View style={styles.statusContainer}>
              <View style={styles.statusIcon}>
                <Ionicons name="checkmark-circle" size={scale(60)} color={COLORS.success} />
              </View>
              <Text style={styles.statusText}>Achat réussi</Text>
            </View>

            {/* Amount */}
            <View style={styles.amountContainer}>
              <Text style={styles.amount}>{amount} GNF</Text>
              <Text style={styles.amountLabel}>Crédit acheté</Text>
            </View>

            {/* Beneficiary Details Card */}
            <View style={styles.detailsCard}>
              <Text style={styles.sectionTitle}>Bénéficiaire</Text>

              <RowItem
                label="Type"
                value={isSelfPurchase ? 'Pour moi' : 'Pour un autre'}
                icon="person-outline"
              />
              {!isSelfPurchase && (
                <>
                  <View style={styles.divider} />
                  <RowItem label="Numéro" value={phone} icon="call-outline" />
                </>
              )}
            </View>

            {/* Transaction Details Card */}
            <View style={styles.detailsCard}>
              <Text style={styles.sectionTitle}>Détails de la transaction</Text>

              <RowItem label="Montant" value={`${amount} GNF`} icon="cash-outline" />
              <View style={styles.divider} />
              <RowItem label="Frais" value={`${fees} GNF`} icon="receipt-outline" />
              <View style={styles.divider} />
              <RowItem label="Total débité" value={`${total} GNF`} icon="card-outline" />
            </View>

            {/* Transaction Info Card */}
            <View style={styles.detailsCard}>
              <Text style={styles.sectionTitle}>Informations</Text>

              <RowItem label="Date" value={date} icon="calendar-outline" />
              <View style={styles.divider} />
              <RowItem label="ID Transaction" value={transactionId} icon="barcode-outline" />
            </View>

            {/* Actions */}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.buttonOutline}>
                <Feather name="copy" size={scale(20)} color={COLORS.primary} />
                <Text style={styles.buttonOutlineText}>Copier l'ID</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonPrimary}>
                <Feather name="share-2" size={scale(20)} color={COLORS.primary} />
                <Text style={styles.buttonPrimaryText}>Partager</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: moderateScale(20),
    fontWeight: '700',
  },
  closeButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: moderateScale(18),
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  statusIcon: {
    marginBottom: verticalScale(10),
  },
  statusText: {
    fontSize: moderateScale(16),
    color: COLORS.success,
    fontWeight: '600',
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: verticalScale(25),
  },
  amount: {
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  amountLabel: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    marginTop: verticalScale(8),
  },
  detailsCard: {
    backgroundColor: COLORS.background,
    borderRadius: moderateScale(15),
    padding: scale(15),
    marginBottom: verticalScale(15),
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: verticalScale(15),
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    flex: 1,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: moderateScale(14),
  },
  value: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'right',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
  },
  actions: {
    flexDirection: 'row',
    gap: scale(12),
    marginTop: verticalScale(10),
  },
  buttonOutline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    gap: scale(8),
    borderWidth: 2,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  buttonOutlineText: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: COLORS.primary,
  },
  buttonPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    gap: scale(8),
    backgroundColor: COLORS.secondary,
  },
  buttonPrimaryText: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: COLORS.primary,
  },
});
