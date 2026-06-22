import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Contact from '../components/contact/Contact';
import AutoDebit from '../components/home/services/autoDebit/AutoDebit';
import { Confirm } from '../components/modals/ConfirmModal';
import TransfertNational from '../components/tab/services/TransfertNational';
import TransactionEncours from '../components/transactions/TransactionEncours';
import { ROUTES } from '../constants';
import CreatePinScreen from '../screens/auth/CreatePinScreen';
import LoginPinScreen from '../screens/auth/LoginPinScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import OnboardingScreen from '../screens/auth/OnboardingScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import VerificationScreen from '../screens/auth/VerificationScreen';
import DetailsInternational from '../screens/international/DetailsInternational';
import OptionTransfert from '../screens/international/OptionTransfert';
import NotificationScreen from '../screens/NotificationScreen';
import ChangePinScreen from '../screens/profil/ChangePinScreen';
import CompleteProfileScreen from '../screens/profil/CompleteProfileScreen';
import ConditionScreen from '../screens/profil/ConditionScreen';
import FraisScreen from '../screens/profil/FraisScreen';
import LimiteScreen from '../screens/profil/LimiteScreen';
import PointsServiceScreen from '../screens/profil/PointsServiceScreen';
import PreferenceNotifScreen from '../screens/profil/PreferenceNotifScreen';
import SecuriteScreen from '../screens/profil/SecuriteScreen';
import BeneficiaryScreen from '../screens/quickActions/BeneficiaryScreen';
import CountrySelectorScreen from '../screens/quickActions/CountrySelectorScreen';
import CreditDetailScreen from '../screens/quickActions/CreditDetailScreen';
import CreditsScreen from '../screens/quickActions/CreditsScreen';
import DetailDebitScreen from '../screens/quickActions/DetailDebitScreen';
import DetailFacture from '../screens/quickActions/DetailFacture';
import EsimDetail from '../screens/quickActions/EsimDetail';
import Facture from '../screens/quickActions/Facture';
import FacturesScreen from '../screens/quickActions/FacturesScreen';
import MarchandsScreen from '../screens/quickActions/MarchandsScreen';
import Merecharger from '../screens/quickActions/Merecharger';
import PaiementProduitScreen from '../screens/quickActions/PaiementProduitScreen';
import ProductDetailScreen from '../screens/quickActions/ProductDetailScreen';
import RetraitsScreen from '../screens/quickActions/RetraitsScreen';
import ServiceSelectorScreen from '../screens/quickActions/ServiceSelectorScreen';
import SearchScreen from '../screens/SearchScreen';
import HistoriqueScreen from '../screens/tab/HistoriqueScreen';
import ProfileScreen from '../screens/tab/ProfilScreen';
import QrScannerScreen from '../screens/tab/QrScannerScreen';
import ServiceScreen from '../screens/tab/ServiceScreen';
import EnvoiOMScreen from '../screens/transfert/EnvoiOMScreen';
import EnvoiScreen from '../screens/transfert/EnvoiScreen';
import InternationalScreen from '../screens/transfert/InternationalScreen';
import NationalScreen from '../screens/transfert/NationalScreen';
import ReceptionOMScreen from '../screens/transfert/ReceptionOMScreen';
import TransactionsScreen from '../screens/transfert/TransactionScreen';
import WebScreen from '../screens/WebScreen';
import TabNavigator from './TabNavigator';
import { RootStackParamList } from './types';
import ChatbotScreen from '../screens/ChatbotScreen';
import Credit from '../screens/quickActions/Credit';
import History from '../screens/tab/History';
import Recharger from '../screens/quickActions/Recharger';

const Stack = createNativeStackNavigator<RootStackParamList>();



