import { COLORS, ROUTES } from "@/src/constants";
import { ConfirmModalProps, RootStackParamList } from "@/src/navigation/types";
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import CodeModal from "./CodeModal";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function ConfirmModal({ visible, onClose, beneficiaire, transaction, isInternational, country, amountReceived, exchangeRate, transactionType = 'cashmoov' }: ConfirmModalProps) {
  const navigation = useNavigation<NavigationProp>();
  const [show, setShow] = useState(false);

  const handleConfirm = () => {
    onClose(); // Ferme ConfirmModal d'abord
    setTimeout(() => setShow(true), 300); // Ouvre CodeModal après l'animation
  };

  const handleCodeModalClose = () => {
    setShow(false);
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
                <Text style={styles.title}>
                  {isInternational ? 'Transfert International' : 'Confirmer le transfert'}
                </Text>
                <Text style={styles.subtitle}>Vérifiez les informations avant d'envoyer</Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={scale(24)} color={COLORS.textPrimary}/>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Montant principal */}
              <View style={styles.amountContainer}>
                <Text style={styles.amountLabel}>Montant à envoyer</Text>
                <Text style={styles.amount}>{transaction.montant} GNF</Text>
                {isInternational && amountReceived && (
                  <Text style={styles.amountReceived}>≈ {amountReceived}</Text>
                )}
              </View>

              {/* Bénéficiaire */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Bénéficiaire</Text>
                <View style={styles.card}>
                  {isInternational && country && (
                    <>
                      <View style={styles.row}>
                        <View style={styles.iconLabel}>
                          <Ionicons name="globe-outline" size={scale(20)} color={COLORS.primary}/>
                          <Text style={styles.labelText}>Pays</Text>
                        </View>
                        <Text style={styles.valueText}>{country}</Text>
                      </View>
                      <View style={styles.divider} />
                    </>
                  )}
                  <View style={styles.row}>
                    <View style={styles.iconLabel}>
                      <Ionicons name="person-outline" size={scale(20)} color={COLORS.primary}/>
                      <Text style={styles.labelText}>Nom complet</Text>
                    </View>
                    <Text style={styles.valueText}>{beneficiaire.name}</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.row}>
                    <View style={styles.iconLabel}>
                      <Ionicons name="call-outline" size={scale(20)} color={COLORS.primary}/>
                      <Text style={styles.labelText}>Numéro</Text>
                    </View>
                    <Text style={styles.valueText}>{beneficiaire.phone}</Text>
                  </View>
                </View>
              </View>

              {/* Détails de la transaction */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Détails de la transaction</Text>
                <View style={styles.card}>
                  {isInternational && exchangeRate && (
                    <>
                      <View style={styles.row}>
                        <View style={styles.iconLabel}>
                          <Ionicons name="swap-horizontal-outline" size={scale(20)} color={COLORS.textSecondary}/>
                          <Text style={styles.labelText}>Taux de change</Text>
                        </View>
                        <Text style={styles.valueText}>{exchangeRate}</Text>
                      </View>
                      <View style={styles.divider} />
                    </>
                  )}
                  <View style={styles.row}>
                    <View style={styles.iconLabel}>
                      <Ionicons name="cash-outline" size={scale(20)} color={COLORS.textSecondary}/>
                      <Text style={styles.labelText}>Frais de transfert</Text>
                    </View>
                    <Text style={styles.valueText}>{transaction.frais} GNF</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.row}>
                    <View style={styles.iconLabel}>
                      <Ionicons name="receipt-outline" size={scale(20)} color={COLORS.textSecondary}/>
                      <Text style={styles.labelText}>Taxe</Text>
                    </View>
                    <Text style={styles.valueText}>{transaction.taxe}</Text>
                  </View>
                </View>
              </View>

              {/* Total */}
              <View style={styles.totalCard}>
                <Text style={styles.totalLabel}>Total à débiter</Text>
                <Text style={styles.totalValue}>{transaction.total} GNF</Text>
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
        visible={show}
        onClose={handleCodeModalClose}
        onSuccess={() => {
          setShow(false);
          navigation.navigate(ROUTES.MAIN);
        }}
        amount={transaction.montant}
        status={"Envoi réussi"}
        name={beneficiaire.name}
        date={"21/05/2026"}
        transactionId={"256985"}
        fees={transaction.frais}
        number={beneficiaire.phone}
        isInternational={isInternational}
        country={country}
        amountReceived={amountReceived}
        exchangeRate={exchangeRate}
        transactionType={transactionType}
      />
    </>
  );
}

export function Confirm() {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.openButton}>
        <Text style={{ color: COLORS.white, fontWeight: "bold" }}>Ouvrir Modal</Text>
      </TouchableOpacity>
      <ConfirmModal
        visible={visible}
        onClose={() => setVisible(false)}
        beneficiaire={{ name: "Boubacar Bah", phone: "626 05 80 33" }}
        transaction={{ montant: "500 000", frais: "5 000", taxe: "0.00", total: "505 000" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  openButton: {
    backgroundColor: COLORS.primary,
    padding: scale(12),
    borderRadius: moderateScale(8),
  },
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
  amountReceived: {
    color: COLORS.white,
    fontSize: moderateScale(18),
    fontWeight: '600',
    marginTop: verticalScale(8),
    opacity: 0.9,
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
    flex: 1,
  },
  labelText: { 
    color: COLORS.textSecondary, 
    fontSize: moderateScale(14),
  },
  valueText: { 
    fontWeight: "600", 
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
    fontWeight: "700", 
    fontSize: moderateScale(16), 
    color: COLORS.white,
  },
  totalValue: { 
    fontWeight: "700", 
    fontSize: moderateScale(20), 
    color: COLORS.white,
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
