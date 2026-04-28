import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BalanceCard from '../../components/home/BalanceCard';
import CarteInfo from '../../components/home/caroussel/CarteInfo';
import Header from '../../components/home/Header';
import QuickActions from '../../components/home/services/QuickActions';
import RecentesTransaction from '../../components/Transactions/RecentesTrans';
import { COLORS } from '../../constants';
import Services from '@/src/components/home/services/Services';

export default function HomeScreen() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primaryLight}} edges={["top"]}>
          <Header/>
          <ScrollView
              showsVerticalScrollIndicator={false}
              >
            <BalanceCard/>
              <QuickActions/>
              <Services/>
              <CarteInfo/>
              <RecentesTransaction/>
          </ScrollView>
      </SafeAreaView>
    </>
  );
}