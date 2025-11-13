# ✨ Correction Orthographique avec IA

## 🎯 Solution Rapide

Une solution complète pour corriger les fautes d'ortographe à l'affichage **sans toucher aux données en base de données**.

## 🚀 Démarrage Rapide

### Option 1 : Utiliser le composant (Le plus simple)

```tsx
import { SpellCheckedText } from "@/components/shared/spell-checked-text";

// Dans votre composant
<SpellCheckedText>Texte avec des faute</SpellCheckedText>
// Affichera : "Texte avec des fautes"
```

### Option 2 : Activer sur une page existante

Sur la page d'accueil, activez la correction pour les features :

```tsx
// app/page.tsx
<FeatureCard {...feature} spellCheck={true} />
```

### Option 3 : Tester la démo

Visitez `/spell-check-demo` pour voir la correction en action avec des exemples interactifs.

## 📁 Fichiers Créés

```
lib/
  └── spell-checker.ts              # Fonctions de correction IA

hooks/
  └── use-spell-checker.ts          # Hooks React pour correction

components/shared/
  └── spell-checked-text.tsx        # Composants wrapper

app/api/
  ├── spell-check/route.ts          # API pour correction simple
  └── spell-check-batch/route.ts    # API pour correction par lot

app/spell-check-demo/
  └── page.tsx                      # Page de démonstration

components/shared/
  └── feature-card.tsx              # ✨ Modifié avec support spellCheck
```

## 🎨 Exemples d'Utilisation

### 1. Corriger un titre

```tsx
<h1>
  <SpellCheckedText>Titre avec faute</SpellCheckedText>
</h1>
```

### 2. Corriger une description

```tsx
<p>
  <SpellCheckedText>
    Description avec plusieur erreur de grammaire
  </SpellCheckedText>
</p>
```

### 3. Corriger une liste

```tsx
<ul>
  {items.map((item) => (
    <li key={item}>
      <SpellCheckedText>{item}</SpellCheckedText>
    </li>
  ))}
</ul>
```

### 4. Avec contrôle manuel

```tsx
"use client";

import { useSpellChecker } from "@/hooks/use-spell-checker";

function MyComponent({ text }: { text: string }) {
  const { text: corrected, isCorreting } = useSpellChecker(text);

  return (
    <div>
      {isCorreting && <Loader />}
      <p>{corrected}</p>
    </div>
  );
}
```

## ⚙️ Configuration

### Activer/Désactiver globalement

Créez une variable d'environnement :

```env
# .env.local
NEXT_PUBLIC_SPELL_CHECK_ENABLED=true
```

### Personnaliser le modèle IA

Modifiez `lib/spell-checker.ts` :

```ts
model: groq("qwen-qwq-32b-preview"), // Changez le modèle ici
temperature: 0.1, // Ajustez la créativité
```

## 📊 Caractéristiques

✅ **Correction automatique** - Utilise l'IA (Groq + Qwen3 32B)
✅ **Données préservées** - Ne modifie jamais la BDD
✅ **Cache intelligent** - Évite les corrections redondantes
✅ **Facile à intégrer** - Composants prêts à l'emploi
✅ **Activation sélective** - Par composant ou globalement
✅ **Gestion d'erreurs** - Affiche le texte original en cas d'erreur

## 🎓 Guide Complet

Pour plus de détails, consultez [`SPELL_CHECKER_GUIDE.md`](./SPELL_CHECKER_GUIDE.md)

## 🧪 Tester

1. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

2. Visitez la page de démo :
   ```
   http://localhost:3000/spell-check-demo
   ```

3. Testez avec vos propres textes !

## 📝 Notes Importantes

- ⚠️ **Coûts API** : Utilise l'API Groq (gratuite avec limites)
- 🔒 **Sécurité** : Ne jamais corriger du code, URLs, ou termes techniques
- 🚀 **Performance** : Le cache réduit les appels API
- 💾 **Données** : Les données originales ne sont jamais modifiées

## 🐛 Dépannage

**La correction ne fonctionne pas ?**
- Vérifiez que c'est un Client Component (`"use client"`)
- Vérifiez la clé API Groq dans `.env.local`
- Consultez les logs de la console

**Trop lent ?**
- Utilisez `correctSpellingBatch` pour plusieurs textes
- Corrigez côté serveur (SSR) plutôt que client
- Augmentez le cache

## 🎯 Prochaines Étapes

1. ✅ Tester sur la page `/spell-check-demo`
2. ✅ Activer sur les features de la page d'accueil
3. ✅ Intégrer dans les ressources (`/ressources`)
4. ✅ Ajouter aux exercices
5. ✅ Monitorer les performances

---

**Fait avec ❤️ en utilisant Groq, Vercel AI SDK et Next.js**
