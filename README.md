# 💰 MobPay - Application Mobile de Paiement

Application mobile de transfert d'argent et de paiement développée avec React Native et Expo.

## 📱 Fonctionnalités

### 🔐 Authentification
- Connexion avec numéro de téléphone
- Code PIN à 4 chiffres
- Authentification biométrique (empreinte digitale / Face ID)
- Vérification par SMS
- Création de compte

### 💸 Transferts d'argent
- **Transferts nationaux** : Cash Moov, Orange Money (envoi/réception)
- **Transferts internationaux** : Vers 63 pays
- Scan QR code pour transferts rapides
- Gestion des bénéficiaires
- Historique des transactions

### 💳 Paiements
- Paiement de factures (électricité, eau, internet, etc.)
- Paiement marchand avec QR code
- Achat de crédits téléphoniques
- Produits digitaux (eSIM, cartes cadeaux)

### 🏦 Services
- Retrait d'argent chez les agents
- Recharge de compte
- Consultation du solde
- Notifications en temps réel

### 👤 Profil
- Gestion du compte
- Modification du PIN
- Paramètres de sécurité
- Limites de transfert
- Historique complet

### 🌍 Multilingue
- Français 🇫🇷
- Anglais 🇬🇧
- Changement de langue dans les paramètres

## 🚀 Installation

### Prérequis
- Node.js (v18 ou supérieur)
- npm ou yarn
- Expo CLI
- Un émulateur Android/iOS ou l'application Expo Go

### Étapes d'installation

1. **Cloner le projet**
   ```bash
   git clone <url-du-repo>
   cd mobpay
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Démarrer l'application**
   ```bash
   npx expo start
   ```

4. **Lancer sur un appareil**
   - Appuyez sur `a` pour Android
   - Appuyez sur `i` pour iOS
   - Scannez le QR code avec Expo Go

## 📂 Structure du projet

```
mobpay/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── auth/           # Composants d'authentification
│   │   ├── home/           # Composants de l'écran d'accueil
│   │   ├── modals/         # Modaux (confirmation, code PIN, etc.)
│   │   ├── contact/        # Gestion des contacts
│   │   ├── paiement/       # Composants de paiement
│   │   ├── profil/         # Composants du profil
│   │   ├── tab/            # Composants des onglets
│   │   ├── Transactions/   # Composants de transactions
│   │   └── ui/             # Composants UI génériques
│   │
│   ├── screens/            # Écrans de l'application
│   │   ├── auth/          # Écrans d'authentification
│   │   ├── tab/           # Écrans des onglets principaux
│   │   ├── transfert/     # Écrans de transfert
│   │   ├── international/ # Transferts internationaux
│   │   ├── quickActions/  # Actions rapides
│   │   └── profil/        # Écrans du profil
│   │
│   ├── navigation/         # Configuration de la navigation
│   │   ├── AppNavigator.tsx
│   │   ├── TabNavigator.tsx
│   │   └── types.ts
│   │
│   ├── constants/          # Constantes (couleurs, routes)
│   │   ├── colors.ts
│   │   ├── routes.ts
│   │   └── index.ts
│   │
│   ├── context/           # Contextes React
│   │   └── LanguageContext.tsx
│   │
│   ├── i18n/              # Configuration i18n
│   │   └── index.ts
│   │
│   └── locales/           # Fichiers de traduction
│       ├── fr.json        # Traductions françaises
│       └── en.json        # Traductions anglaises
│
├── assets/                # Images et ressources
│   └── images/
│
├── App.js                 # Point d'entrée de l'application
└── package.json
```

## 🛠️ Technologies utilisées

### Core
- **React Native** - Framework mobile
- **Expo** - Plateforme de développement
- **TypeScript** - Typage statique

### Navigation
- **React Navigation** - Navigation entre écrans
- **Bottom Tabs** - Navigation par onglets
- **Native Stack** - Navigation en pile

### UI/UX
- **React Native Reanimated** - Animations fluides
- **React Native Gesture Handler** - Gestion des gestes
- **React Native Size Matters** - Responsive design
- **Expo Vector Icons** - Icônes

### Fonctionnalités
- **i18next** - Internationalisation
- **AsyncStorage** - Stockage local
- **Expo Camera** - Scan QR code
- **Expo Contacts** - Accès aux contacts
- **Expo Local Authentication** - Biométrie
- **Expo Haptics** - Retour haptique

## 🎨 Thème et couleurs

L'application utilise une palette de couleurs cohérente définie dans `src/constants/colors.ts` :
- **Primary** : Bleu (#2A4793)
- **Secondary** : Jaune (#FFD700)
- **Success** : Vert
- **Error** : Rouge
- **Background** : Gris clair

## 🌐 Internationalisation

L'application supporte plusieurs langues grâce à i18next :

### Ajouter une nouvelle langue

1. Créer un fichier dans `src/locales/` (ex: `es.json`)
2. Ajouter les traductions
3. Importer dans `src/i18n/index.ts`
4. Ajouter dans `availableLanguages` du `LanguageContext`

### Utiliser les traductions

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return <Text>{t('common.welcome')}</Text>;
}
```

## 🔒 Sécurité

- Code PIN à 4 chiffres pour toutes les transactions
- Authentification biométrique optionnelle
- Chiffrement des données sensibles
- Validation des entrées utilisateur

## 📱 Écrans principaux

1. **Onboarding** - Introduction à l'application
2. **Login** - Connexion avec téléphone + PIN
3. **Home** - Tableau de bord avec solde et actions rapides
4. **Services** - Tous les services disponibles
5. **Historique** - Liste des transactions
6. **QR Scanner** - Scan pour paiements/transferts
7. **Profil** - Paramètres et informations du compte

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Lancer le linter
npm run lint
```

## 📦 Build

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

### Web
```bash
npm run web
```

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence privée.

## 👥 Auteurs

- **Équipe MobPay** - Développement initial

## 📞 Support

Pour toute question ou problème :
- Email : support@mobpay.com
- Documentation : [docs.mobpay.com](https://docs.mobpay.com)

---

**Note** : Cette application est en développement actif. Certaines fonctionnalités peuvent être incomplètes ou en cours d'amélioration.
