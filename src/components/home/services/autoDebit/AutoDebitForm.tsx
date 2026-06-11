import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { COLORS } from "@/src/constants";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

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
  const [activePrice, setActivePrice] = useState<string | null>(null);

  const frequencyOptions = [
    { label: "Jour", value: "day" },
    { label: "Semaine", value: "week" },
    { label: "Mois", value: "month" },
  ];

  return (
    <ScrollView
      contentContainerStyle={{flex: 1, paddingBottom: verticalScale(20)}}
    >
      <View style={styles.container}>
        <Text style={{paddingBottom: verticalScale(5)}}>
          Fréquence <Text style={{ color: "red" }}>*</Text>
        </Text>

        {/* 👇 Dropdown Picker */}
        <DropDownPicker
          open={open}
          value={frequency}
          items={frequencyOptions}
          setOpen={setOpen}
          setValue={setFrequency}
          style={styles.picker}
          dropDownContainerStyle={styles.dropdownContainer}
          placeholder="Choisir une fréquence"
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
