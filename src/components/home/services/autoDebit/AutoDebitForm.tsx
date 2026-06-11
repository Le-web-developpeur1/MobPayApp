import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { COLORS } from "@/src/constants";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Dates from "./Dates";
import Buttons from "@/src/components/ui/Buttons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const credit = [
  { prix: "10 000" },
  { prix: "30 000" },
  { prix: "50 000" },
  { prix: "100 000" },
  { prix: "300 000" },
  { prix: "1 000 000" },
];

export default function AutoDebitForm() {
  const [frequency, setFrequency] = useState("day");
  const [open, setOpen] = useState(false); // 👈 état pour ouvrir/fermer le dropdown
  const [amount, setAmount] = useState("");
  const [motif, setMotif] = useState("");
  const [activePrice, setActivePrice] = useState<string | null>(null);
  const [items, setItems] = useState([
    { label: "Jour", value: "day" },
    { label: "Semaine", value: "week" },
    { label: "Mois", value: "month" },
  ]);

  return (
      <View style={styles.container}>
        <KeyboardAwareScrollView 
          contentContainerStyle={{ paddingBottom: verticalScale(40)}}
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}  
          extraScrollHeight={40}   
          keyboardOpeningTime={0}  
        >
          <Text style={{paddingBottom: verticalScale(5)}}>
            Fréquence <Text style={{ color: "red" }}>*</Text>
          </Text>

          {/* 👇 Dropdown Picker */}
          <DropDownPicker
            open={open}
            value={frequency}
            items={items}
            setItems={setItems}
            setOpen={setOpen}
            setValue={setFrequency}
            style={styles.picker}
            dropDownContainerStyle={styles.dropdownContainer}
            placeholder="Choisir une fréquence"
            listMode="SCROLLVIEW"
          />

          <TextInput
            label="Entrez un montant *"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
            theme={{
              colors: {
                text: COLORS.textPrimary,
                primary: COLORS.primary,
              },
            }}
          />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Entre </Text>
            <Text style={{ color: COLORS.primary, fontSize: moderateScale(16) }}>
              10 000 GNF - 10 000 000 GNF
            </Text>
          </View>

          <View style={styles.prixSection}>
            {credit.map((c, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.card,
                  activePrice === String(c.prix) && styles.activeCard,
                ]}
                onPress={() => {
                  setActivePrice(String(c.prix));
                  setAmount(String(c.prix));
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.cardGnf,
                    activePrice === String(c.prix) && styles.activeCardText,
                  ]}
                >
                  {c.prix} GNF
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Dates/>
          <TextInput
            label="Motif *"
            value={motif}
            onChangeText={setMotif}
            mode="outlined"
            style={styles.input}
            theme={{
              colors: {
                text: COLORS.textPrimary,
                primary: COLORS.primary,
              },
            }}
          />
          <Buttons handleConfirm={() => {}}/>
        </KeyboardAwareScrollView >
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: moderateScale(8),
    marginTop: verticalScale(10),
    gap: scale(5),
  },
  picker: {
    borderColor: COLORS.primary,
    marginBottom: verticalScale(10),
  },
  dropdownContainer: {
    borderColor: COLORS.primary,
    height: verticalScale(45)
  },
  input: {
    marginBottom: verticalScale(15),
    height: verticalScale(45),
  },
  prixSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  card: {
    width: scale(80),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(15),
    alignItems: "center",
    justifyContent: "center",
  },
  cardGnf: {
    fontSize: moderateScale(14),
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  activeCard: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  activeCardText: {
    color: COLORS.white,
  },
});
