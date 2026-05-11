import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import HeaderScreen from '../../components/ui/HeaderScreen';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const paiementService = [
  { label: 'Pour moi', name: 'user', typeCredit: 'pour moi' },
  { label: 'Pour un autre', name: 'user-plus', typeCredit: 'pour autre' },
];

export default function CreditsScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderScreen title={t('credit.creditPurchase')} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {paiementService.map((service, index) => (
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() =>
                  navigation.navigate(ROUTES.CREDIT_DETAIL, {
                    typeCredit: service.typeCredit as any,
                  })
                }
                activeOpacity={0.7}
              >
                <View style={styles.icon}>
                  <FontAwesome6 name={service.name as any} size={moderateScale(15)} color={COLORS.white} />
                </View>
                <Text style={styles.itemText}>{service.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
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
    paddingTop: verticalScale(30),
    paddingHorizontal: scale(20),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: scale(15),
  },
  item: {
    paddingVertical: verticalScale(8),
    borderColor: COLORS.primary,
    borderWidth: moderateScale(1),
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(100),
    height: verticalScale(80),
    marginHorizontal: scale(18),
    borderRadius: moderateScale(10),
    backgroundColor: COLORS.white,
    marginBottom: verticalScale(20),
  },
  icon: {
    backgroundColor: COLORS.primary,
    width: scale(30),
    height: scale(30),
    borderRadius: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    paddingTop: verticalScale(10),
    fontSize: moderateScale(15),
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
});