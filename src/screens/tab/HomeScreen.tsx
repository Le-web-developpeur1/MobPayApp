import CompleteProfileBanner from '@/src/components/home/CompleteProfileBanner';
import Favorites from '@/src/components/home/services/Favorites';
import WelcomeModal from '@/src/components/modals/WelcomeModal';
import { PrimaryStatusBar } from '@/src/components/ui';
import FloatingChatButton from '@/src/components/ui/FloatingChatButton';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BalanceCard from '../../components/home/BalanceCard';
import CarteInfo from '../../components/home/caroussel/CarteInfo';
import Header from '../../components/home/Header';
import QuickActions from '../../components/home/services/QuickActions';
import RecentesTransaction from '../../components/transactions/RecentesTrans';
import { COLORS } from '../../constants';

export default function HomeScreen() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const appState = useRef(AppState.currentState);

  // useEffect(() => {
  //   // Affiche le modal au premier chargement
  //   const timer = setTimeout(() => {
  //     setShowWelcomeModal(true);
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    // Écoute les changements d'état de l'app (background/foreground)
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // L'app revient en premier plan - Affiche le modal
        setTimeout(() => {
          setShowWelcomeModal(true);
        }, 300);
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleCloseWelcome = () => {
    setShowWelcomeModal(false);
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
          <FloatingChatButton/>

          {/* Modal de bienvenue (à chaque retour dans l'app) */}
          <WelcomeModal
            visible={showWelcomeModal}
            onClose={handleCloseWelcome}
            imageUrl={require('@/assets/images/bot-icon.png')}
            userName="Boubacar"
            title="Content de vous revoir !"
            description="Profitez de toutes nos fonctionnalités pour gérer vos transactions facilement et en toute sécurité."
          />
      </SafeAreaView>
    </>
  );
}