import { COLORS } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

interface CustomerServiceModalProps {
  visible: boolean;
  onClose: () => void;
}

const CONTACT_OPTIONS = [
  {
    id: 'whatsapp',
    icon: 'logo-whatsapp',
    title: 'WhatsApp',
    subtitle: 'Service client réactif',
    color: '#25D366',
    backgroundColor: '#E8F8F0',
    action: () => {
      Linking.openURL('https://wa.me/224626058033');
    }
  },
  {
    id: 'phone',
    icon: 'call',
    title: 'Appel',
    subtitle: 'Disponible de 8h00 à 17h30',
    color: '#5856D6',
    backgroundColor: '#EEEEF7',
    action: () => {
      Linking.openURL('tel:+224626058033');
    }
  },
];

export default function CustomerServiceModal({ visible, onClose }: CustomerServiceModalProps) {
  const handleOptionPress = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Service client</Text>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={scale(24)} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Contact Options */}
          <View style={styles.optionsContainer}>
            {CONTACT_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={styles.optionCard}
                onPress={() => handleOptionPress(option.action)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: option.backgroundColor }]}>
                  <Ionicons name={option.icon as any} size={scale(28)} color={option.color} />
                </View>

                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                </View>

                <Ionicons name="chevron-forward" size={scale(20)} color={COLORS.textSecondary} />
              </TouchableOpacity>
            ))}
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
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(30),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(15),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  closeButton: {
    width: scale(36),
    height: scale(36),
    borderRadius: moderateScale(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: verticalScale(10),
  },
  optionsContainer: {
    paddingHorizontal: scale(20),
    gap: verticalScale(12),
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: moderateScale(15),
    padding: scale(15),
    gap: scale(15),
  },
  iconContainer: {
    width: scale(56),
    height: scale(56),
    borderRadius: moderateScale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(4),
  },
  optionSubtitle: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    lineHeight: moderateScale(18),
  },
});
