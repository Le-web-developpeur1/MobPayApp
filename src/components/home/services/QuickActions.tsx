import { COLORS, ROUTES } from '@/src/constants';
import { RootStackParamList } from '@/src/navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Action = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
};

const actions: Action[] = [
    { label: "Transfert", icon: "send-outline", route: ROUTES.TRANSFERT },
    { label: "Factures", icon: "document-text-outline", route: ROUTES.FACTURES },
    { label: "Crédits", icon: "phone-portrait-outline", route: ROUTES.CREDITS },
    { label: "Marchands", icon: "cart-outline", route: ROUTES.DETAIL_MARCHAND },
    { label: "Retraits", icon: "download-outline", route: ROUTES.RETRAITS },
    { label: "Me Recharger", icon: "add-circle-outline", route: ROUTES.ME_RECHARGER},
];

const QuickActions = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
        <View style={styles.container}>
            {actions.map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.action}
                  onPress={() => navigation.navigate(item.route as any) }
                >
                    <View style={styles.iconContainer}>
                        <Ionicons name={item.icon} size={moderateScale(24)} color={COLORS.primary}/>
                    </View>
                    <Text style={styles.label}>{item.label}</Text>
                </TouchableOpacity>
            ))}
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
  