import { ConfirmModal } from "@/src/components/modals/ConfirmModal";
import HeaderScreen from "@/src/components/ui/HeaderScreen";
import { COLORS, ROUTES } from "@/src/constants";
import { RootStackParamList } from "@/src/navigation/types";
import { MaterialIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type DetailRetraitRouteProp = RouteProp<RootStackParamList, "DetailRetrait">;

export default function RetraitsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<DetailRetraitRouteProp>();
  
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState(route.params?.phone || "");
  const [name, setName] = useState(route.params?.name || "");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (route.params?.phone) {
      setPhone(route.params.phone);
    }
    if (route.params?.name) {
      setName(route.params.name);
    }
  }, [route.params]);

  const handleScanPress = () => {
    navigation.navigate(ROUTES.QRSCAN, { returnScreen: ROUTES.DETAIL_RETRAIT });
  };

  const handleWithdrawPress = () => {
    if (!phone || !name || !amount) {
      return;
    }
    setShowConfirmModal(true);
  };

  // Calcul des frais (exemple: 0.5% du montant pour retrait)
  const amountNum = parseFloat(amount.replace(/\s/g, '') || '0');
  const fees = Math.round(amountNum * 0.005);
  const total = amountNum + fees;

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
        <HeaderScreen title="Retrait d'argent" />
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ marginBottom: verticalScale(20) }}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.container}>
                <Text style={styles.title}>Détails de l'agent</Text>

                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Numéro de l'agent"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Nom de l'agent"
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Montant à retirer"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                  />
                  <Text style={styles.icon}>GNF</Text>
                </View>

                <TouchableOpacity
                  style={[styles.confirmer, (!phone || !name || !amount) && styles.confirmerDisabled]}
                  onPress={handleWithdrawPress}
                  disabled={!phone || !name || !amount}
                >
                  <Text style={styles.confirmerText}>Retirer</Text>
                </TouchableOpacity>

                <View style={styles.option}>
                  <TouchableOpacity style={styles.iconWrapper} onPress={handleScanPress}>
                    <MaterialIcons name="qr-code-scanner" size={moderateScale(80)} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.scan}>Scanner le QR de l'agent</Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>

      <ConfirmModal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        beneficiaire={{ name, phone }}
        transaction={{
          montant: amount,
          frais: fees.toLocaleString(),
          taxe: "0.00",
          total: total.toLocaleString(),
        }}
        transactionType="retrait"
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: verticalScale(30),
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(20),
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: moderateScale(1),
    borderColor: "#ccc",
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(10),
    backgroundColor: "#fff",
    marginVertical: verticalScale(4),
  },
  icon: {
    marginRight: scale(8),
  },
  input: {
    flex: 1,
    fontSize: moderateScale(16),
    color: "#000",
    paddingVertical: verticalScale(12),
  },
  title: {
    fontSize: moderateScale(18),
    paddingHorizontal: scale(2),
    fontWeight: "bold",
    marginBottom: verticalScale(3),
  },
  confirmer: {
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(4),
    borderRadius: moderateScale(6),
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(18),
    marginLeft: scale(3),
    marginRight: scale(2),
  },
  confirmerDisabled: {
    backgroundColor: COLORS.textSecondary,
    opacity: 0.5,
  },
  confirmerText: {
    color: "white",
    fontWeight: "700",
    fontSize: moderateScale(18),
  },
  option: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: verticalScale(30),
  },
  iconWrapper: {
    backgroundColor: "#0069FF1A",
    width: scale(100),
    height: verticalScale(90),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(12),
  },
  scan: {
    fontSize: moderateScale(18),
    paddingHorizontal: scale(2),
    fontWeight: "bold",
    marginTop: verticalScale(15),
    textAlign: "center",
  },
});
