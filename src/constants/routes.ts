// Noms des routes de navigation
export const ROUTES = {
  // Tab Navigator
  MAIN: 'Main',
  HOME: 'Home',
  HISTORIQUE: 'Historique',
  QRSCAN: 'QrScan',
  SERVICES: 'ServiceScreen',
  PROFILE: 'Profile',
  
  // Notifications
  NOTIFICATION: 'Notification',
  
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

  // Credits
  CREDIT_DETAIL: "CreditDetail",
  CREDIT_CONFIRM: "CreditConfirm",

  // Marchands
  DETAIL_MARCHAND: "DetailMarchand",

  // Retraits
  DETAIL_RETRAIT: "DetailRetrait",

  //Merecharger
  ME_RECHARGER: "Merecharger",

} as const;

export type RouteKey = keyof typeof ROUTES;
