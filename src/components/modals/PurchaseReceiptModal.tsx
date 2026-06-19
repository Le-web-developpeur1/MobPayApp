import { COLORS } from '@/src/constants';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as Sharing from "expo-sharing";
import React, { useRef } from 'react';
import { Image, Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { captureRef } from "react-native-view-shot";

interface PurchaseReceiptModalProps {
  visible: boolean;
  onClose: () => void;
  productType: 'esim' | 'giftcard';
  productName: string;
  country?: string;
  typeEsim?: string;
  beneficiary: {
    name: string;
    email: string;
  };
  purchase: {
    amount: string;
    amountGnf: string;
  };
}

const RowItem: React.FC<{ label: string; value: string; icon?: string }> = ({ label, value, icon }) => (
  <View style={styles.row}>
    <View style={styles.labelContainer}>
      {icon && <Ionicons name={icon as any} size={scale(18)} color={COLORS.textSecondary} />}
      <Text style={styles.label}>{label}</Text>
    </View>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default function PurchaseReceiptModal({
  visible,
  onClose,
  productType,
  productName,
  country,
  typeEsim,
  beneficiary,
  purchase,
}: PurchaseReceiptModalProps) {
  const productLabel = productType === 'esim' ? 'eSim' : 'Gift Card';
  const date = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const transactionId = `PUR${Date.now().toString().slice(-8)}`;
  
  // Déterminer le texte à afficher pour le pays/zone
  const getLocationText = () => {
    if (typeEsim === 'Global') return 'Monde entier';
    if (typeEsim === 'Europe') return 'Europe';
    return country || '';
  };
  
  const locationText = getLocationText();
  const showLocation = !!locationText;

  const viewShotRef = useRef(null);

  const captureAndShare = async () => {
    try {
      const uri = await captureRef(viewShotRef, {
        format: 'png',
        quality: 1,
      });
      if (uri) {
        await Sharing.shareAsync(uri);
      }
    } catch (error) {
      console.log('Erreur partage :', error);
    }
  };

  const handleContactSupport = () => {
    Linking.openURL('tel:+224621640000');
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('@/assets/images/icon.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Reçu d'achat</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={scale(24)} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View ref={viewShotRef} collapsable={false} style={{ backgroundColor: 'white' }}>
              {/* Status Icon */}
              <View style={styles.statusContainer}>
                <View style={styles.statusIcon}>
                  <Ionicons name="checkmark-circle" size={scale(60)} color={COLORS.success} />
                </View>
                <Text style={styles.statusText}>Achat réussi</Text>
              </View>

              {/* Amount */}
              <View style={styles.amountContainer}>
                <Text style={styles.amount}>{purchase.amountGnf} GNF</Text>
                <Text style={styles.amountEuro}>{purchase.amount}</Text>
              </View>

              {/* Product Details Card */}
              <View style={styles.detailsCard}>
                <Text style={styles.sectionTitle}>Détails du produit</Text>

                <RowItem label="Type" value={productLabel} icon="card-outline" />
                <RowItem label="Service" value={productName} icon="pricetag-outline" />
                {showLocation && <RowItem label="Zone" value={locationText} icon="globe-outline" />}
              </View>

              {/* Beneficiary Details Card */}
              <View style={styles.detailsCard}>
                <Text style={styles.sectionTitle}>Bénéficiaire</Text>

                <RowItem label="Nom" value={beneficiary.name} icon="person-outline" />
                <RowItem label="Email" value={beneficiary.email} icon="mail-outline" />
              </View>

              {/* Transaction Details Card */}
              <View style={styles.detailsCard}>
                <Text style={styles.sectionTitle}>Transaction</Text>

                <RowItem label="Date" value={date} icon="calendar-outline" />
                <RowItem label="ID Transaction" value={transactionId} icon="receipt-outline" />
              </View>
            </View>
          </ScrollView>

          {/* Actions EN DEHORS de la capture */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.buttonSupport} onPress={handleContactSupport}>
              <Ionicons name="call-outline" size={scale(20)} color={COLORS.white} />
              <Text style={styles.buttonSupportText}>Contacter le support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOutline} onPress={captureAndShare}>
              <Feather name="share-2" size={scale(20)} color={COLORS.primary} />
              <Text style={styles.buttonOutlineText}>Partager</Text>
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
    justifyContent: 'flex-end',
    backgroundColor: COLORS.overlay,
  },
  container: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: moderateScale(25),
    borderTopRightRadius: moderateScale(25),
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(10),
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
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: scale(60),
    height: scale(60),
    marginBottom: verticalScale(8),
  },
  appName: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.5,
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
    marginBottom: verticalScale(8),
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
    marginBottom: verticalScale(15),
  },
  amount: {
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  amountEuro: {
    fontSize: moderateScale(18),
    fontWeight: '600',
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
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    minHeight: verticalScale(40), // Hauteur minimum
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    flex: 1,
    flexShrink: 1, // Permet de réduire
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: moderateScale(14),
    flexShrink: 1, // Permet le retour à la ligne
  },
  value: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'right',
    flex: 1,
    flexShrink: 1, // Permet le retour à la ligne
    flexWrap: 'wrap', // Permet le retour à la ligne
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
  buttonSupport: {
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
    gap: scale(8),
    backgroundColor: COLORS.primary,
  },
  buttonSupportText: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: COLORS.white,
  },
});
