import CompleteProfileBanner from '@/src/components/home/CompleteProfileBanner';
import Favorites from '@/src/components/home/services/Favorites';
import { PrimaryStatusBar } from '@/src/components/ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';
import BalanceCard from '../../components/home/BalanceCard';
import CarteInfo from '../../components/home/caroussel/CarteInfo';
import Header from '../../components/home/Header';
import QuickActions from '../../components/home/services/QuickActions';
import RecentesTransaction from '../../components/transactions/RecentesTrans';
import { COLORS, ROUTES } from '../../constants';
import { RootStackParamList } from '../../navigation/types';
import WelcomeModal from '@/src/components/modals/WelcomeModal';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    // Vérifie si c'est la première fois que l'utilisateur se connecte
    checkFirstLogin();
  }, []);

  const checkFirstLogin = async () => {
    try {
      const hasSeenWelcome = await AsyncStorage.getItem('hasSeenWelcome');
      if (!hasSeenWelcome) {
        // Première connexion - Affiche le modal après 500ms
        setTimeout(() => {
          setShowWelcomeModal(true);
        }, 500);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du premier login:', error);
    }
  };

  const handleCloseWelcome = async () => {
    try {
      // Marque comme vu
      await AsyncStorage.setItem('hasSeenWelcome', 'true');
      setShowWelcomeModal(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setShowWelcomeModal(false);
    }
  };

  return (
    <>
      <PrimaryStatusBar />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primaryLight}} edges={["top"]}>
          <Header/>
          <ScrollView
              showsVerticalScrollIndicator={false}
              >
            <BalanceCard/>
              <CompleteProfileBanner/>
              <QuickActions/>
              <Favorites/>
              {/* <Services/> */}
              <CarteInfo/>
              <RecentesTransaction/>
          </ScrollView>

          {/* Bouton Chatbot flottant */}
          <TouchableOpacity
            style={styles.chatbotButton}
            onPress={() => navigation.navigate(ROUTES.CHATBOT)}
            activeOpacity={0.8}
          >
            <Image 
              source={require('@/assets/images/bot-icon.png')} 
              style={styles.chatbotImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Modal de bienvenue (première connexion uniquement) */}
          <WelcomeModal
            visible={showWelcomeModal}
            onClose={handleCloseWelcome}
            userName="Boubacar"
            title="Bienvenue sur CashMoov !"
            description="Profitez de toutes nos fonctionnalités pour gérer vos transactions facilement et en toute sécurité."
          />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  chatbotButton: {
    position: 'absolute',
    bottom: verticalScale(20),
    right: scale(20),
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  chatbotImage: {
    width: scale(35),
    height: scale(35),
  },
});