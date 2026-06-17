import HeaderScreen from "@/src/components/ui/HeaderScreen";
import { COLORS, ROUTES } from "@/src/constants";
import { RootStackParamList } from "@/src/navigation/types";
import { FontAwesome6 } from "@expo/vector-icons";
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
    label: "Retrait Code", 
    name: "key",
  },
  { 
    type: 'icon',
    label: "Chez un agent", 
    name: "user",
  },
  {     
    type: 'icon',
    label: "Ma Banque", 
    name: "building-columns",
  },
  {     
    type: 'img',
    label: "Depuis Wave", 
    name: "@/assets/images/national/wave.png",
  },
  { 
    type: 'img',
    label: "Depuis OM", 
    name: "@/assets/images/national/logo-orange.png",
  },
] as const;

export default function Merecharger() {
  const navigation = useNavigation<NavigationProp>();

  const { t } = useTranslation();

  const handleOptionPress = (option: string) => {
    if (option === "Chez un agent") {
    }
    else if (option === "Depuis OM") {
      navigation.navigate(ROUTES.CONTACT, { type: "ReceptionOM" as TransferType })
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <View style={{ flex: 1, backgroundColor: COLORS.background }}>
        <HeaderScreen title="Options de retrait" />
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.grid}>
              {retraitOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.item}
                  onPress={() => handleOptionPress(option.label)}
                >
                  <View style={styles.icon}>
                    {option.type === "icon" ? (
                      <FontAwesome6 name={option.name} color={COLORS.white} size={moderateScale(18)} />
                    ) : (
                      
                      <Image source={option.name as any}/>
                    )}
                  </View>
                  <Text style={styles.itemText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* <TouchableOpacity 
                      style={styles.card} 
                      activeOpacity={0.7}
                     onPress={() => {
                      }}
                    >
                      <View style={styles.logoContainer}>
                        <Image 
                          source={require("@/assets/images/national/logo-orange.png")}
                          style={styles.logo}
                        />
                      </View>
                      <Text style={styles.cardTitle}>{t('transfer.receiveFromOM')}</Text>
                      <Text style={styles.cardDescription}>{t('transfer.orangeMoney')}</Text>
                    </TouchableOpacity> */}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: verticalScale(30),
    paddingHorizontal: scale(20),
  },
  icon: {
    backgroundColor: COLORS.primary,
    width: scale(40),
    height: verticalScale(40),
    borderRadius: moderateScale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    paddingVertical: verticalScale(15),
    borderColor: COLORS.primary,
    borderWidth: moderateScale(1),
    alignItems: "center",
    justifyContent: "center",
    width: scale(100),
    height: verticalScale(100),
    marginHorizontal: scale(5),
    marginBottom: verticalScale(15),
    borderRadius: moderateScale(12),
    backgroundColor: COLORS.white,
  },
  itemText: {
    paddingTop: verticalScale(10),
    fontSize: moderateScale(13),
    color: COLORS.primary,
    textAlign: "center",
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(16),
    padding: scale(12),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(6),
    elevation: 3,
  },
  logoContainer: {
    width: scale(60),
    height: scale(60),
    borderRadius: moderateScale(14),
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(10),
  },
  logo: {
    width: scale(48),
    height: scale(48),
    borderRadius: moderateScale(10),
  },
  cardTitle: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(4),
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
