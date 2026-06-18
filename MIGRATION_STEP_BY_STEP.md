# 🔄 Guide de Migration Étape par Étape

## 📌 Vue d'ensemble

Ce guide t'accompagne dans la migration progressive de ton app vers le nouveau système de typographie.

---

## 🎯 Stratégie recommandée

### Option 1 : Migration progressive (RECOMMANDÉ)
✅ Migrer écran par écran  
✅ Tester au fur et à mesure  
✅ Moins de risque de bugs  
✅ Peut être fait progressivement  

### Option 2 : Migration complète
❌ Tout migrer d'un coup  
❌ Plus risqué  
❌ Difficile à débugger  

**On recommande l'Option 1** 👍

---

## 📋 Checklist générale

- [ ] Lire `TYPOGRAPHY_README.md`
- [ ] Comprendre les variantes disponibles
- [ ] Choisir le premier écran à migrer (recommandé : le plus simple)
- [ ] Migrer et tester
- [ ] Répéter pour les autres écrans

---

## 🔍 Étapes détaillées

### **Étape 1 : Identifier les Text à migrer**

Dans ton composant, cherche tous les `<Text>` :

```tsx
// Avant
<Text style={styles.title}>Mon titre</Text>
<Text style={styles.description}>Ma description</Text>
<Text style={styles.amount}>1,500 FCFA</Text>
```

### **Étape 2 : Importer AppText**

En haut du fichier :

```tsx
// Ajoute cette ligne
import { AppText, H3, BodyText, Amount, Caption } from '@/components/ui';
```

### **Étape 3 : Identifier la variante appropriée**

Pour chaque `<Text>`, pose-toi ces questions :

**Est-ce un titre ?**
- Très grand → `<H1>` ou `<H2>`
- Moyen → `<H3>` ou `<H4>`
- Petit → `<H5>` ou `<H6>`

**Est-ce du texte normal ?**
- Important → `<BodyLarge>`
- Normal → `<BodyText>`
- Petit → `<BodySmall>`

**Est-ce du texte secondaire ?**
- Note, légende → `<Caption>`
- Badge, label → `<Label>`

**Est-ce un montant ?**
- Principal → `<Amount>`
- Secondaire → `<AppText variant="amountSmall">`

**Est-ce un bouton ?**
- `<ButtonText>`

### **Étape 4 : Remplacer les Text**

```tsx
// Avant
<Text style={styles.title}>Mon titre</Text>

// Après
<H3>Mon titre</H3>

// OU si tu veux garder la couleur
<H3 color={COLORS.text}>Mon titre</H3>
```

### **Étape 5 : Adapter les styles**

```tsx
// Avant
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
});

// Après - supprime fontSize et fontWeight
const styles = StyleSheet.create({
  // Le style n'est plus nécessaire si tu utilises <H3>
  // Mais tu peux garder les autres propriétés si besoin
  titleContainer: {
    marginBottom: 10,
  },
});
```

### **Étape 6 : Tester**

- Lance l'app
- Vérifie que tout s'affiche correctement
- Teste sur différents écrans (si possible)

---

## 💡 Exemples concrets de migration

### **Exemple 1 : Header simple**

#### Avant
```tsx
<View style={styles.header}>
  <Text style={styles.greeting}>Bonjour</Text>
  <Text style={styles.username}>John Doe</Text>
  <Text style={styles.subtitle}>Bienvenue sur MobPay</Text>
</View>

const styles = StyleSheet.create({
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  username: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 12,
    color: '#999',
  },
});
```

#### Après
```tsx
import { H3, Caption } from '@/components/ui';

<View style={styles.header}>
  <Caption color="#666">Bonjour</Caption>
  <H3 color="#000">John Doe</H3>
  <Caption color="#999">Bienvenue sur MobPay</Caption>
</View>

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
});
```

✅ **Résultat** : 15 lignes → 6 lignes, plus lisible, responsive automatiquement

---

### **Exemple 2 : Carte de transaction**

#### Avant
```tsx
<View style={styles.card}>
  <Text style={styles.cardTitle}>Transfert Orange Money</Text>
  <Text style={styles.amount}>-5,000 FCFA</Text>
  <Text style={styles.date}>20 Juin 2026 • 14:30</Text>
  <Text style={styles.status}>Réussi</Text>
</View>

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  amount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  status: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
});
```

#### Après
```tsx
import { BodyText, Amount, Caption } from '@/components/ui';

<View style={styles.card}>
  <BodyText weight="600">Transfert Orange Money</BodyText>
  <Amount>-5,000 FCFA</Amount>
  <Caption color="#666">20 Juin 2026 • 14:30</Caption>
  <Caption color="#4CAF50" weight="600">Réussi</Caption>
</View>

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    gap: 8,
  },
});
```

