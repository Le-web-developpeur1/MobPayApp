import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { COLORS } from "@/src/constants";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Dates from "./Dates";
import Buttons from "@/src/components/ui/Buttons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AutoDebitConfirmModal } from "@/src/components/modals/AutoDebitConfirmModal";
import { autoDebitStorage } from "@/src/services/autoDebitStorage";

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
  const [open, setOpen] = useState(false); 
  const [amount, setAmount] = useState("");
  const [motif, setMotif] = useState("");
  const [activePrice, setActivePrice] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  const [items, setItems] = useState([
    { label: "Jour", value: "day" },
    { label: "Semaine", value: "week" },
    { label: "Mois", value: "month" },
  ]);

  const validateForm = () => {
    if (!amount || amount === "0") {
      Alert.alert("Erreur", "Veuillez entrer un montant valide");
      return false;
    }

    const numAmount = parseInt(amount.replace(/\s/g, ''));
    if (numAmount < 10000 || numAmount > 10000000) {
      Alert.alert("Erreur", "Le montant doit être entre 10 000 et 10 000 000 GNF");
      return false;
    }

    if (!startDate) {
      Alert.alert("Erreur", "Veuillez sélectionner une date de début");
      return false;
    }

    if (!endDate) {
      Alert.alert("Erreur", "Veuillez sélectionner une date de fin");
      return false;
    }

    if (startDate >= endDate) {
      Alert.alert("Erreur", "La date de fin doit être après la date de début");
      return false;
    }

    if (!motif.trim()) {
      Alert.alert("Erreur", "Veuillez entrer un motif");
      return false;
    }

    return true;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      setShowConfirmModal(true);
    }
  };

  const handleSuccess = async (data: any) => {
    try {
      const savedDebit = await autoDebitStorage.save({
        frequency: data.frequency,
        amount: data.amount,
        startDate: data.startDate?.toISOString() || '',
        endDate: data.endDate?.toISOString() || '',
        motif: data.motif,
      });

      console.log('Débit enregistré avec succès:', savedDebit); // Pour debug

      // Réinitialiser le formulaire
      setAmount("");
      setMotif("");
      setActivePrice(null);
      setStartDate(null);
      setEndDate(null);
      setFrequency("day");
      
      Alert.alert(
        "Succès",
        "Le débit automatique a été programmé avec succès",
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error); // Pour debug
      Alert.alert("Erreur", "Une erreur est survenue lors de l'enregistrement");
    }
  };

  return (
      <View style={styles.container}>
        <KeyboardAwareScrollView 
          contentContainerStyle={{ paddingBottom: verticalScale(20)}}
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}  
          extraScrollHeight={20}   
          keyboardOpeningTime={0}  
        >
          <Text style={{paddingBottom: verticalScale(5)}}>
            Fréquence <Text style={{ color: "red" }}>*</Text>
          </Text>

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
            textStyle={{
              fontSize: moderateScale(14),
              color: COLORS.textPrimary,
            }}
            labelStyle={{
              fontSize: moderateScale(14),
              fontWeight: '500',
            }}
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
          
          <Dates
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
          
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
          <Buttons handleConfirm={handleConfirm}/>
        </KeyboardAwareScrollView>

        <AutoDebitConfirmModal
          visible={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          data={{
            frequency,
            amount,
            startDate,
            endDate,
            motif,
          }}
          onSuccess={handleSuccess}
        />
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
    minHeight: verticalScale(50),
  },
  dropdownContainer: {
    borderColor: COLORS.primary,
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
