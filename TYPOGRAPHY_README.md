# 🎨 Système de Typographie MobPay

## 📋 Résumé

Un système de typographie complet, responsive et cohérent pour React Native.

### ✨ Fonctionnalités

✅ **Tailles fixes** - Non impactées par les paramètres système (par défaut)  
✅ **Responsive** - S'adapte automatiquement à la taille de l'écran  
✅ **Cohérent** - Toutes les tailles centralisées en un seul endroit  
✅ **Flexible** - Option d'accessibilité disponible (`allowFontScaling`)  
✅ **Simple** - Composants prédéfinis pour une utilisation rapide  

---

## 🚀 Quick Start

### 1. Import
```tsx
import { AppText, H1, BodyText, Caption } from '@/components/ui';
```

### 2. Utilisation basique
```tsx
<H1>Mon titre</H1>
<BodyText>Mon paragraphe</BodyText>
<Caption>Ma note</Caption>
```

### 3. Avec personnalisation
```tsx
<AppText variant="h2" color="#FF5722" align="center">
  Titre centré rouge
</AppText>
```

---

## 📦 Fichiers créés

```
src/
├── constants/
│   └── typography.ts              # ⚙️ Système de typographie
├── components/
│   └── ui/
│       ├── AppText.tsx            # 🎯 Composant principal
│       └── index.ts               # 📤 Exports
└── utils/
    └── debugTypography.ts         # 🔍 Debug

TYPOGRAPHY_GUIDE.md                # 📖 Guide complet
TYPOGRAPHY_EXAMPLE.tsx             # 💡 Exemples
```

---

## 🎯 Variantes disponibles

### Titres
| Composant | Taille | Poids | Usage |
|-----------|--------|-------|-------|
| `<H1>` | 32px | 700 | Titre principal de page |
| `<H2>` | 28px | 700 | Sous-titre majeur |
| `<H3>` | 24px | 600 | Titre de section |
| `<H4>` | 20px | 600 | Sous-section |

### Texte
| Composant | Taille | Usage |
|-----------|--------|-------|
| `<BodyLarge>` | 18px | Introduction, texte important |
| `<BodyText>` | 16px | Contenu principal |
| `<BodySmall>` | 14px | Détails secondaires |

### Spéciaux
| Composant | Taille | Usage |
|-----------|--------|-------|
| `<Amount>` | 32px | Montants principaux |
| `<Caption>` | 12px | Notes, légendes |
| `<Label>` | 11px | Badges, tags |
| `<ButtonText>` | 16px | Texte de bouton |

---

## 🔧 Props disponibles

```tsx
interface AppTextProps {
  variant?: 'h1' | 'h2' | 'body' | 'caption' | ...;  // Variante
  allowFontScaling?: boolean;                         // Accessibilité (défaut: false)
  color?: string;                                     // Couleur
  align?: 'left' | 'center' | 'right';               // Alignement
  weight?: '400' | '500' | '600' | '700';            // Poids
  style?: TextStyle;                                  // Styles custom
}
```

---

## 💡 Exemples d'utilisation

### Carte de transaction
```tsx
<View style={styles.card}>
  <BodyText weight="600">Transfert Orange Money</BodyText>
  <Amount color={COLORS.text}>-5,000 FCFA</Amount>
  <Caption color={COLORS.textSecondary}>20 Juin 2026 • 14:30</Caption>
</View>
```

### Header de profil
```tsx
<View>
  <H3>Bonjour, John</H3>
  <Caption color={COLORS.textSecondary}>Bienvenue</Caption>
</View>
```

### Bouton
```tsx
<TouchableOpacity style={styles.button}>
  <ButtonText color="#FFF">Confirmer</ButtonText>
</TouchableOpacity>
```

---

## 🔄 Migration

### Ancien code
```tsx
<Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>
  Mon texte
</Text>
```

### Nouveau code
```tsx
<AppText variant="subtitle" color="#333">
  Mon texte
</AppText>
```

**Bénéfices:**
- ✅ Moins de code
- ✅ Plus cohérent
- ✅ Responsive automatiquement
- ✅ Facile à maintenir

---

## 🎨 Personnalisation

### Ajouter une nouvelle variante

Dans `src/constants/typography.ts` :
```typescript
export const typography = {
  // ... variantes existantes
  myCustom: {
    fontSize: normalize(20),
    fontWeight: '500' as const,
    lineHeight: normalize(28),
  },
};
```

Utilisation :
```tsx
<AppText variant="myCustom">Mon texte</AppText>
```

---

## 🐛 Debug

```typescript
import { logTypographyInfo } from '@/utils/debugTypography';

// Affiche toutes les infos
logTypographyInfo();

// Affiche les infos d'une variante
logVariantInfo('h1');

// Compare les normalisations
compareNormalization();
```

---

## 📱 Responsive

Le système utilise l'écran de référence : **iPhone 14 (390px)**

| Écran | Largeur | Facteur | fontSize 16 |
|-------|---------|---------|-------------|
| iPhone SE | 375px | 0.96x | 15px |
| iPhone 14 | 390px | 1.00x | 16px |
| iPhone Pro Max | 430px | 1.10x | 18px |

---

## ⚙️ Configuration

### Désactiver la normalisation (tailles fixes absolues)

Dans `typography.ts`, remplace :
```typescript
fontSize: normalize(16)
```

Par :
```typescript
fontSize: 16
```

### Activer l'accessibilité par défaut

Dans `AppText.tsx`, change :
```typescript
allowFontScaling = false,  // Actuel
```

En :
```typescript
allowFontScaling = true,   // Nouveau
```

---

## ✅ Checklist de migration

- [ ] Lire le guide complet (`TYPOGRAPHY_GUIDE.md`)
- [ ] Voir les exemples (`TYPOGRAPHY_EXAMPLE.tsx`)
- [ ] Remplacer `<Text>` par `<AppText>` progressivement
- [ ] Tester sur différentes tailles d'écran
- [ ] Supprimer les anciennes constantes de fontSize

---

## 📞 Besoin d'aide ?

1. Consulte `TYPOGRAPHY_GUIDE.md` pour le guide détaillé
2. Regarde `TYPOGRAPHY_EXAMPLE.tsx` pour les exemples
3. Utilise les utilitaires de debug pour comprendre les calculs

---

## 🎯 Best Practices

### DO ✅
- Utilise toujours `<AppText>` ou ses variantes
- Choisis la variante appropriée au contexte
- Teste sur petits et grands écrans
- Centralise les modifications dans `typography.ts`

### DON'T ❌
- N'utilise pas `<Text>` directement
- Ne définis pas `fontSize` dans les styles
- Ne duplique pas les styles de texte
- N'ignore pas les variantes disponibles

---

**Créé pour MobPay** 🚀
