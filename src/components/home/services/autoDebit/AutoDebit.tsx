import { COLORS } from '@/src/constants';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import HeaderScreen from '../../../ui/HeaderScreen';
import TransfertProgramme from './TransfertProgramme';
import HistoriqueDebit from './HistoriqueDebit';
import { useRoute } from '@react-navigation/native';

export default function AutoDebit() {
    const [activeTab, setActivTab] = useState<"transfert" | "historique">("transfert");
    const [refreshKey, setRefreshKey] = useState(0);
    const route = useRoute();

    const { type = "programme" } = (route.params || {}) as { type?: string }

    // Rafraîchir l'historique quand on change d'onglet vers "historique"
    useEffect(() => {
        if (activeTab === "historique") {
            setRefreshKey(prev => prev + 1);
        }
    }, [activeTab]);

  return (
    <SafeAreaView style={styles.safeArea}>
        <HeaderScreen title='Transfert Programmé'/>
        <View style={styles.container}>
            {/* <ScrollView
                contentContainerStyle={styles.scrollContent}
            >

            </ScrollView> */}
                <View style={styles.viewTab}>
                    <TouchableOpacity
                        onPress={() => setActivTab("transfert")}
                    >
                        <Text 
                            style={[
                                styles.tab,
                                activeTab === "transfert" && styles.activeTab,
                                {borderTopLeftRadius: moderateScale(7), borderBottomLeftRadius: moderateScale(7)}
                            ]}
                        >
                            Programmer un transfert
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setActivTab("historique")}
                    >
                        <Text 
                            style={[
                                styles.tab,
                                activeTab === "historique" && styles.activeTab, 
                                {width: scale(150), borderTopRightRadius: moderateScale(7), borderBottomRightRadius: moderateScale(7)}
                            ]}
                        >
                            Historique
                        </Text>
                    </TouchableOpacity>
                </View>
                
                {activeTab === "transfert" ? (
                        <TransfertProgramme type={type}/>
                    ) : (
                        <HistoriqueDebit key={refreshKey}/>
                    )}
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(10),
        gap: scale(8)
    },
    scrollContent: {
        paddingBottom: verticalScale(20),
    },
    viewTab: {
        flexDirection: 'row',
        justifyContent: "space-between",
        borderWidth: scale(1),
        borderColor: "#2A4793",
        borderRadius: moderateScale(8),
        marginBottom: verticalScale(10),
    },
    tab: {
        fontSize: moderateScale(14),
        fontWeight: "600",
        color: COLORS.primary,
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(12),
        textAlign: "center",

    },
    activeTab: {
        color: COLORS.white, 
        fontWeight: "700", 
        backgroundColor: COLORS.primary,
        paddingVertical: verticalScale(12)
    },
})