import { COLORS } from '@/src/constants';
import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import CreditCodeModal from './CreditCodeModal';
import { useTranslation } from 'react-i18next';

interface CreditConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  phone: string;
  amount: string;
  isSelfPurchase: boolean;
}

export function CreditConfirmModal({
  visible,
  onClose,
  phone,
  amount,
  isSelfPurchase,
}: CreditConfirmModalProps) {
  const { t } = useTranslation();
  const [showCodeModal, setShowCodeModal] = useState(false);

  // Calcul des frais (exemple: 2% du montant)
  const amountNum = parseFloat(amount.replace(/\s/g, ''));
  const fees = Math.round(amountNum * 0.02);
  const total = amountNum + fees;

  const handleConfirm = () => {
    onClose();
    setTimeout(() => setShowCodeModal(true), 300);
  };

  const handleCodeModalClose = () => {
    setShowCodeModal(false);
  };

  return (
    <>
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            {/* Handle bar */}
            <View style={styles.handleBar} />

            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>Confirmer l'achat</Text>
                <Text style={styles.subtitle}>Vérifiez les informations avant de valider</Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={scale(24)} color={COLORS.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Montant principal */}
              <View style={styles.amountContainer}>
                <Text style={styles.amountLabel}>Montant de crédit</Text>
                <Text style={styles.amount}>{amount} GNF</Text>
              </View>

              {/* Bénéficiaire */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Bénéficiaire</Text>
                <View style={styles.card}>
                  <View style={styles.row}>
                    <View style={styles.iconLabel}>
                      <Ionicons name="person-outline" size={scale(20)} color={COLORS.primary} />
                      <Text style={styles.labelText}>Type</Text>
                    </View>
                    <Text style={styles.valueText}>
                      {isSelfPurchase ? 'Pour moi' : 'Pour un autre'}
                    </Text>
                  </View>
                  {!isSelfPurchase && (
                    <>
                      <View style={styles.divider} />
                      <View style={styles.row}>
                        <View style={styles.iconLabel}>
                          <Ionicons name="call-outline" size={scale(20)} color={COLORS.primary} />
                          <Text style={styles.labelText}>Numéro</Text>
                        </View>
                        <Text style={styles.valueText}>{phone}</Text>
                      </View>
                    </>
                  )}
                </View>
              </View>

              {/* Détails de la transaction */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Détails de la transaction</Text>
                <View style={styles.card}>
                  <View style={styles.row}>
                    <View style={styles.iconLabel}>
                      <Ionicons name="cash-outline" size={scale(20)} color={COLORS.textSecondary} />
                      <Text style={styles.labelText}>Montant</Text>
                    </View>
                    <Text style={styles.valueText}>{amount} GNF</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.row}>
                    <View style={styles.iconLabel}>
                      <Ionicons name="receipt-outline" size={scale(20)} color={COLORS.textSecondary} />
                      <Text style={styles.labelText}>Frais</Text>
                    </View>
                    <Text style={styles.valueText}>{fees.toLocaleString()} GNF</Text>
                  </View>
                </View>
              </View>

              {/* Total */}
              <View style={styles.totalCard}>
                <Text style={styles.totalLabel}>Total à débiter</Text>
                <Text style={styles.totalValue}>{total.toLocaleString()} GNF</Text>
              </View>

              {/* Boutons */}
              <View style={styles.buttonView}>
                <TouchableOpacity style={styles.backButton} onPress={onClose}>
                  <Feather name="chevron-left" size={scale(20)} color={COLORS.textSecondary} />
                  <Text style={styles.backText}>Retour</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                  <Text style={styles.confirmText}>Confirmer</Text>
                  <Feather name="arrow-right" size={scale(20)} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <CreditCodeModal
        visible={showCodeModal}
        onClose={handleCodeModalClose}
        phone={phone}
        amount={amount}
        fees={fees.toLocaleString()}
        total={total.toLocaleString()}
        isSelfPurchase={isSelfPurchase}
      />
    </>
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
    marginBottom: verticalScale(20),
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
