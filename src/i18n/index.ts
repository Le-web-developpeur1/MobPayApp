import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import fr from "../locales/fr.json";
import en from "../locales/en.json";

const LANGUAGE_KEY = "@app_language";

const getStoredLanguage = async () => {
    try {
        const language = await AsyncStorage.getItem(LANGUAGE_KEY);
        return language || "fr";
    } catch (error) {
        return "fr";
    }
};

export const saveLanguage = async (language: string) => {
    try {
        await AsyncStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {
        console.error("Error saving language:", error);
    }
};

const initI18n = async () => {
    const language = await getStoredLanguage();

    i18n
     .use(initReactI18next)
     .init({
        resources: {
            fr: { translation: fr },
            en: { translation: en },
        },
        lng: language,
        fallbacking: "fr",
        interpolation: {
            escapeValue: false,
        },
        compatibilityJSON: "v3",
     });
};

initI18n();

export default i18n;