export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName={ROUTES.ONBOARDING} screenOptions={{ animation: 'none', gestureEnabled: false, headerShown: false }}>

      {/* ============== AUTHENTIFICATION ============== */}
      <Stack.Group>
        <Stack.Screen name={ROUTES.ONBOARDING} component={OnboardingScreen} />
        <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
        <Stack.Screen name={ROUTES.LOGIN_PIN} component={LoginPinScreen} />
        <Stack.Screen name={ROUTES.REGISTER} component={RegisterScreen} />
        <Stack.Screen name={ROUTES.VERIFICATION} component={VerificationScreen} />
        <Stack.Screen name={ROUTES.CREATE_PIN} component={CreatePinScreen} />
      </Stack.Group>

      {/* ============== APP PRINCIPALE (tabs) ============== */}
      <Stack.Group>
        <Stack.Screen name={ROUTES.MAIN} component={TabNavigator} />
      </Stack.Group>

      {/* ============== ÉCRANS TRANSVERSAUX (accessibles depuis les tabs) ============== */}
      <Stack.Group>
        <Stack.Screen name={ROUTES.SEARCH} component={SearchScreen} />
        <Stack.Screen name={ROUTES.NOTIFICATION} component={NotificationScreen} />
        <Stack.Screen name={ROUTES.SERVICES} component={ServiceScreen} />
        <Stack.Screen name={ROUTES.HISTORIQUE} component={HistoriqueScreen} />
        <Stack.Screen name={ROUTES.TRANSFERT_NATIONAL} component={TransfertNational} />
        <Stack.Screen name={ROUTES.WEB_VIEW} component={WebScreen} />
        <Stack.Screen name={ROUTES.CONTACT} component={Contact} />
        <Stack.Screen name={ROUTES.CHATBOT} component={ChatbotScreen} />
      </Stack.Group>

      {/* ============== PROFIL ============== */}
      <Stack.Group>
        <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
        <Stack.Screen name={ROUTES.COMPLETE_PROFILE} component={CompleteProfileScreen} />
        <Stack.Screen name={ROUTES.SECURITE_SCREEN} component={SecuriteScreen} />
        <Stack.Screen name={ROUTES.PREFERENCE_NOTIF} component={PreferenceNotifScreen} />
        <Stack.Screen name={ROUTES.LIMITE} component={LimiteScreen} />
        <Stack.Screen name={ROUTES.FRAIS} component={FraisScreen} />
        <Stack.Screen name={ROUTES.POINTS_SERVICE} component={PointsServiceScreen} />
        <Stack.Screen name={ROUTES.CONDITIONS} component={ConditionScreen} />
        <Stack.Screen name={ROUTES.CHANGE_PIN} component={ChangePinScreen} />
      </Stack.Group>

      {/* ============== QUICK ACTIONS (factures, crédits, retraits, esim/giftcard...) ============== */}
      <Stack.Group>
        <Stack.Screen name={ROUTES.TRANSFERT} component={TransactionsScreen} />
        <Stack.Screen name={ROUTES.FACTURES} component={FacturesScreen} />
        <Stack.Screen name={ROUTES.PAIEMENTS_FACTURES} component={Facture} />
        <Stack.Screen name={ROUTES.DETAIL_FACTURE} component={DetailFacture} />
        <Stack.Screen name={ROUTES.DETAIL_DEBIT} component={DetailDebitScreen} />
        <Stack.Screen name={ROUTES.CREDITS} component={CreditsScreen} />
        <Stack.Screen name={ROUTES.CREDIT_DETAIL} component={CreditDetailScreen} />
        <Stack.Screen name={ROUTES.RETRAITS} component={RetraitsScreen} />
        <Stack.Screen name={ROUTES.ME_RECHARGER} component={Merecharger} />
        <Stack.Screen name={ROUTES.PAIEMENTS_PRODUITS} component={PaiementProduitScreen} />
        <Stack.Screen name={ROUTES.ESIM} component={EsimDetail} />
        <Stack.Screen name={ROUTES.COUNTRY_SELECTOR} component={CountrySelectorScreen} />
        <Stack.Screen name={ROUTES.ESIM_SERVICE} component={ServiceSelectorScreen} />
        <Stack.Screen name={ROUTES.GIFTCARD_SERVICE} component={ServiceSelectorScreen} />
        <Stack.Screen name={ROUTES.DETAIL_ESIM} component={ProductDetailScreen} />
        <Stack.Screen name={ROUTES.DETAIL_GIFTCARD} component={ProductDetailScreen} />
        <Stack.Screen name={ROUTES.ESIM_BENEF} component={BeneficiaryScreen} />
        <Stack.Screen name={ROUTES.GIFTCARD_BENEF} component={BeneficiaryScreen} />
        <Stack.Screen name={ROUTES.QRSCAN} component={QrScannerScreen} />
        <Stack.Screen name={ROUTES.DETAIL_MARCHAND} component={MarchandsScreen} />
      </Stack.Group>

      {/* ============== TRANSFERTS (national / international / OM / CashMoov) ============== */}
      <Stack.Group>
        <Stack.Screen name={ROUTES.NATIONAL} component={NationalScreen} />
        <Stack.Screen name={ROUTES.INTERNATIONAL} component={InternationalScreen} />
        <Stack.Screen name={ROUTES.TRANSACTIONS_ENCOURS} component={TransactionEncours} />
        <Stack.Screen name={ROUTES.AUTO_DEBIT} component={AutoDebit} />
        <Stack.Screen name={ROUTES.OPTION_TRANSFERT} component={OptionTransfert} />
        <Stack.Screen name={ROUTES.DETAILINTERNATIONAL} component={DetailsInternational} />
        <Stack.Screen name={ROUTES.ENVOI} component={EnvoiScreen} />
        <Stack.Screen name={ROUTES.CONFIRM} component={Confirm} />
        <Stack.Screen name={ROUTES.ENVOI_OM} component={EnvoiOMScreen} />
        <Stack.Screen name={ROUTES.RECEPTION_OM} component={ReceptionOMScreen} />
      </Stack.Group>

      {/* ============== Crédits, me recharger ============== */}
      <Stack.Group>
        <Stack.Screen name='Credit' component={Credit}/>
        <Stack.Screen name='History' component={History} />
        <Stack.Screen name='Recharger' component={Recharger} />
      </Stack.Group>

    </Stack.Navigator>
  );
}