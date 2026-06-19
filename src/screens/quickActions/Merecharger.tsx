import HeaderScreen from "@/src/components/ui/HeaderScreen";
import { COLORS, ROUTES } from "@/src/constants";
import { RootStackParamList } from "@/src/navigation/types";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type TransferType = "ReceptionOM";

const retraitOptions = [
  { 
    type: 'icon',
    labelKey: "quickActions.atAgent",
    icon: "user",
  },
  { 
    type: 'icon',
    labelKey: "quickActions.withdrawalCode",
    icon: "key",
  },
  { 
    type: 'image',
    labelKey: "quickActions.fromOrangeMoney",
    image: require("@/assets/images/national/logo-orange.png"),
  },
  {     
    type: 'image',
    labelKey: "transfer.fromWave",
    image: require("@/assets/images/national/wave.png"),
  },
  {     
    type: 'icon',
    labelKey: "quickActions.myBank",
    icon: "building-columns",
  },
] as const;

export default function Merecharger() {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useTranslation();

  const handleOptionPress = (option: typeof retraitOptions[number]) => {
    const label = t(option.labelKey);
    if (label === t("quickActions.atAgent")) {
      
      console.log("Retrait chez un agent");
    } else if (label === t("quickActions.fromOrangeMoney")) {
      navigation.navigate(ROUTES.CONTACT, { type: "ReceptionOM" as TransferType });
    } else if (label === t("quickActions.withdrawalCode")) {
      
      console.log("Retrait avec code");
    } else if (label === t("quickActions.myBank")) {
      
      console.log("Virement bancaire");
    } else if (label === t("transfer.fromWave")) {
      
      console.log("Reception depuis Wave");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <View style={{ flex: 1, backgroundColor: COLORS.background }}>
        <HeaderScreen title={t('quickActions.topUp')} />
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.infoCard}>
              <Ionicons name="information-circle" size={scale(24)} color={COLORS.primary} />
              <Text style={styles.infoText}>
                {t('home.topUpInfo') || 'Choisissez comment vous souhaitez recharger votre compte CashMoov'}
              </Text>
            </View>

            <View style={styles.grid}>
              {retraitOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.item}
                  activeOpacity={0.7}
                  onPress={() => handleOptionPress(option)}
                >
                  <View style={styles.iconContainer}>
                    {option.type === "icon" ? (
                      <FontAwesome6 name={option.icon} color={COLORS.white} size={moderateScale(24)} />
                    ) : (
                      <Image 
                        source={option.image} 
                        style={styles.logoImage}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <Text style={styles.itemLabel}>{t(option.labelKey)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    padding: scale(15),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(20),
    gap: scale(12),
    borderLeftWidth: scale(4),
    borderLeftColor: COLORS.primary,
  },
  infoText: {
    flex: 1,
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    lineHeight: moderateScale(18),
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(16),
    padding: scale(15),
    alignItems: "center",
    justifyContent: "center",
    width: '48%',
    marginBottom: verticalScale(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.08,
    shadowRadius: moderateScale(8),
    elevation: 4,
    borderWidth: scale(1),
    borderColor: COLORS.border,
  },
  iconContainer: {
    backgroundColor: COLORS.primary,
    width: scale(60),
    height: scale(60),
    borderRadius: moderateScale(30),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(12),
  },
  logoImage: {
    width: scale(45),
    height: scale(45),
    borderRadius: moderateScale(8),
  },
  itemLabel: {
    fontSize: moderateScale(14),
    color: COLORS.textPrimary,
    textAlign: "center",
    fontWeight: "700",
    marginBottom: verticalScale(4),
  },
  itemDescription: {
    fontSize: moderateScale(11),
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: moderateScale(15),
  },
});
