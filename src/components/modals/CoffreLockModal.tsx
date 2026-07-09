import { COLORS } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

interface CoffreLockModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (unlockDate: Date) => void;
}

export default function CoffreLockModal({
  visible,
  onClose,
  onConfirm,
}: CoffreLockModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1); // Au moins demain

  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleConfirm = () => {
    if (selectedDate > new Date()) {
      onConfirm(selectedDate);
      onClose();
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const isDateValid = selectedDate > new Date();

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Verrouiller le coffre</Text>
              <Text style={styles.subtitle}>Choisissez la date de déverrouillage</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={scale(24)} color={COLORS.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={scale(24)} color={COLORS.warning} />
            <Text style={styles.infoText}>
              Votre coffre sera verrouillé jusqu'à la date choisie. Si vous voulez déverrouiller votre coffre pendant cette période, vous serez facturé des frais allant jusqu'à 1% du montant.
            </Text>
          </View>

          {/* Date Selection */}
          <View style={styles.dateSection}>
            <Text style={styles.sectionTitle}>Date de déverrouillage</Text>
            
            {Platform.OS === 'android' && (
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons name="calendar-outline" size={scale(22)} color={COLORS.primary} />
                <Text style={styles.dateButtonText}>{formatDate(selectedDate)}</Text>
                <Ionicons name="chevron-down" size={scale(20)} color={COLORS.textSecondary} />
              </TouchableOpacity>
            )}

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                minimumDate={minDate}
                textColor={COLORS.textPrimary}
                locale="fr-FR"
              />
            )}
          </View>

          {/* Selected Date Display */}
          <View style={styles.selectedDateCard}>
            <View style={styles.lockIconContainer}>
              <Ionicons name="lock-closed" size={scale(28)} color={COLORS.primary} />
            </View>
            <View style={styles.selectedDateInfo}>
              <Text style={styles.selectedDateLabel}>Le coffre sera déverrouillé le</Text>
              <Text style={styles.selectedDateValue}>{formatDate(selectedDate)}</Text>
            </View>
          </View>

          {/* Warning if date is not valid */}
          {!isDateValid && (
            <View style={styles.warningCard}>
              <Ionicons name="alert-circle" size={scale(20)} color={COLORS.error} />
              <Text style={styles.warningText}>
                La date de déverrouillage doit être supérieure à aujourd'hui
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                !isDateValid && styles.confirmButtonDisabled
              ]}
              onPress={handleConfirm}
              disabled={!isDateValid}
            >
              <Ionicons name="lock-closed" size={scale(20)} color={COLORS.white} />
              <Text style={styles.confirmText}>Verrouiller</Text>
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
    paddingBottom: verticalScale(30),
    maxHeight: '80%',
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
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF4E5',
    padding: scale(15),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(20),
    gap: scale(12),
    borderLeftWidth: scale(4),
    borderLeftColor: COLORS.warning,
  },
  infoText: {
    flex: 1,
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    lineHeight: moderateScale(18),
  },
  dateSection: {
    marginBottom: verticalScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(12),
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: scale(16),
    borderRadius: moderateScale(12),
    borderWidth: 2,
    borderColor: COLORS.border,
    gap: scale(12),
  },
  dateButtonText: {
    flex: 1,
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  selectedDateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    padding: scale(16),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(15),
    gap: scale(12),
  },
  lockIconContainer: {
    width: scale(56),
    height: scale(56),
    borderRadius: moderateScale(16),
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateInfo: {
    flex: 1,
  },
  selectedDateLabel: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    marginBottom: verticalScale(4),
  },
  selectedDateValue: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.primary,
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.errorLight,
    padding: scale(12),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(15),
    gap: scale(10),
  },
  warningText: {
    flex: 1,
    fontSize: moderateScale(12),
    color: COLORS.error,
    fontWeight: '600',
  },
  buttonView: {
    flexDirection: 'row',
    gap: scale(12),
  },
  cancelButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(8),
    borderRadius: moderateScale(12),
    borderColor: COLORS.border,
    borderWidth: 2,
    paddingVertical: verticalScale(14),
    backgroundColor: COLORS.white,
  },
  cancelText: {
    color: COLORS.textSecondary,
    fontSize: moderateScale(15),
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(8),
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(14),
    backgroundColor: COLORS.primary,
  },
  confirmButtonDisabled: {
    backgroundColor: COLORS.border,
    opacity: 0.5,
  },
  confirmText: {
    color: COLORS.white,
    fontSize: moderateScale(15),
    fontWeight: '700',
  },
});