✅ **Résultat** : Plus propre, responsive, cohérent

---

### **Exemple 3 : Liste de contacts**

#### Avant
```tsx
<View style={styles.contactItem}>
  <View style={styles.avatar}>
    <Text style={styles.initials}>JD</Text>
  </View>
  <View>
    <Text style={styles.name}>John Doe</Text>
    <Text style={styles.phone}>+237 6 XX XX XX XX</Text>
  </View>
</View>

const styles = StyleSheet.create({
  initials: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  phone: {
    fontSize: 14,
    color: '#666',
  },
});
```

#### Après
```tsx
import { BodyText, Caption } from '@/components/ui';

<View style={styles.contactItem}>
  <View style={styles.avatar}>
    <BodyText weight="600" color="#FFF">JD</BodyText>
  </View>
  <View>
    <BodyText weight="600">John Doe</BodyText>
    <Caption color="#666">+237 6 XX XX XX XX</Caption>
  </View>
</View>

const styles = StyleSheet.create({
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

✅ **Résultat** : Plus lisible, moins de styles

---

## 🎯 Ordre de migration recommandé

1. **Écrans simples d'abord**
   - Écran de chargement
   - Page d'erreur
   - Écrans statiques

2. **Composants réutilisables**
   - Composants dans `/components`
   - Header, Footer
   - Cartes, Modals

3. **Écrans principaux**
   - HomeScreen
   - ProfilScreen
   - Autres écrans tab

4. **Écrans complexes**
   - Formulaires
   - Écrans avec beaucoup de logique

---

## ⚠️ Pièges à éviter

### ❌ Ne pas faire
```tsx
// ❌ Définir fontSize dans les styles
<AppText style={{ fontSize: 20 }}>Texte</AppText>

// ❌ Utiliser Text au lieu de AppText
<Text>Texte</Text>

// ❌ Créer de nouvelles variantes inline
<AppText style={styles.customTitle}>Texte</AppText>
```

### ✅ À faire
```tsx
// ✅ Utiliser les variantes
<H3>Texte</H3>

// ✅ Personnaliser avec les props
<AppText variant="h3" color="#FF0000">Texte</AppText>

// ✅ Créer une nouvelle variante si besoin récurrent
// Dans typography.ts
export const typography = {
  customTitle: { fontSize: normalize(20), ... },
};
```

---

## 🔍 Checklist par fichier

Pour chaque fichier que tu migres :

- [ ] Importer les composants nécessaires
- [ ] Remplacer tous les `<Text>` par les variantes appropriées
- [ ] Supprimer les styles fontSize/fontWeight inutiles
- [ ] Tester l'affichage
- [ ] Vérifier sur petit et grand écran (si possible)
- [ ] Commit les changements

---

## 🚀 Script de recherche utile

Pour trouver tous les Text dans ton code :

```bash
# Dans le dossier src
grep -r "<Text" src/ --include="*.tsx" --include="*.ts"
```

Ou dans VS Code :
- `Ctrl + Shift + F`
- Chercher : `<Text`
- Dans les fichiers : `src/**/*.tsx`

---

## 📊 Suivi de progression

Crée un fichier `MIGRATION_PROGRESS.md` :

```markdown
# Progression Migration Typographie

## ✅ Complété (X/Y)

- [x] src/components/ui/AppText.tsx (nouveau)
- [x] src/constants/typography.ts (nouveau)
- [ ] src/screens/tab/HomeScreen.tsx
- [ ] src/screens/tab/ProfilScreen.tsx
- [ ] src/components/home/Header.tsx
- [ ] ...

## 📝 Notes
- HomeScreen : 15 Text remplacés, tout fonctionne
- ProfilScreen : En cours...
```

---

## 🎓 Résumé des bénéfices

Après migration complète :

✅ **Code plus propre**
- Moins de lignes
- Plus lisible
- Plus maintenable

✅ **Design cohérent**
- Mêmes tailles partout
- Mêmes poids
- Mêmes espacements

✅ **Responsive automatique**
- S'adapte à tous les écrans
- Pas de calculs manuels
- Toujours proportionnel

✅ **Facile à modifier**
- Change une fois dans `typography.ts`
- Impact sur toute l'app
- Pas besoin de parcourir tous les fichiers

---

## 🎯 Prêt à commencer ?

1. Lis ce guide en entier
2. Choisis un écran simple
3. Suis les étapes
4. Teste
5. Répète !

**Bon courage ! 🚀**
