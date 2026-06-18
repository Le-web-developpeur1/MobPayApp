import { AutoDebitConfirmModal } from "@/src/components/modals/AutoDebitConfirmModal";
import Buttons from "@/src/components/ui/Buttons";
import { COLORS } from "@/src/constants";
import { autoDebitStorage } from "@/src/services/autoDebitStorage";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput } from "react-native-paper";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Dates from "./Dates";

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
          contentContainerStyle={{ paddingBottom: verticalScale(100)}}
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}  
          extraScrollHeight={100}   
          keyboardOpeningTime={0}
          enableResetScrollToCoords={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.sectionTitle}>Fréquence de transfert</Text>
          <DropDownPicker
            open={open}
            value={frequency}
            items={items}
            setItems={setItems}
            setOpen={setOpen}
            setValue={setFrequency}
            style={styles.picker}
            dropDownContainerStyle={styles.dropdownContainer}
            placeholder="Choisir une fréquence *"
            listMode="SCROLLVIEW"
            textStyle={{
              fontSize: moderateScale(15),
              color: COLORS.textPrimary,
            }}
            labelStyle={{
              fontSize: moderateScale(15),
              fontWeight: '600',
            }}
          />

          <Text style={styles.sectionTitle}>Montant</Text>
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
                background: COLORS.background,
              },
            }}
          />

          <View style={styles.rangeInfo}>
            <Text style={styles.rangeText}>Entre </Text>
            <Text style={styles.rangeAmount}>
              10 000 GNF - 10 000 000 GNF
            </Text>
          </View>

          <Text style={styles.quickAmountsTitle}>Montants rapides</Text>
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
          
          <Text style={styles.sectionTitle}>Période</Text>
          <Dates
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
          
          <Text style={styles.sectionTitle}>Motif du transfert</Text>
          <TextInput
            label="Motif *"
            value={motif}
            onChangeText={setMotif}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={[styles.input, { height: verticalScale(50) }]}
            theme={{
              colors: {
                text: COLORS.textPrimary,
                primary: COLORS.primary,
                background: COLORS.background,
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
    paddingTop: verticalScale(10),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(10),
    marginTop: verticalScale(5),
  },
  picker: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
    borderWidth: scale(1),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(15),
    minHeight: verticalScale(50),
  },
  dropdownContainer: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.border,
    borderWidth: scale(1),
  },
  input: {
    backgroundColor: COLORS.background,
    marginBottom: verticalScale(15),
    height: verticalScale(50),
  },
  rangeInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },
  rangeText: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
  },
  rangeAmount: {
    fontSize: moderateScale(14),
    color: COLORS.primary,
    fontWeight: '700',
  },
  quickAmountsTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: verticalScale(8),
  },
  prixSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: verticalScale(15),
  },
  card: {
    width: '31%',
    backgroundColor: COLORS.white,
    borderWidth: scale(1.5),
    borderColor: COLORS.border,
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(16),
    marginBottom: verticalScale(12),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: verticalScale(2) },
    shadowOpacity: 0.06,
    shadowRadius: moderateScale(4),
    elevation: 2,
  },
  cardGnf: {
    fontSize: moderateScale(15),
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
