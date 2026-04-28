export type RootStackParamList = {
    Main: undefined;
    Notification: undefined;
    SecuriteScreen: undefined;
    PreferenceNotif: undefined;
    Limite: undefined;
    Frais: undefined;
    PointsService: undefined;
    Conditions: undefined;
    Envoi: {
        phone?: string;
        name?: string;
    };
    Confirmation: {
        phone: string;
        name: string;
        amount: string;
    };
    Contact: { 
        type?: "EnvoiOM" | "ReceptionOM" | "Envoi" | "International" | "CreditDetail";
        country?: string;
    } | undefined;
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
    Marchands: undefined;
    Retraits: undefined;
    Plus: undefined;
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
    };
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
    };
    GiftCardBenef: {
        euro?: string;
        gnf?: string;
        euroValue?: string;
        gnfValue?: string;
        country: string;
        name: string;
    };
    EsimConfirm: {
        euro: string;
        gnf: string;
        name: string;
        nom: string;
        email: string;
    };
    GiftCardConfirm: {
        euro?: string;
        gnf?: string;
        euroValue?: string;
        gnfValue?: string;
        name: string;
        nom: string;
        email: string;
    };
    CreditDetail: {
        typeCredit: string;
        phone?: string;
    };
    CreditConfirm: {
        phone: string;
        amount: string;
    };
   
    ConfirmMarchand: {
        phone: string;
        name: string;
        amount: string;
    };
    DetailRetrait?: {
        phone: string;
        name: string;
    };
    ConfirmRetrait: {
        phone: string;
        name: string;
        amount: string;
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
    transactionType?: 'cashmoov' | 'orange_money_envoi' | 'orange_money_reception' | 'paiement_marchand' | 'achat_credit' | 'retrait';
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
    transactionType?: 'cashmoov' | 'orange_money_envoi' | 'orange_money_reception' | 'paiement_marchand' | 'achat_credit' | 'retrait';
};