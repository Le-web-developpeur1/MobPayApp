import { COLORS } from '@/src/constants';
import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import PurchaseCodeModal from './PurchaseCodeModal';

interface PurchaseConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  productType: 'esim' | 'giftcard';
  productName: string;
  country: string;
  beneficiary: {
    name: string;
    email: string;
  };
  purchase: {
    amount: string;
    amountGnf: string;
  };
}

export function PurchaseConfirmModal({
  visible,
  onClose,
  productType,
  productName,
  country,
  beneficiary,
  purchase,
}: PurchaseConfirmModalProps) {
  const [showCodeModal, setShowCodeModal] = useState(false);

  const handleConfirm = () => {
    onClose();
    setTimeout(() => setShowCodeModal(true), 300);
  };

  const handleCodeModalClose = () => {
    setShowCodeModal(false);
  };

  const productLabel = productType === 'esim' ? 'eSim' : 'Gift Card';

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
                <Text style={styles.amountLabel}>Montant à payer</Text>
                <Text style={styles.amount}>{purchase.amountGnf} GNF</Text>
                <Text style={styles.amountEuro}>{purchase.amount}</Text>
              </View>

              {/* Produit */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Produit</Text>
                <View style={styles.card}>
                  <View style={styles.row}>
                    <View style={styles.iconLabel}>
                      <Ionicons name="card-outline" size={scale(20)} color={COLORS.primary} />
                      <Text style={styles.labelText}>Type</Text>
                    </View>
                    <Text style={styles.valueText}>{productLabel}</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.row}>
                    <View style={styles.iconLabel}>
                      <Ionicons name="pricetag-outline" size={scale(20)} color={COLORS.primary} />
                      <Text style={styles.labelText}>Service</Text>
                    </View>
                    <Text style={styles.valueText}>{productName}</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.row}>
                    <View style={styles.iconLabel}>
                      <Ionicons name="globe-outline" size={scale(20)} color={COLORS.primary} />
                      <Text style={styles.labelText}>Pays</Text>
                    </View>
                    <Text style={styles.valueText}>{country}</Text>
                  </View>
                </View>
              </View>

              {/* Bénéficiaire */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Bénéficiaire</Text>
                <View style={styles.card}>
                  <View style={styles.row}>
                    <View style={styles.iconLabel}>
                      <Ionicons name="person-outline" size={scale(20)} color={COLORS.primary} />
                      <Text style={styles.labelText}>Nom</Text>
                    </View>
                    <Text style={styles.valueText}>{beneficiary.name}</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.row}>
                    <View style={styles.iconLabel}>
                      <Ionicons name="mail-outline" size={scale(20)} color={COLORS.primary} />
                      <Text style={styles.labelText}>Email</Text>
                    </View>
                    <Text style={styles.valueText}>{beneficiary.email}</Text>
                  </View>
                </View>
              </View>

              {/* Avertissement */}
              <View style={styles.warningCard}>
                <Ionicons name="warning-outline" size={scale(20)} color="#856404" />
                <Text style={styles.warningText}>
                  Achat non remboursable et utilisable uniquement pour {country}
                </Text>
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

      <PurchaseCodeModal
        visible={showCodeModal}
        onClose={handleCodeModalClose}
        productType={productType}
        productName={productName}
        country={country}
        beneficiary={beneficiary}
        purchase={purchase}
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
  amountEuro: {
    color: COLORS.secondary,
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginTop: verticalScale(4),
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
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    backgroundColor: '#FFF3CD',
    borderWidth: 1,
    borderColor: '#FFE69C',
    borderRadius: moderateScale(12),
    padding: scale(15),
    marginBottom: verticalScale(20),
  },
  warningText: {
    flex: 1,
    fontSize: moderateScale(12),
    color: '#856404',
    lineHeight: moderateScale(18),
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
