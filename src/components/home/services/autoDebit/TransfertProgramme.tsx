import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CountryCodePicker, { COUNTRIES, Country} from '@/src/components/auth/CountryCodePicker';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '@/src/constants';
import { TextInput } from "react-native-paper";
import Contact from '@/src/components/contact/Contact';
import AutoDebitForm from './AutoDebitForm';

type Programme = {
    type: string;
}

export default function TransfertProgramme({ type } : Programme) {

    const [phone, setPhone] = useState("");
    const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);

    const [showForm, setShowForm] = useState(false);

  return (
    <View style={{flex: 1}}>
        <View style={styles.phoneInput}>
            <View style={styles.country}>
                <CountryCodePicker
                    selectedCountry={selectedCountry}
                    onSelectCountry={setSelectedCountry}
                />
            </View>
            
            <View style={styles.inputWrapper}>
            <TextInput 
                style={styles.input}
                label="Saisissez un numéro"
                theme={{
                    colors: {
                    placeholder: COLORS.white, // couleur du label quand il est en mode placeholder
                    text: COLORS.textPrimary,      // couleur du texte saisi
                    primary: COLORS.primary,       // couleur de la bordure et du label actif
                    },
                }}
                value={phone}
                onChangeText={setPhone}
                mode="outlined"
            />
            </View>
        </View>
        {showForm ? (
            <AutoDebitForm/>
        ): (

        <View style={styles.container}>
            <Contact 
                searchExterne={phone} 
                showSearchBar={false} 
                onSelectContact={(contact) => {
                    setPhone(contact.phoneNumbers?.[0]?.number || "");
                    setShowForm(true);
                }}
            />
        </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    phoneInput: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(10),
        justifyContent: "center",
    },
    country: {
        borderWidth: scale(1),
        borderColor: COLORS.border,
        borderRadius: moderateScale(8),
    },
    inputWrapper: {
        flex: 1,
    },
    input: {
        height: verticalScale(45),
        top: scale(-2.5),
    },
    recent: {
        fontWeight: "bold",
        fontSize: moderateScale(18),
    },
})