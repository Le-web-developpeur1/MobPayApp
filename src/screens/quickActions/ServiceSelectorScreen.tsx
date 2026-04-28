import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import HeaderScreen from '../../components/ui/HeaderScreen';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type ServiceSelectorRouteProp = RouteProp<RootStackParamList, 'ESimService' | 'GiftCardService'>;

interface Service {
  name: string;
  logo: any;
}

// Données pour eSim
const eSimServices: Record<string, Service[]> = {
  "Sénégal": [
    { name: "Global eSim", logo: require("@/assets/images/national/PNG.png") },
    { name: "Sénégal eSim", logo: require("@/assets/images/national/PNG.png") },
  ],
  "France": [
    { name: "Global eSim", logo: require("@/assets/images/national/PNG.png") },
    { name: "France eSim", logo: require("@/assets/images/national/PNG.png") },
  ],
  "Mali": [
    { name: "Global eSim", logo: require("@/assets/images/national/PNG.png") },
    { name: "Mali eSim", logo: require("@/assets/images/national/PNG.png") },
  ],
  "Afrique du Sud": [
    { name: "Global eSim", logo: require("@/assets/images/national/PNG.png") },
    { name: "Afrique du Sud eSim", logo: require("@/assets/images/national/PNG.png") },
  ],
};

// Données pour Gift Card
const giftCardServices: Record<string, Service[]> = {
  "Sénégal": [
    { name: "Netflix", logo: require("@/assets/images/national/logo-orange.png") },
    { name: "Playstation Store", logo: require("@/assets/images/national/PNG.png") },
    { name: "Amazon", logo: require("@/assets/images/national/mtn.png") },
    { name: "Spotify", logo: require("@/assets/images/national/cellcom.png") },
  ],
  "France": [
    { name: "Netflix", logo: require("@/assets/images/national/logo-orange.png") },
    { name: "Playstation Store", logo: require("@/assets/images/national/PNG.png") },
    { name: "Amazon", logo: require("@/assets/images/national/mtn.png") },
  ],
  "Mali": [
    { name: "Netflix", logo: require("@/assets/images/national/logo-orange.png") },
    { name: "Playstation Store", logo: require("@/assets/images/national/PNG.png") },
    { name: "Spotify", logo: require("@/assets/images/national/cellcom.png") },
  ],
  "Afrique du Sud": [
    { name: "Netflix", logo: require("@/assets/images/national/logo-orange.png") },
    { name: "Playstation Store", logo: require("@/assets/images/national/PNG.png") },
    { name: "Amazon", logo: require("@/assets/images/national/mtn.png") },
    { name: "Spotify", logo: require("@/assets/images/national/cellcom.png") },
  ],
};

export default function ServiceSelectorScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ServiceSelectorRouteProp>();
  const { country } = route.params as { country: string };
  
  const [search, setSearch] = useState("");

  // Déterminer le type basé sur le nom de la route
  const isESim = route.name === 'ESimService';
  const title = isESim ? 'E-Sim' : 'Gift Card';
  
  // Sélectionner les bonnes données
  const servicesData = isESim ? eSimServices : giftCardServices;
  const available = servicesData[country] || [];

  const filteredServices = available.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleServiceSelect = (service: Service) => {
    if (isESim) {
      navigation.navigate(ROUTES.DETAIL_ESIM as any, {
        country,
        logo: service.logo,
        name: service.name,
      });
    } else {
      navigation.navigate(ROUTES.DETAIL_GIFTCARD as any, {
        country,
        name: service.name,
        logo: service.logo,
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderScreen title={title} />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un service"
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {filteredServices.length > 0 ? (
            <View style={styles.grid}>
              {filteredServices.map((service, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.serviceCard}
                  activeOpacity={0.7}
                  onPress={() => handleServiceSelect(service)}
                >
                  <View style={styles.imageContainer}>
                    <Image source={service.logo} style={styles.image} />
                  </View>
                  <Text style={styles.serviceName}>{service.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={moderateScale(60)} color={COLORS.textSecondary} />
              <Text style={styles.emptyText}>Aucun service trouvé</Text>
              <Text style={styles.emptySubtext}>pour {country}</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(10),
  },
  searchInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(12),
    fontSize: moderateScale(15),
    color: COLORS.textPrimary,
  },
  scrollContent: {
    paddingBottom: verticalScale(20),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: scale(20),
    gap: scale(15),
  },
  serviceCard: {
    width: '30%',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  imageContainer: {
    width: scale(90),
    height: scale(90),
    borderRadius: moderateScale(12),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(6),
    elevation: 3,
  },
  image: {
    width: scale(75),
    height: scale(75),
    borderRadius: moderateScale(10),
  },
  serviceName: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(80),
  },
  emptyText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: verticalScale(15),
  },
  emptySubtext: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
    marginTop: verticalScale(5),
  },
});
