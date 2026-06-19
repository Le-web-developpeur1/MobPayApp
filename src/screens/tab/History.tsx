import HeaderScreen from '@/src/components/ui/HeaderScreen';
import { COLORS } from '@/src/constants';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import DateRange from '@/src/components/ui/DateRange';
import FiltreHistory from '@/src/components/ui/FiltreHistory';



export default function History() {
    const [search, setSearch]    = useState("");
    
  return (
    <SafeAreaView style={styles.safe}>
        <HeaderScreen title='Historique des transactions' />
        <View style={styles.container}>
            {/** Input Search */}
            <View style={styles.search}>
                <TextInput 
                    style={styles.input}
                    label="Rechercher une transaction"
                    theme={{
                        colors: {
                            placeholder: COLORS.textSecondary,
                            text: COLORS.textPrimary,
                            primary: COLORS.primary,
                        },
                    }}
                    value={search}
                    onChangeText={setSearch}
                    mode="outlined"
                />
                <View style={styles.iconSearch}>
                <TouchableOpacity
                    
                >
                    <Ionicons name='search' size={scale(25)}/>
                </TouchableOpacity>
                </View>
            </View>
            {/** Choix des dates */}
            <DateRange/>
            <FiltreHistory/>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: scale(15),
        paddingVertical: verticalScale(10),
        gap: scale(10)
    },
    search: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.white,
        fontSize: moderateScale(20),
    },
    iconSearch: {
        height: verticalScale(52),
        width: scale(55),
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        right: scale(5),
        top: verticalScale(2.58),
        borderRadius: moderateScale(2)
    },
    date: {

    }
})