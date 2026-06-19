import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

const filtered = ["Transfert", "Status", "Coffre", "Type"];

const menuOptions: Record<string, string[]> = {
  Transfert: ["CashMoov", "Orange Money", "Wave"],
  Status: ["En cours", "Terminé", "Echoué"],
  Type: ["Envoyé", "Réçu", "Virement"],
  // Coffre n’a pas de menu
};

export default function FiltreHistory() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleOpen = (button: string) => {
    // Si le bouton a des options, on ouvre/ferme son menu
    if (menuOptions[button]) {
      setOpenMenu(openMenu === button ? null : button);
    } else {
      setOpenMenu(null); // Coffre ou autres sans menu
      console.log(`${button} cliqué`);
    }
  };

  return (
    <View style={styles.container}>
      {filtered.map((btn) => (
        <View key={btn} style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleOpen(btn)}
          >
            <Text style={styles.text}>{btn}</Text>
          </TouchableOpacity>

          {/* Menu déroulant si défini */}
          {openMenu === btn && menuOptions[btn] && (
            <View style={styles.dropdown}>
              {menuOptions[btn].map((option) => (
                <Text key={option} style={styles.dropdownItem}>
                  {option}
                </Text>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    padding: scale(10),
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#eee",
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(15),
    alignItems: "center",
    minWidth: scale(80),
  },
  text: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
  dropdown: {
    backgroundColor: "#f9f9f9",
    borderRadius: moderateScale(10),
    marginTop: verticalScale(5),
    padding: scale(10),
    width: scale(120),
    alignItems: "center",
  },
  dropdownItem: {
    paddingVertical: verticalScale(5),
    fontSize: moderateScale(14),
  },
});
