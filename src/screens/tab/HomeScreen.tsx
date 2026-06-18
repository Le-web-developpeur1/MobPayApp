import CompleteProfileBanner from '@/src/components/home/CompleteProfileBanner';
import Favorites from '@/src/components/home/services/Favorites';
import WelcomeModal from '@/src/components/modals/WelcomeModal';
import { PrimaryStatusBar } from '@/src/components/ui';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';
import BalanceCard from '../../components/home/BalanceCard';
import CarteInfo from '../../components/home/caroussel/CarteInfo';
import Header from '../../components/home/Header';
import QuickActions from '../../components/home/services/QuickActions';
import RecentesTransaction from '../../components/transactions/RecentesTrans';
import { COLORS, ROUTES } from '../../constants';
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // Affiche le modal au premier chargement
    const timer = setTimeout(() => {
      setShowWelcomeModal(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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

  // Affiche aussi le modal quand on revient sur cet écran depuis une autre page
  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        setShowWelcomeModal(true);
      }, 300);

      return () => clearTimeout(timer);
    }, [])
  );

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