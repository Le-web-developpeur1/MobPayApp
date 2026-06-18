export type RootStackParamList = {
    Main: undefined;
    Onboarding: undefined;
    Login: undefined;
    LoginPin: {
        phone: string;
    };
    Register?: {
        numero: string;
    };
    Verification: {
        phone: string;
    };
    CreatePin: {
        phone: string;
    };
    Profile: undefined;
    CompleteProfile: undefined;
    Notification: undefined;
    Search: undefined;
    ServiceScreen: undefined;
    SecuriteScreen: undefined;
    PreferenceNotif: undefined;
    Historique: undefined;
    Limite: undefined;
    Frais: undefined;
    PointsService: undefined;
    Conditions: undefined;
    TransactionEncours: undefined;
    ChangePin: undefined;
    WebView: {
        url: string;
    };
    Envoi: {
        phone?: string;
        name?: string;
        type?: string;
    };
    Contact?: { 
        type?: "EnvoiOM" | "ReceptionOM" | "Envoi" | "International" | "CreditDetail" | "programme";
        country?: string;
    };
    EnvoiOM: {
        name?: string;
        phone: string;
        type: "EnvoiOM"
    };
    ReceptionOM: {
        name?: string;
        phone: string;
        type:"ReceptionOM"
    };
    Confirm: {
        phone: string;
        name: string;
        amount: string;
    },
    TransfertScreen: undefined;
    Factures: undefined;
    Credits: undefined;
    Retraits: undefined;
    National: undefined;
    International: undefined;
    OptionTransfert: {
        country: string;
    };
    DetailsInternational: {
        country?: string;
        phone?: string;
        name?: string;
    };
    PaiementProduit: undefined;
    PaiementFacture: undefined;
    DetailDebit: {
        headerTitle: string;
    };
    CountrySelector: {
        type: 'esim' | 'giftcard';
    };
    ESimService: {
        country: string;
    };
    GiftCardService: {
        country: string;
    };
    DetailEsim: {
        country: string;
        logo: any;
        name: string;
        typeEsim: string;
    };
    EsimDetail: {
        type: string,
    }
    DetailGiftCard: {
        country: string;
        name: string;
        logo: any;
    };
    EsimBenef: {
        euro: string;
        gnf: string;
        country: string;
        name: string;
        typeEsim: string;
    };
    GiftCardBenef: {
        euro?: string;
        gnf?: string;
        euroValue?: string;
        gnfValue?: string;
        country: string;
        name: string;
    };
    CreditDetail: {
        typeCredit: string;
        phone?: string;
    };
   
    DetailFacture: {
        typeFacture: "postpaye" | "prepaye";
    };
    DetailMarchand: {
        name?: string;
        phone?: string;
    }
    QrScan: {
        returnScreen?: string;
    } | undefined;
    Merecharger: undefined;
    TransertNational: undefined;
    AutoDebit?: {
        type?: string;
    };
    Chatbot: undefined;
};

export interface Beneficiaire {
    name: string;
    phone: string;
};
  
export interface Transaction {
    montant: string;
    frais: string;
    taxe: string;
    total: string;
};
  
export interface ConfirmModalProps {
    visible: boolean;
    onClose: () => void;
    beneficiaire: Beneficiaire;
    transaction: Transaction;
    isInternational?: boolean;
    country?: string;
    amountReceived?: string;
    exchangeRate?: string;
    transactionType?: 'cashmoov' | 'orange_money_envoi' | 'orange_money_reception' | 'paiement_marchand' | 'achat_credit' | 'retrait' | 'paiement_facture';
};

export interface CodeModalProps {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
    amount: string;
    status: string;
    name: string;
    date: string;
    transactionId: string;
    fees: string;
    number: string;
    note?: string;
    isInternational?: boolean;
    country?: string;
    amountReceived?: string;
    exchangeRate?: string;
    transactionType?: 'cashmoov' | 'orange_money_envoi' | 'orange_money_reception' | 'paiement_marchand' | 'achat_credit' | 'retrait' | 'paiement_facture';
};