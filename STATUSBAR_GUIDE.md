# 📱 Guide StatusBar - Solution au problème de disparition

## 🎯 Problème résolu

La StatusBar disparaissait quand l'app changeait d'état (navigation, focus, etc.). Maintenant elle est **persistante et gérée centralement** ! ✅

---

## 🚀 Solution mise en place

### 1️⃣ Hook personnalisé : `useStatusBar`
Gère automatiquement la StatusBar avec `useFocusEffect` de React Navigation

### 2️⃣ Composant : `AppStatusBar`
Composant réutilisable pour toutes les configurations

### 3️⃣ Composants prédéfinis
- `PrimaryStatusBar` - Pour écrans avec header coloré
- `LightStatusBar` - Pour écrans avec fond blanc  
- `HiddenStatusBar` - Pour mode fullscreen

---

## 💡 Utilisation

### Méthode 1 : Composants prédéfinis (RECOMMANDÉ ✅)

```tsx
import { PrimaryStatusBar, LightStatusBar } from '@/src/components/ui';

// Pour écran avec header coloré (HomeScreen, ProfilScreen, etc.)
export default function HomeScreen() {
  return (
    <>
      <PrimaryStatusBar backgroundColor={COLORS.primary} />
      <SafeAreaView>
        {/* ton contenu */}
      </SafeAreaView>
    </>
  );
}

// Pour écran avec fond blanc
export default function DetailsScreen() {
  return (
    <>
      <LightStatusBar />
      <SafeAreaView>
        {/* ton contenu */}
      </SafeAreaView>
    </>
  );
}
```

### Méthode 2 : Hook personnalisé

```tsx
import { usePrimaryStatusBar } from '@/src/hooks/useStatusBar';
import { COLORS } from '@/src/constants';

export default function HomeScreen() {
  // La StatusBar est gérée automatiquement !
  usePrimaryStatusBar(COLORS.primary);
  
  return (
    <SafeAreaView>
      {/* ton contenu */}
    </SafeAreaView>
  );
}
```

### Méthode 3 : Composant principal

```tsx
import { AppStatusBar } from '@/src/components/ui';

export default function CustomScreen() {
  return (
    <>
      <AppStatusBar 
        barStyle="light-content" 
        backgroundColor="#FF5722"
        translucent={false}
      />
      <SafeAreaView>
        {/* ton contenu */}
      </SafeAreaView>
    </>
  );
}
```

---

## 📂 Fichiers créés

```
src/
├── hooks/
│   └── useStatusBar.tsx          🪝 Hook personnalisé
└── components/
    └── ui/
        ├── AppStatusBar.tsx      📱 Composant StatusBar
        └── index.ts              📤 Exports
```

---

## 🎨 Variantes disponibles

### `<PrimaryStatusBar />`
```tsx
<PrimaryStatusBar backgroundColor={COLORS.primary} />
```
- ✅ Texte blanc (light-content)
- ✅ Fond personnalisable
- ✅ Pour headers colorés

### `<LightStatusBar />`
```tsx
<LightStatusBar />
```
- ✅ Texte noir (dark-content)
- ✅ Fond blanc
- ✅ Pour écrans clairs

### `<HiddenStatusBar />`
```tsx
<HiddenStatusBar />
```
- ✅ StatusBar cachée
- ✅ Pour fullscreen (onboarding, splash, etc.)

### `<AppStatusBar />`
```tsx
<AppStatusBar 
  barStyle="light-content"      // ou "dark-content"
  backgroundColor="#FF5722"
  hidden={false}
  translucent={false}
/>
```
- ✅ Configuration complète
- ✅ Toutes les options disponibles

---

## 🔧 Props disponibles

```typescript
interface AppStatusBarProps {
  barStyle?: 'light-content' | 'dark-content' | 'default';
  backgroundColor?: string;
  hidden?: boolean;
  translucent?: boolean;
}
```

---

## ✨ Avantages de la solution

### ✅ Persistance automatique
La StatusBar reste visible même lors des changements d'état

### ✅ Gestion du focus
S'adapte automatiquement quand l'écran devient actif

### ✅ Support Android/iOS
Fonctionne parfaitement sur les deux plateformes

### ✅ Zero configuration
Utilise les composants prédéfinis, c'est tout !

### ✅ Animations smooth
Transitions fluides entre les écrans

---

## 🎯 Cas d'usage

### Écran avec header primaire
```tsx
import { PrimaryStatusBar } from '@/src/components/ui';
import { COLORS } from '@/src/constants';

export default function HomeScreen() {
  return (
    <>
      <PrimaryStatusBar backgroundColor={COLORS.primary} />
      {/* ... */}
    </>
  );
}
```

### Écran avec fond blanc
```tsx
import { LightStatusBar } from '@/src/components/ui';

export default function DetailsScreen() {
  return (
    <>
      <LightStatusBar />
      {/* ... */}
    </>
  );
}
```

### Écran fullscreen (onboarding, splash)
```tsx
import { HiddenStatusBar } from '@/src/components/ui';

export default function OnboardingScreen() {
  return (
    <>
      <HiddenStatusBar />
      {/* ... */}
    </>
  );
}
```

### Écran avec couleur custom
```tsx
import { AppStatusBar } from '@/src/components/ui';

export default function SpecialScreen() {
  return (
    <>
      <AppStatusBar 
        barStyle="light-content" 
        backgroundColor="#9C27B0"
      />
      {/* ... */}
    </>
  );
}
```

---

## 🔄 Migration

### Avant (avec problème)
```tsx
import { StatusBar } from 'react-native';

export default function HomeScreen() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      {/* La StatusBar disparaît parfois ❌ */}
    </>
  );
}
```

### Après (solution)
```tsx
import { PrimaryStatusBar } from '@/src/components/ui';

export default function HomeScreen() {
  return (
    <>
      <PrimaryStatusBar backgroundColor={COLORS.primary} />
      {/* La StatusBar est toujours là ✅ */}
    </>
  );
}
```

---

## 📊 Écrans déjà migrés

- ✅ `HomeScreen.tsx`
- ✅ `ProfilScreen.tsx`
- ✅ `ChatbotScreen.tsx`
- ⏳ Autres écrans à migrer...

---

## 🐛 Debugging

### Problème : La StatusBar disparaît encore
**Solution :** Vérifie que tu utilises bien le composant `<PrimaryStatusBar />` et non `<StatusBar />`

### Problème : Mauvaise couleur
**Solution :** Passe la bonne couleur en prop :
```tsx
<PrimaryStatusBar backgroundColor={COLORS.primary} />
```

### Problème : Texte pas lisible
**Solution :** Change le `barStyle` :
- Fond clair → `barStyle="dark-content"`
- Fond foncé → `barStyle="light-content"`

---

## ✅ Checklist de migration

Pour chaque écran :

- [ ] Remplacer `import { StatusBar } from 'react-native'`
- [ ] Ajouter `import { PrimaryStatusBar } from '@/src/components/ui'`
- [ ] Remplacer `<StatusBar ... />` par `<PrimaryStatusBar ... />`
- [ ] Tester la navigation vers/depuis cet écran
- [ ] Vérifier que la StatusBar reste visible

---

## 🎉 Résultat

Maintenant la StatusBar :
- ✅ Ne disparaît plus jamais
- ✅ S'adapte automatiquement au focus
- ✅ Gère les transitions smooth
- ✅ Fonctionne sur Android et iOS
- ✅ Est facile à utiliser

**Problème résolu ! 🚀**
