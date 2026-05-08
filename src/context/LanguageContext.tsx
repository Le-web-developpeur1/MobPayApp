import React, { createContext, useContext, useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import { saveLanguage } from "../i18n";

interface LanguageContextType {
    currentLanguage: string;
    changeLanguage: (lang: string) => Promise<void>;
    availableLanguages: { code: string, name: string, flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const availableLanguages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    const changeLanguage = async (lang: string) => {
        await i18n.changeLanguage(lang);
        await saveLanguage(lang);
        setCurrentLanguage(lang);
    };

    return (
        <LanguageContext.Provider
           value={{
            currentLanguage,
            changeLanguage,
            availableLanguages
           }}
        >
           {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be user within LanguageProvider");
    }

    return context;
};