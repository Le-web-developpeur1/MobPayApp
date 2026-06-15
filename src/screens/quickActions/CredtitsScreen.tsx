import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import HeaderScreen from '../../components/ui/HeaderScreen';
import Contact from '@/src/components/contact/Contact';
import * as Contacts from 'expo-contacts';
import { Ionicons } from '@expo/vector-icons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CreditsScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();

  const handleContactSelect = (contact: Contacts.Contact) => {
    const phone = contact.phoneNumbers?.[0]?.number || '';
    navigation.navigate(ROUTES.CREDIT_DETAIL, {
      typeCredit: 'pour autre' as any,
      phone: phone,
    });
  };

  

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <HeaderScreen title={t('credit.creditPurchase')} />
      
      <View style={styles.container}>
        {/* Liste des contacts */}
        <Contact 
          showSearchBar={true}
          onSelectContact={handleContactSelect}
          useSafeArea={false}
          showHeader={true}
        />
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
  forMeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: scale(20),
    marginTop: verticalScale(15),
    marginBottom: verticalScale(10),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    borderRadius: moderateScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  forMeIcon: {
    width: scale(40),
    height: scale(40),
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },
  forMeText: {
    flex: 1,
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});
