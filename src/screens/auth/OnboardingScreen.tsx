import { COLORS, ROUTES } from '@/src/constants';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { RootStackParamList } from '../../navigation/types';

const { width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const slides = [
  {
    id: '1',
    title: 'Transferts rapides',
    description: 'Envoyez et recevez de l\'argent en quelques secondes partout en Guinée',
    icon: 'flash-outline',
  },
  {
    id: '2',
    title: 'Paiements sécurisés',
    description: 'Payez vos factures, achats et services en toute sécurité',
    icon: 'shield-checkmark-outline',
  },
  {
    id: '3',
    title: 'Gestion simplifiée',
    description: 'Suivez toutes vos transactions et gérez votre argent facilement',
    icon: 'wallet-outline',
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate(ROUTES.LOGIN);
    }
  };

  const handleSkip = () => {
    navigation.navigate(ROUTES.LOGIN);
  };

  const renderItem = ({ item }: { item: typeof slides[0] }) => (
    <View style={styles.slide}>
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon as any} size={scale(80)} color={COLORS.primary} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Passer</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footer}>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? 'Commencer' : 'Suivant'}
          </Text>
          <Ionicons name="arrow-forward" size={scale(20)} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  skipButton: {
    position: 'absolute',
    top: Platform.OS === "android" ? verticalScale(20) : verticalScale(40),
    right: scale(20),
    zIndex: 10,
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(8),
  },
  skipText: {
    fontSize: moderateScale(20),
    color: COLORS.primary,
    fontWeight: '600',
  },
  slide: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(40),
  },
  iconContainer: {
    width: scale(150),
    height: scale(150),
    borderRadius: moderateScale(75),
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(40),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: verticalScale(15),
  },
  description: {
    fontSize: moderateScale(16),
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: moderateScale(24),
    fontWeight: "bold"
  },
  footer: {
    paddingHorizontal: scale(40),
    paddingBottom: verticalScale(40),
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(30),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: moderateScale(4),
    backgroundColor: COLORS.white,
    marginHorizontal: scale(4),
    opacity: 0.5,
  },
  activeDot: {
    width: scale(24),
    backgroundColor: COLORS.primary,
    opacity: 1,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(10),
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.white,
  },
});
