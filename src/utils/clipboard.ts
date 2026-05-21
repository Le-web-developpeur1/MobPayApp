import * as Clipboard from "expo-clipboard";
import { ToastAndroid } from "react-native";

export const copyTransactionId = async (transactionId: string) => {
    try {
        await Clipboard.setStringAsync(transactionId);
        ToastAndroid.show("ID copié dans le presse-papier", ToastAndroid.SHORT);
    } catch (error) {
        ToastAndroid.show("Erreur lors de la copie", ToastAndroid.SHORT);   
    }
};