import { COLORS } from '@/src/constants';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as Sharing from "expo-sharing";
import React, { useRef } from 'react';
import { Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { captureRef } from "react-native-view-shot";

interface DetailTransactionProps {
  visible: boolean;
  onClose: () => void;
  amount: string;
  status: string;
  name: string;
  date: string;
  transactionId: string;
  fees: string;
  number: string;
  note?: string;
  // Props pour transfert international
  isInternational?: boolean;
  country?: string;
  amountReceived?: string; // Montant en XOF ou autre devise
  exchangeRate?: string;
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

const DetailTransaction: React.FC<DetailTransactionProps> = ({
  visible,
  onClose,
  amount,
  status,
  name,
  date,
  transactionId,
  fees,
  number,
  note,
  isInternational = false,
  country,
  amountReceived,
  exchangeRate,
}) => {

  const vieWShotRef = useRef(null);

  const captureAndShare = async () => {
    try {
      const uri = await captureRef(vieWShotRef, {
        format: "png",
        quality: 1,
      });
      if (uri) {
        await Sharing.shareAsync(uri);
      }
    } catch (error) {
      console.log("Erreur partage :", error);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {isInternational ? 'Transfert International' : 'Détails de la transaction'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={scale(24)} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View ref={vieWShotRef} collapsable={false} style={{ backgroundColor: "white"}}>
              {/* Status Icon */}
              <View style={styles.statusContainer}>
                <View style={styles.statusIcon}>
                  <Ionicons name="checkmark-circle" size={scale(60)} color={COLORS.success} />
                </View>
                <Text style={styles.statusText}>Transaction réussie</Text>
              </View>

              {/* Amount */}
              <View style={styles.amountContainer}>
                <Text style={styles.amount}>{amount || "0"} GNF</Text>
                {isInternational && amountReceived && (
                  <Text style={styles.amountReceived}>≈ {amountReceived}</Text>
                )}
              </View>

              {/* Transaction Details Card */}
              <View style={styles.detailsCard}>
                <Text style={styles.sectionTitle}>Informations</Text>
                
                {isInternational && country && (
                  <RowItem label="Pays" value={country} icon="globe-outline" />
                )}
                <RowItem label="Bénéficiaire" value={name || "N/A"} icon="person-outline" />
                <RowItem label="Numéro" value={number || "N/A"} icon="call-outline" />
                <RowItem label="Date" value={date || "N/A"} icon="calendar-outline" />
                <RowItem label="ID Transaction" value={transactionId || "N/A"} icon="receipt-outline" />
                {isInternational && exchangeRate && (
                  <RowItem label="Taux de change" value={exchangeRate} icon="swap-horizontal-outline" />
                )}
                <RowItem label="Frais" value={fees + " GNF" || "0 GNF"} icon="cash-outline" />
                {note && <RowItem label="Note" value={note} icon="document-text-outline" />}
              </View>
            </View>
          </ScrollView>
          {/* Actions EN DEHORS de la capture */}
          <View style={styles.actions}>
              <TouchableOpacity style={styles.buttonOutline}>
                <Feather name="copy" size={scale(20)} color={COLORS.primary} />
                <Text style={styles.buttonOutlineText}>Copier l'ID</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.buttonPrimary} onPress={captureAndShare}>
                <Feather name="share-2" size={scale(20)} color={COLORS.primary} />
                <Text style={styles.buttonPrimaryText}>Partager</Text>
              </TouchableOpacity>
            </View>
          
        </View>
      </View>
    </Modal>
  );
};

export default DetailTransaction;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end", 
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: moderateScale(20),
    fontWeight: "700",
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
    fontWeight: "bold",
    color: COLORS.textPrimary,
  },
  amountReceived: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: COLORS.textSecondary,
    marginTop: verticalScale(8),
  },
  detailsCard: {
    backgroundColor: COLORS.background,
    borderRadius: moderateScale(15),
    padding: scale(15),
    marginBottom: verticalScale(20),
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
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
    fontWeight: "600",
    color: COLORS.textPrimary,
    textAlign: 'right',
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    gap: scale(12),
    marginTop: verticalScale(10),
    marginBottom: Platform.OS === "ios" ? verticalScale(20) : verticalScale(0)
  },
  buttonOutline: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
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
