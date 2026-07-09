import { COLORS } from '@/src/constants';
import { Feather, Ionicons } from '@expo/vector-icons';
import * as Sharing from "expo-sharing";
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Image, Linking, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
  amountReceived?: string; 
  exchangeRate?: string;
  // Type de transfert
  transferType?: string;
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
  transferType,
}) => {

  const vieWShotRef = useRef(null);

  const { t } = useTranslation();

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
  const handleContactSupport = () => {
        Linking.openURL('tel:+224621640000');
  };
  const handleCallSupport = () => {
    const supportNumber = '+224621640000'; 
    
    Alert.alert(
      t('support.contactSupport') || 'Contacter le support',
      t('support.callMessage', { number: supportNumber }) || `Appeler le ${supportNumber} pour obtenir de l'aide ?`,
      [
        {
          text: t('common.cancel') || 'Annuler',
          style: 'cancel',
        },
        {
          text: t('support.call') || 'Appeler',
          onPress: () => {
            Linking.openURL(`tel:${supportNumber}`).catch(() => {
              Alert.alert(
                t('support.error') || 'Erreur',
                t('support.cannotCall') || 'Impossible de passer l\'appel'
              );
            });
          },
        },
      ]
    );
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          
          <View style={styles.handleBar} />

          <View style={styles.header}>
            <Text style={styles.title}>
              {isInternational ? t('transfer.internationalTransfer') : t('transactions.details')}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={scale(24)} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <View ref={vieWShotRef} collapsable={false} style={{ backgroundColor: "white"}}>
              
              {/* Logo dans le reçu */}
              <View style={styles.logoContainer}>
                <Image 
                  source={require('@/assets/images/icon.png')} 
                  style={styles.logoReceipt}
                  resizeMode="contain"
                />
              </View>

              {/* Status Icon */}
              <View style={styles.statusContainer}>
                <Text style={styles.statusText}>{t('transactions.transactionSuccess')}</Text>
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
                <Text style={styles.sectionTitle}>{t('transactions.information')}</Text>
                
                <RowItem label="Type de transfert" value={transferType || ''} icon="swap-horizontal-outline" />
                {isInternational && country && (
                  <RowItem label={t('transfer.country')} value={country} icon="globe-outline" />
                )}
                <RowItem label={t('transfer.beneficiary')} value={name || "N/A"} icon="person-outline" />
                <RowItem label={t('transfer.number')} value={number || "N/A"} icon="call-outline" />
                <RowItem label={t('common.date')} value={date || "N/A"} icon="calendar-outline" />
                <RowItem label={t('transactions.transactionId')} value={transactionId || "N/A"} icon="receipt-outline" />
                {isInternational && exchangeRate && (
                  <RowItem label={t('transfer.exchangeRate')} value={exchangeRate} icon="swap-horizontal-outline" />
                )}
                <RowItem label={t('transactions.fees')} value={fees + " GNF" || "0 GNF"} icon="cash-outline" />
                {note && <RowItem label={t('transactions.note')} value={note} icon="document-text-outline" />}
              </View>

              {/* Bouton d'aide */}
            </View>
          </ScrollView>

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
  logoContainer: {
    alignItems: 'center',
    justifyContent: "center",
    marginTop: verticalScale(20),
    borderRadius: moderateScale(40)

  },
  logoReceipt: {
    width: scale(80),
    height: scale(80),
    marginBottom: verticalScale(8),
    borderRadius: moderateScale(15)
  },
  appName: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.5,
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
  buttonSupport: {
    flex: 1.5,
    flexDirection: "row",
    alignItems: "center",
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
  helpButton: {
    backgroundColor: COLORS.background,
    borderRadius: moderateScale(12),
    padding: scale(15),
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
    borderWidth: 1,
    borderColor: COLORS.primary + '30', // Transparence de 30%
  },
  helpContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
  },
  helpTextContainer: {
    flex: 1,
  },
  helpTitle: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(2),
  },
  helpSubtitle: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
  },
});
