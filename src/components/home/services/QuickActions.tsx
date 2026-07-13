import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Send, Smartphone, Wallet, Banknote, Receipt, Store } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Action = {
  labelKey: string;
  icon: any;
  route: string;
};

const QuickActions = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp>();

  const actions: Action[] = [
    { labelKey: "quickActions.transfer", icon: Send, route: ROUTES.TRANSFERT },
    { labelKey: "quickActions.topUp", icon: Wallet, route: 'MRecharger'},
    { labelKey: "quickActions.credits", icon: Smartphone, route: 'Credit' },
    { labelKey: "quickActions.withdrawals", icon: Banknote, route: ROUTES.RETRAITS },
    { labelKey: "quickActions.bills", icon: Receipt, route: ROUTES.FACTURES },
    { labelKey: "quickActions.merchants", icon: Store, route: 'PaiementMachand' },
  ];

  return (
        <View style={styles.container}>
            {actions.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.action}
                    onPress={() => navigation.navigate(item.route as any) }
                  >
                      <View style={styles.iconContainer}>
                          <IconComponent size={moderateScale(24)} color={COLORS.primary} strokeWidth={2}/>
                      </View>
                      <Text style={styles.label}>{t(item.labelKey)}</Text>
                  </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default QuickActions;

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: verticalScale(8),
      paddingHorizontal: scale(20),
      gap: scale(10),
    },
    action: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.white,
      width: "30%",
      paddingVertical: verticalScale(12),
      paddingHorizontal: scale(5),
      borderRadius: moderateScale(12),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    iconContainer: {
      width: scale(50),
      height: scale(50),
      borderRadius: moderateScale(25),
      backgroundColor: COLORS.primaryLight,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: verticalScale(8),
    },
    label: {
      fontSize: moderateScale(12),
      fontWeight: "600",
      color: COLORS.textPrimary,
      textAlign: "center",
    },
  });
  