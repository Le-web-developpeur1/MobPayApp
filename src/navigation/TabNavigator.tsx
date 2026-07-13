import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';
import { COLORS, ROUTES } from '../constants';
import History from '../screens/tab/History';
import HomeScreen from '../screens/tab/HomeScreen';
import QrScannerScreen from '../screens/tab/QrScannerScreen';
import ServiceScreen from '../screens/tab/ServiceScreen';
import ShoppingScreen from '../screens/tab/ShoppingScreen';
import { Clock, Home, QrCode, ShoppingBag, Wallet } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { t } = useTranslation();

  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          height: verticalScale(60) + insets.bottom,
          paddingBottom: Platform.OS === 'android' ? verticalScale(5) : insets.bottom,
          paddingTop: verticalScale(5),
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === ROUTES.HOME) {
            return <Home color={color} size={size} strokeWidth={2} />;
          } else if (route.name === ROUTES.SHOPPING) {
            return <ShoppingBag color={color} size={size} strokeWidth={2} />;
          } else if (route.name === "History") {
            return <Clock color={color} size={size} strokeWidth={2} />;
          } else if (route.name === ROUTES.SERVICES) {
            return <Wallet color={color} size={size} strokeWidth={2} />;
          }
          return <Home color={color} size={size} strokeWidth={2} />;
        },
      })}
    >
      <Tab.Screen 
        name={ROUTES.HOME} 
        component={HomeScreen} 
        options={{ title: t('home.title') || 'Accueil' }} 
      />
      <Tab.Screen 
        name={"History"} 
        component={History} 
        options={{ title: t('history.title') || 'Historique' }} 
      />
      <Tab.Screen 
        name={ROUTES.QRSCAN}
        component={QrScannerScreen}
        options={{
          title: '',
          tabBarIcon: () => (
            <View style={styles.scanButtonContainer}>
              <View style={styles.scanButton}>
                <QrCode size={scale(30)} color={COLORS.secondary} strokeWidth={2} />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name={ROUTES.SERVICES} 
        component={ServiceScreen} 
        options={{ title: t('services.title') || 'Services' }} 
      />
      <Tab.Screen 
        name={ROUTES.SHOPPING} 
        component={ShoppingScreen} 
        options={{ title: t('shopping.title') || 'E-Com' }} 
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  scanButtonContainer: {
    top: verticalScale(-15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});
