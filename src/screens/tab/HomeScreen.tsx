import CompleteProfileBanner from '@/src/components/home/CompleteProfileBanner';
import Favorites from '@/src/components/home/services/Favorites';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
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

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
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
            {/* Option 1 : Avec icône (actuel)
            <Ionicons name="chatbubble-ellipses" size={scale(26)} color={COLORS.white} />
             */}
            {/* Option 2 : Avec image - décommente et remplace le chemin par ton image */}
            <Image 
              source={require('@/assets/images/bot-icon.png')} 
              style={styles.chatbotImage}
              resizeMode="contain"
            />
           
          </TouchableOpacity>
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