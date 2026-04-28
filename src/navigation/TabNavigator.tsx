import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';
import { COLORS, ROUTES } from '../constants';
import HistoriqueScreen from '../screens/tab/HistoriqueScreen';
import HomeScreen from '../screens/tab/HomeScreen';
import ProfileScreen from '../screens/tab/ProfilScreen';
import ServiceScreen from '../screens/tab/ServiceScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import QrScannerScreen from '../screens/tab/QrScannerScreen';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const navigation = useNavigation<NavigationProp>();

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
          let iconName: keyof typeof MaterialIcons.glyphMap;

          if (route.name === ROUTES.HOME) {
            iconName = 'home';
          } else if (route.name === ROUTES.PROFILE) {
            iconName = 'person';
          } else if (route.name === ROUTES.HISTORIQUE) {
            iconName = 'history';
          } else if (route.name === ROUTES.SERVICES) {
            iconName = 'account-balance-wallet';
          } else if (route.name === ROUTES.QRSCAN) {
            iconName = 'account-balance-wallet';
          } else {
            iconName = 'home';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name={ROUTES.HOME} 
        component={HomeScreen} 
        options={{ title: 'Accueil' }} 
      />
      <Tab.Screen 
        name={ROUTES.HISTORIQUE} 
        component={HistoriqueScreen} 
        options={{ title: 'Historique' }} 
      />
      <Tab.Screen 
        name={ROUTES.QRSCAN}
        component={QrScannerScreen}
        options={{
          title: '',
          tabBarIcon: () => (
            <View style={styles.scanButtonContainer}>
              <View style={styles.scanButton}
              >
                <MaterialIcons name="qr-code-scanner" size={scale(28)} color={COLORS.secondary} />
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name={ROUTES.SERVICES} 
        component={ServiceScreen} 
        options={{ title: 'Services' }} 
      />
      <Tab.Screen 
        name={ROUTES.PROFILE} 
        component={ProfileScreen} 
        options={{ title: 'Profil' }} 
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
