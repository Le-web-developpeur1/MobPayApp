import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Contact from '../components/contact/Contact';
import { Confirm } from '../components/modals/ConfirmModal';
import TransfertNational from '../components/tab/services/TransfertNational';
import TransactionEncours from '../components/Transactions/TransactionEncours';
import { ROUTES } from '../constants';
import DetailsInternational from '../screens/international/DetailsInternational';
import OptionTransfert from '../screens/international/OptionTransfert';
import NotificationScreen from '../screens/NotificationScreen';
import ConditionScreen from '../screens/profil/ConditionScreen';
import FraisScreen from '../screens/profil/FraisScreen';
import LimiteScreen from '../screens/profil/LimiteScreen';
import PointsServiceScreen from '../screens/profil/PointsServiceScreen';
import PreferenceNScreen from '../screens/profil/PreferenceNScreen';
import SecuriteScreen from '../screens/profil/SecuriteScreen';
import BeneficiaryScreen from '../screens/quickActions/BeneficiaryScreen';
import CountrySelectorScreen from '../screens/quickActions/CountrySelectorScreen';
import CreditDetailScreen from '../screens/quickActions/CreditDetailScreen';
import CredtitsScreen from '../screens/quickActions/CredtitsScreen';
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
import HistoriqueScreen from '../screens/tab/HistoriqueScreen';
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
import ChangePinScreen from '../screens/profil/ChangePinScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name={ROUTES.MAIN} 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
      {/** Écrans Tab : notification, services */}
      <Stack.Screen name={ROUTES.NOTIFICATION} component={NotificationScreen} options={{ headerShown: false}} />
      <Stack.Screen name={ROUTES.SERVICES} component={ServiceScreen} options={{ headerShown: false}} />
      <Stack.Screen name={ROUTES.HISTORIQUE} component={HistoriqueScreen} />
      <Stack.Screen name={ROUTES.TRANSFERT_NATIONAL} component={TransfertNational} options={{ headerShown: false}}/>

      {/** Écrans de profil */}
      <Stack.Screen name={ROUTES.SECURITE_SCREEN} component={SecuriteScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.PREFERENCE_NOTIF} component={PreferenceNScreen} options={{ headerShown: false}} />
      <Stack.Screen name={ROUTES.LIMITE} component={LimiteScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.FRAIS} component={FraisScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.POINTS_SERVICE} component={PointsServiceScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.CONDITIONS} component={ConditionScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.CHANGE_PIN} component={ChangePinScreen} options={{ headerShown: false}}/>

      {/** WebView */}
      <Stack.Screen name={ROUTES.WEB_VIEW} component={WebScreen} options={{ headerShown: false}}/>

      {/** Écrans de contact */}
      <Stack.Screen name={ROUTES.CONTACT} component={Contact} options={{ headerShown: false}}/>
      
      {/** Écrans QuickActions */}
      <Stack.Screen name={ROUTES.TRANSFERT} component={TransactionsScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.FACTURES} component={FacturesScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.PAIEMENTS_FACTURES} component={Facture} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.DETAIL_FACTURE} component={DetailFacture} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.DETAIL_DEBIT} component={DetailDebitScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.CREDITS} component={CredtitsScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.CREDIT_DETAIL} component={CreditDetailScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.RETRAITS} component={RetraitsScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.ME_RECHARGER} component={Merecharger} options={{ headerShown: false}}/>
      
      {/** Écrans de paiement */}
      <Stack.Screen name={ROUTES.PAIEMENTS_PRODUITS} component={PaiementProduitScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.ESIM} component={EsimDetail} options={{ headerShown: false}} />
      <Stack.Screen name={ROUTES.COUNTRY_SELECTOR} component={CountrySelectorScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.ESIM_SERVICE} component={ServiceSelectorScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.GIFTCARD_SERVICE} component={ServiceSelectorScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.DETAIL_ESIM} component={ProductDetailScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.DETAIL_GIFTCARD} component={ProductDetailScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.ESIM_BENEF} component={BeneficiaryScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.GIFTCARD_BENEF} component={BeneficiaryScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.QRSCAN} component={QrScannerScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.DETAIL_MARCHAND} component={MarchandsScreen} options={{ headerShown: false}}/>

      {/** Écrans de transactions */}
      <Stack.Screen name={ROUTES.NATIONAL} component={NationalScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.INTERNATIONAL} component={InternationalScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.TRANSACTIONS_ENCOURS} component={TransactionEncours} options={{ headerShown: false}} />

      {/** Transfert international */}
      <Stack.Screen name={ROUTES.OPTION_TRANSFERT} component={OptionTransfert} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.DETAILINTERNATIONAL} component={DetailsInternational} options={{ headerShown: false}}/>


      {/** Écrans de transactions CashMoov */}
      <Stack.Screen name={ROUTES.ENVOI} component={EnvoiScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.CONFIRM} component={Confirm} options={{ headerShown: false }}/>

      {/** Écrans de transactions Orange Money */}
      <Stack.Screen name={ROUTES.ENVOI_OM} component={EnvoiOMScreen} options={{ headerShown: false}}/>
      <Stack.Screen name={ROUTES.RECEPTION_OM} component={ReceptionOMScreen} options={{ headerShown: false}}/>
    </Stack.Navigator>
  );
}