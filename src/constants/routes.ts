// Noms des routes de navigation
export const ROUTES = {
  // Tab Navigator
  MAIN: 'Main',
  HOME: 'Home',
  HISTORIQUE: 'Historique',
  QRSCAN: 'QrScan',
  SERVICES: 'ServiceScreen',
  SHOPPING: "Shopping",


  PROFILE: 'Profile',
  
  // Auth
  ONBOARDING: 'Onboarding',
  LOGIN: 'Login',
  LOGIN_PIN: 'LoginPin',
  REGISTER: 'Register',
  VERIFICATION: 'Verification',
  CREATE_PIN: 'CreatePin',
  
  // Notifications
  NOTIFICATION: 'Notification',
  SEARCH: 'Search',
  
  // Profil
  SECURITE_SCREEN: 'SecuriteScreen',
  PREFERENCE_NOTIF: 'PreferenceNotif',
  LIMITE: 'Limite',
  FRAIS: 'Frais',
  POINTS_SERVICE: 'PointsService',
  CONDITIONS: 'Conditions',
  CHANGE_PIN: 'ChangePin',
  
  // WebView
  WEB_VIEW: 'WebView',
  
  // Contacts
  CONTACT: 'Contact',

  // Quick Actions
  TRANSFERT: 'TransfertScreen',
  FACTURES: 'Factures',
  CREDITS: 'Credits',
  MARCHANDS: 'Marchands',
  RETRAITS: 'Retraits',
  PLUS: 'Plus',

  //Transactions
  NATIONAL: 'National',
  INTERNATIONAL: 'International',
  TRANSACTIONS_ENCOURS: "TransactionEncours",
  OPTION_TRANSFERT: "OptionTransfert",
  DETAILINTERNATIONAL: "DetailsInternational",

  TRANSFERT_NATIONAL: "TransertNational",

  // Transactions CashMoov
  ENVOI: 'Envoi',
  CONFIRMATION: 'Confirmation',
  CONFIRM: 'Confirm',
  
  // Transactions Orange Money
  ENVOI_OM: 'EnvoiOM',
  RECEPTION_OM: 'ReceptionOM',

  // Paiements
  PAIEMENTS_PRODUITS : "PaiementProduit",
  ESIM: "EsimDetail",
  PAIEMENTS_FACTURES : "PaiementFacture",
  DETAIL_FACTURE: "DetailFacture",
  DETAIL_DEBIT: "DetailDebit",
  COUNTRY_SELECTOR : "CountrySelector",
  ESIM_SERVICE : "ESimService",
  GIFTCARD_SERVICE : "GiftCardService",
  DETAIL_ESIM : "DetailEsim",
  DETAIL_GIFTCARD : "DetailGiftCard",
  ESIM_BENEF : "EsimBenef",
  GIFTCARD_BENEF : "GiftCardBenef",

  //Services
  CREDIT_DETAIL: "CreditDetail",
  CREDIT_CONFIRM: "CreditConfirm",
  DETAIL_MARCHAND: "DetailMarchand",
  DETAIL_RETRAIT: "DetailRetrait",
  ME_RECHARGER: "Merecharger",
  AUTO_DEBIT: "AutoDebit"

} as const;

export type RouteKey = keyof typeof ROUTES;
