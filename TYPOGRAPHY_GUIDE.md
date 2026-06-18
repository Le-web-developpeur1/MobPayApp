# 📝 Guide du Système de Typographie

## 🎯 Objectif

Ce système de typographie garantit :
- ✅ **Cohérence visuelle** sur tous les écrans
- ✅ **Responsive design** adapté à toutes les tailles d'écran
- ✅ **Tailles fixes** non impactées par les paramètres système
- ✅ **Option d'accessibilité** disponible si nécessaire

---

## 📦 Structure

### Fichiers créés
```
src/
├── constants/
│   └── typography.ts          # Système de typographie centralisé
└── components/
    └── ui/
        ├── AppText.tsx        # Composant Text personnalisé
        └── index.ts           # Export centralisé
```

---

## 🚀 Utilisation

### **1. Import du composant**

```typescript
import { AppText, H1, H2, BodyText, Caption } from '@/components/ui';
// OU
import AppText from '@/components/ui/AppText';
```

### **2. Variantes disponibles**

#### **Titres**
```tsx
<H1>Titre principal</H1>                    // 32px, bold
<H2>Sous-titre</H2>                         // 28px, bold
<H3>Section</H3>                            // 24px, semibold
<H4>Sous-section</H4>                       // 20px, semibold
<H5>Petit titre</H5>                        // 18px, semibold
<H6>Mini titre</H6>                         // 16px, semibold
```

#### **Texte de corps**
```tsx
<BodyLarge>Texte important</BodyLarge>      // 18px
<BodyText>Texte normal</BodyText>           // 16px (défaut)
<BodySmall>Texte petit</BodySmall>          // 14px
```

#### **Texte secondaire**
```tsx
<AppText variant="subtitle">Sous-titre</AppText>       // 16px, medium
<AppText variant="subtitleSmall">Mini sous-titre</AppText> // 14px, medium
<Caption>Note explicative</Caption>                     // 12px
<Label>LABEL</Label>                                    // 11px, uppercase
```

#### **Boutons**
```tsx
<ButtonText>Confirmer</ButtonText>          // 16px, semibold
<AppText variant="buttonSmall">OK</AppText> // 14px, semibold
```

#### **Montants**
```tsx
<Amount>15,000 FCFA</Amount>                // 32px, bold
<AppText variant="amountSmall">1,500 FCFA</AppText> // 24px, semibold
```

---

## 🎨 Personnalisation

### **Couleur**
```tsx
<AppText variant="h1" color="#FF5722">
  Titre rouge
</AppText>
```

### **Alignement**
```tsx
<AppText variant="body" align="center">
  Texte centré
</AppText>
```

### **Poids de police**
```tsx
<AppText variant="body" weight="700">
  Texte en gras
</AppText>
```

### **Styles personnalisés**
```tsx
<AppText 
  variant="body" 
  style={{ marginTop: 10, textDecorationLine: 'underline' }}
>
  Texte avec styles custom
</AppText>
```

### **Accessibilité (optionnel)**
```tsx
<AppText variant="body" allowFontScaling={true}>
  Ce texte s'adaptera aux paramètres d'accessibilité
</AppText>
```

---

## 🔄 Migration des composants existants

### **Avant (ancien code)**
```tsx
<Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>
  Mon texte
</Text>
```

### **Après (nouveau système)**
```tsx
<AppText variant="subtitle" color="#333">
  Mon texte
</AppText>
```

### **Exemple concret : Header**

#### Avant
```tsx
<Text style={styles.title}>Bonjour</Text>
<Text style={styles.subtitle}>Bienvenue</Text>

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});
```

#### Après
```tsx
<H3 color="#000">Bonjour</H3>
<Caption color="#666">Bienvenue</Caption>
```

---

## 📐 Système de normalisation

### **Comment ça marche ?**

Le système utilise `normalize()` pour adapter les tailles selon l'écran :

```typescript
// Écran de référence : iPhone 14 (390px de large)
const normalize = (size: number) => {
  const scale = SCREEN_WIDTH / 390;
  return Math.round(size * scale);
};
```

### **Exemples**

| Écran | Largeur | fontSize 16 | fontSize 24 |
|-------|---------|-------------|-------------|
| iPhone SE | 375px | 15px | 23px |
| iPhone 14 | 390px | 16px | 24px |
| iPhone 14 Pro Max | 430px | 18px | 26px |
| Galaxy S23 | 360px | 15px | 22px |

---

## 🛠 Utilisation avancée

### **Tailles fixes (non normalisées)**

Si tu veux des tailles EXACTES sans normalisation :

```typescript
import { fontSizes } from '@/constants/typography';

<Text style={{ fontSize: fontSizes.md }}>
  Taille fixe 16px
</Text>
```

### **Tailles responsives (recommandé)**

```typescript
import { normalizedFontSizes } from '@/constants/typography';

<Text style={{ fontSize: normalizedFontSizes.md }}>
  Taille adaptée à l'écran
</Text>
```

### **Informations sur l'écran**

```typescript
import { screenInfo } from '@/constants/typography';

if (screenInfo.isSmallDevice) {
  // Logique pour petits écrans
}
```

---

## ✅ Checklist de migration

- [ ] Remplacer `<Text>` par `<AppText>`
- [ ] Choisir la variante appropriée
- [ ] Supprimer les styles inline de fontSize
- [ ] Tester sur différentes tailles d'écran
- [ ] Vérifier que `allowFontScaling={false}` par défaut

---

## 🎯 Recommandations

### **DO ✅**
- Utiliser les variantes prédéfinies
- Centraliser les modifications de style
- Tester sur petits et grands écrans
- Utiliser `AppText` partout

### **DON'T ❌**
- Ne pas définir `fontSize` dans les styles
- Ne pas utiliser `<Text>` directement
- Ne pas dupliquer les styles de texte
- Ne pas ignorer les variantes disponibles

---

## 📞 Besoin d'aide ?

Si une variante manque ou ne correspond pas à ton besoin :
1. Ajoute-la dans `src/constants/typography.ts`
2. Elle sera automatiquement disponible partout
3. Documente-la dans ce guide

**Exemple :**
```typescript
// Dans typography.ts
export const typography = {
  // ... autres variantes
  myCustomVariant: {
    fontSize: normalize(20),
    fontWeight: '500',
    lineHeight: normalize(28),
  },
};

// Utilisation
<AppText variant="myCustomVariant">Mon texte</AppText>
```
