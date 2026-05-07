import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import HeaderScreen from '../../components/ui/HeaderScreen';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


export default function EsimDetail() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute();

    const { type } = route.params as { type: string };
    
    const title = type === 'esim' ? 'Achat E-Sim' : 'Gift Card';

    const paiementService = [
        { 
            label: "e-Sim Global", 
            img: require("@/assets/images/paiement/esim.jpg"), 
            typeEsim: "Global",
            description: "Achetez les forfaits eSIM Global et rester connecté partout dans le monde"
        },
        { 
            label: "e-Sim Europe", 
            img: require("@/assets/images/paiement/esim.jpg"), 
            typeEsim: "Europe",
            description: "Achetez les forfaits eSIM Europe et rester connecté dans tous les pays d'Europe"
        },
    ];

  return (
    <SafeAreaView style={styles.safeArea}>
        <HeaderScreen title={title}/>
        <View style={styles.container}>
            <View style={styles.infoBox}>
                <Text style={styles.infoText}>Veuillez choisir un type E-Sim selon votre besoin</Text>
                <Text style={styles.infoText}>Ou choisissez un pays spécifique</Text>
            </View>
            <View style={styles.grid}>
                {paiementService.map((service, index) => (
                   <TouchableOpacity
                     key={index}
                     style={styles.serviceCard}
                     activeOpacity={0.7}
                     onPress={() => {
                        navigation.navigate(ROUTES.DETAIL_ESIM as any, { 
                          typeEsim: service.typeEsim,
                          name: service.label,
                          logo: service.img,
                        });
                     }}
                   >
                     <View style={styles.imageContainer}>
                       <Image source={service.img} style={styles.image} />
                     </View>
                     <Text style={styles.serviceLabel}>{service.label}</Text>
                     <Text style={styles.serviceDescription}>{service.description}</Text>
                   </TouchableOpacity>
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate(ROUTES.COUNTRY_SELECTOR, {type: type as any})}
                >
                    <Text style={styles.buttonText}> Choisir un pays</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
    },
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
      paddingHorizontal: scale(20),
    },
    infoBox: {
        backgroundColor: COLORS.primaryLight,
        padding: scale(12),
        borderRadius: moderateScale(8),
        marginTop: verticalScale(15),
        borderLeftWidth: scale(5),
        borderLeftColor: COLORS.primary,
        gap: scale(8),
        marginBottom: verticalScale(10)
    },
    infoText: {
        color: COLORS.textPrimary,
        fontSize: moderateScale(14),
        lineHeight: moderateScale(20),
    },
    grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: scale(12),
  },
  serviceCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(14),
    padding: scale(15),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(6),
    elevation: 3,
  },
  imageContainer: {
    width: scale(90),
    height: scale(90),
    borderRadius: moderateScale(12),
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(12),
    overflow: 'hidden',
  },
  image: {
    width: scale(80),
    height: scale(80),
    borderRadius: moderateScale(10),
  },
  serviceLabel: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: verticalScale(6),
  },
  serviceDescription: {
    fontSize: moderateScale(11),
    fontWeight: '400',
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: moderateScale(16),
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(20)
  },
  button: {
    backgroundColor: COLORS.primary,
    width: scale(200),
    height: verticalScale(40),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(10),
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: moderateScale(18)
  },
})