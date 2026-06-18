import { BodyText, ButtonText, H3 } from '@/src/components/ui';
import { COLORS } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import {
    Dimensions,
    Image,
    Modal,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

interface WelcomeModalProps {
  visible: boolean;
  onClose: () => void;
  userName?: string;
  imageUrl?: string; // URL de l'image promotionnelle
  title?: string;
  description?: string;
}

/**
 * Modal de bienvenue qui s'affiche à la première connexion
 * Style moderne avec image, titre et description
 */
export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  visible,
  onClose,
  userName = 'Utilisateur',
  imageUrl,
  title = 'Bienvenue sur CashMoov ! 🎉',
  description = 'Découvrez toutes nos fonctionnalités pour gérer vos transactions facilement.',
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Fond avec blur */}
      <View style={styles.overlay}>
        <BlurView intensity={20} style={styles.blurContainer}>
          {/* Contenu du modal */}
          <View style={styles.modalContainer}>
            {/* Bouton fermer */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <View style={styles.closeButtonCircle}>
                <Ionicons name="close" size={scale(24)} color={COLORS.white} />
              </View>
            </TouchableOpacity>

            {/* Image promotionnelle (optionnelle) */}
            {imageUrl && (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            )}

            {/* Contenu textuel */}
            <View style={styles.content}>
              {/* Salutation */}
              <View style={styles.greetingContainer}>
                <H3 style={styles.greeting}>
                  Bonjour {userName} 👋
                </H3>
              </View>

              {/* Titre principal */}
              <H3 style={styles.title}>{title}</H3>

              {/* Description */}
              <BodyText style={styles.description}>
                {description}
              </BodyText>

              {/* Fonctionnalités */}
              <View style={styles.featuresContainer}>
                <FeatureItem
                  icon="flash"
                  text="Transferts instantanés"
                />
                <FeatureItem
                  icon="shield-checkmark"
                  text="100% sécurisé"
                />
                <FeatureItem
                  icon="wallet"
                  text="Gestion simplifiée"
                />
              </View>

              {/* Bouton d'action */}
              <TouchableOpacity
                style={styles.button}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <ButtonText color={COLORS.white}>
                  Commencer
                </ButtonText>
                <Ionicons
                  name="arrow-forward"
                  size={scale(20)}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </View>
    </Modal>
  );
};

// Composant pour afficher une fonctionnalité
const FeatureItem: React.FC<{ icon: string; text: string }> = ({
  icon,
  text,
}) => (
  <View style={styles.featureItem}>
    <View style={styles.featureIcon}>
      <Ionicons name={icon as any} size={scale(20)} color={COLORS.primary} />
    </View>
    <BodyText style={styles.featureText}>{text}</BodyText>
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
  },
  modalContainer: {
    width: width - scale(40),
    maxHeight: height * 0.85,
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(20),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  closeButton: {
    position: 'absolute',
    top: scale(15),
    right: scale(15),
    zIndex: 10,
  },
  closeButtonCircle: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    height: verticalScale(200),
    backgroundColor: COLORS.primaryLight,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: scale(24),
    gap: verticalScale(16),
  },
  greetingContainer: {
    marginBottom: verticalScale(8),
  },
  greeting: {
    color: COLORS.primary,
    textAlign: 'center',
  },
  title: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: verticalScale(8),
  },
  description: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: moderateScale(22),
  },
  featuresContainer: {
    gap: verticalScale(12),
    marginTop: verticalScale(8),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(12),
    paddingVertical: verticalScale(8),
  },
  featureIcon: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    flex: 1,
    color: COLORS.textPrimary,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(24),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(10),
    marginTop: verticalScale(8),
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default WelcomeModal;
