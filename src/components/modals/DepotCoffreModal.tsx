import React, {useState} from "react";
import { Ionicons } from "@expo/vector-icons";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { scale, moderateScale, verticalScale } from "react-native-size-matters";
import { overlay } from "react-native-paper";
import { COLORS } from "@/src/constants";

interface DepotCoffreModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: (amount: string) => void;
};

const QUICK_AMOUNTS = [10000, 50000, 100000, 200000, 500000, 1000000];

export default function DepotCoffreModal({ visible, onClose, onConfirm}: DepotCoffreModalProps) {

    const [amount, setAmount]  = useState("");

    const handleConfirm = () => {
        if (amount && parseFloat(amount) > 0) {
            onConfirm(amount);
            setAmount("");
        }
    };

    const isValid = amount && parseFloat(amount) > 0;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
          <View style={styles.overlay}>
            <View style={styles.modal}>
                {/** Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>Déposer dans le coffre</Text>
                        <Text style={styles.subtitle}>Entrez le montant à déposer</Text>
                    </View>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close" size={scale(24)} color={COLORS.textPrimary}/>
                    </TouchableOpacity>
                </View>

                {/** Amount Input*/}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Montant</Text>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            placeholder="0"
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                            placeholderTextColor={COLORS.textSecondary}
                        />
                        <Text style={styles.currency}>GNF</Text>
                    </View>
                </View>

                {/** Quick Amounts */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Montants rapides</Text>
                    <View style={styles.amountGrid}>
                        {QUICK_AMOUNTS.map((amt, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.amountCard,
                                    amount === String(amt) && styles.amountCardSelected
                                ]}
                                onPress={() => setAmount(String(amt))}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.amountText,
                                        amount === String(amt) && styles.amountTextSelected
                                    ]}
                                >
                                    {amt.toLocaleString()}
                                </Text>

                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/** Buttons */}
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={onClose}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.cancelText}>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                          styles.confirmButton,
                          !isValid && styles.confirmButtonDisabled
                        ]}
                        disabled={!isValid}
                        onPress={handleConfirm}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.confirmText}>Déposer</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: "center",
    },
    modal: {
      flex: 1,
      backgroundColor: COLORS.white,
      borderTopRightRadius: moderateScale(20),
      borderTopLeftRadius: moderateScale(20),
      padding: scale(20),
      width: "100%",
      maxWidth: scale(400),
      marginTop: verticalScale(150),
    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
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
  section: {
    marginBottom: verticalScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(12),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(15),
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    fontSize: moderateScale(32),
    fontWeight: '700',
    color: COLORS.textPrimary,
    paddingVertical: verticalScale(16),
  },
  currency: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(10),
  },
  amountCard: {
    width: '31%',
    backgroundColor: COLORS.white,
    borderWidth: scale(2),
    borderColor: COLORS.border,
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountCardSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.secondary,
  },
  amountText: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  amountTextSelected: {
    color: COLORS.white,
  },
  buttons: {
    flexDirection: 'row',
    gap: scale(12),
    marginTop: verticalScale(10),
  },
  cancelButton: {
    flex: 1,
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(12),
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  confirmButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(8),
  },
  confirmButtonDisabled: {
    backgroundColor: COLORS.border,
    opacity: 0.5,
  },
  confirmText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.white,
  },
});