import HeaderScreen from "@/src/components/ui/HeaderScreen";
import { COLORS, ROUTES } from "@/src/constants";
import { RootStackParamList } from "@/src/navigation/types";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const retraitOptions = [
  { 
    label: "Retrait Code", 
    name: "key",
  },
  { 
    label: "Chez un agent", 
    name: "user",
  },
  { 
    label: "Ma Banque", 
    name: "building-columns",
  },
] as const;

export default function Merecharger() {
  const navigation = useNavigation<NavigationProp>();

  const handleOptionPress = (option: string) => {
    if (option === "Chez un agent") {
    }
    // Ajouter d'autres navigations selon les options
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
                    <FontAwesome6 name={option.name} color={COLORS.white} size={moderateScale(18)} />
                  </View>
                  <Text style={styles.itemText}>{option.label}</Text>
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
});
