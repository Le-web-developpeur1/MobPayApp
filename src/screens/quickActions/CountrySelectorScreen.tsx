import { COLORS } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CountrySelector from '../../components/paiement/CountrySelector';
import HeaderScreen from '../../components/ui/HeaderScreen';

type CountrySelectorRouteProp = RouteProp<RootStackParamList, 'CountrySelector'>;

export default function CountrySelectorScreen() {
  const route = useRoute<CountrySelectorRouteProp>();
  const { type } = route.params;

  const title = type === 'esim' ? 'E-Sim' : 'Gift Card';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }} edges={['top']}>
      <HeaderScreen title={title} />
      <View style={{ flex: 1, backgroundColor: COLORS.background }}>
        <CountrySelector type={type} />
      </View>
    </SafeAreaView>
  );
}
