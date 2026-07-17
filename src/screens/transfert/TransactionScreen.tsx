import { StatusBar, StyleSheet, View } from "react-native";
import HeaderScreen from "@/src/components/ui/HeaderScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/src/constants";
import TransfertOption from "../quickActions/TransfertOption";
import { scale } from "react-native-size-matters";

export default function TransactionsScreen() {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <HeaderScreen title="Transfert d'argent"/>
            <View style={{ flex: 1, backgroundColor: COLORS.background, padding: scale(20)}}>
             <TransfertOption/>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
})