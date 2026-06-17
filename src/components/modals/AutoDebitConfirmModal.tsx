import { COLORS } from "@/src/constants";
import { Feather, Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import CodeModal from "./CodeModal";

export interface AutoDebitData {
  frequency: string;
  amount: string;
  startDate: Date | null;
  endDate: Date | null;
  motif: string;
}

interface AutoDebitConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  data: AutoDebitData;
  onSuccess: (data: AutoDebitData) => void;
}

export function AutoDebitConfirmModal({ visible, onClose, data, onSuccess }: AutoDebitConfirmModalProps) {
  const [showCodeModal, setShowCodeModal] = useState(false);

  const getFrequencyLabel = (freq: string) => {
    switch (freq) {
      case "day": return "Quotidien";
      case "week": return "Hebdomadaire";
      case "month": return "Mensuel";
      default: return freq;
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Non défini";
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const handleConfirm = () => {
    onClose();
    setTimeout(() => setShowCodeModal(true), 300);
  };

  const handleCodeSuccess = () => {
    console.log('✅ Code validé, appel de onSuccess avec data:', data); // Debug
    setShowCodeModal(false);
    onSuccess(data);
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
                <Text style={styles.title}>Confirmer le débit automatique</Text>
                <Text style={styles.subtitle}>Vérifiez les informations avant de valider</Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={scale(24)} color={COLORS.textPrimary}/>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Montant principal */}
              <View style={styles.amountContainer}>
                <Text style={styles.amountLabel}>Montant à débiter</Text>
                <Text style={styles.amount}>{data.amount} GNF</Text>
              </View>

              {/* Détails du débit automatique */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>CONFIGURATION</Text>
                <View style={styles.card}>
                  <View style={styles.row}>
                    <View style={styles.iconLabel}>
                      <Ionicons name="repeat-outline" size={scale(20)} color={COLORS.primary}/>
                      <Text style={styles.labelText}>Fréquence</Text>
                    </View>
                    <Text style={styles.valueText}>{getFrequencyLabel(data.frequency)}</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.row}>
                    <View style={styles.iconLabel}>
                      <Ionicons name="calendar-outline" size={scale(20)} color={COLORS.primary}/>
                      <Text style={styles.labelText}>Date début</Text>
                    </View>
                    <Text style={styles.valueText}>{formatDate(data.startDate)}</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.row}>
                    <View style={styles.iconLabel}>
                      <Ionicons name="calendar-outline" size={scale(20)} color={COLORS.primary}/>
                      <Text style={styles.labelText}>Date fin</Text>
                    </View>
                    <Text style={styles.valueText}>{formatDate(data.endDate)}</Text>
                  </View>
                  {data.motif ? (
                    <>
                      <View style={styles.divider} />
                      <View style={styles.row}>
                        <View style={styles.iconLabel}>
                          <Ionicons name="document-text-outline" size={scale(20)} color={COLORS.primary}/>
                          <Text style={styles.labelText}>Motif</Text>
                        </View>
                        <Text style={[styles.valueText, { flex: 1, textAlign: 'right' }]} numberOfLines={2}>
                          {data.motif}
                        </Text>
                      </View>
                    </>
                  ) : null}
                </View>
              </View>

              {/* Information */}
              <View style={styles.infoCard}>
                <Ionicons name="information-circle-outline" size={scale(20)} color={COLORS.primary}/>
                <Text style={styles.infoText}>
                  Le débit automatique sera exécuté selon la fréquence choisie jusqu'à la date de fin.
                </Text>
              </View>

              {/* Boutons */}
              <View style={styles.buttonView}>
                <TouchableOpacity style={styles.backButton} onPress={onClose}>
                  <Feather name="chevron-left" size={scale(20)} color={COLORS.textSecondary}/>
                  <Text style={styles.backText}>Retour</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.confirmButton}
                  onPress={handleConfirm}
                >
                  <Text style={styles.confirmText}>Confirmer</Text>
                  <Feather name="arrow-right" size={scale(20)} color={COLORS.primary}/>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
      
      <CodeModal
        visible={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        onSuccess={handleCodeSuccess}
        amount={data.amount}
        status="Débit automatique programmé"
        name="Débit automatique"
        date={new Date().toLocaleDateString('fr-FR')}
        transactionId={Math.random().toString(36).substring(2, 8).toUpperCase()}
        fees="0"
        number=""
        note={`Débit ${getFrequencyLabel(data.frequency).toLowerCase()} - ${data.motif || 'Aucun motif'}`}
        transactionType="cashmoov"
      />
    </>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: COLORS.overlay,
  },
  modalContent: {
    width: "100%",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: verticalScale(20),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: "700",
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
    alignItems: "center",
    justifyContent: "center",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: verticalScale(8),
  },
  iconLabel: { 
    flexDirection: "row", 
    gap: scale(10), 
    alignItems: "center",
  },
  labelText: { 
    color: COLORS.textSecondary, 
    fontSize: moderateScale(14),
  },
  valueText: { 
    fontWeight: "600", 
    fontSize: moderateScale(14), 
    color: COLORS.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: verticalScale(4),
  },
  infoCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: moderateScale(12),
    padding: scale(15),
    flexDirection: 'row',
    gap: scale(12),
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  infoText: {
    flex: 1,
    color: COLORS.primary,
    fontSize: moderateScale(13),
    lineHeight: moderateScale(18),
  },
  buttonView: {
    flexDirection: "row",
    gap: scale(12),
  },
  backButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    fontWeight: "600",
  },
  confirmButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(8),
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(14),
    backgroundColor: COLORS.secondary,
    flex: 2,
  },
  confirmText: { 
    color: COLORS.primary, 
    fontSize: moderateScale(15), 
    fontWeight: "700",
  },
});
