# Guide de Correction Orthographique avec IA

## 📝 Vue d'ensemble

Ce système permet de corriger automatiquement les fautes d'ortographe dans le contenu affiché sur le site web **sans modifier les données en base de données**. La correction s'effectue à la volée lors de l'affichage, en utilisant l'IA (Groq avec Qwen3 32B).

## 🎯 Objectif

- ✅ Corriger les fautes d'ortographe à l'affichage
- ✅ Ne jamais modifier les données source (BDD ou fichiers)
- ✅ Utiliser l'IA pour des corrections intelligentes
- ✅ Mise en cache pour optimiser les performances
- ✅ Simple à activer/désactiver

## 🛠️ Architecture

### 1. Fonction utilitaire (`lib/spell-checker.ts`)

Fonctions principales :
- `correctSpelling(text, options)` : Corrige un seul texte
- `correctSpellingBatch(texts, options)` : Corrige plusieurs textes en parallèle
- Cache automatique pour éviter les corrections redondantes

### 2. Hooks React (`hooks/use-spell-checker.ts`)

Hooks personnalisés pour React :
- `useSpellChecker(text, options)` : Corrige un texte dans un composant
- `useSpellCheckerBatch(texts, options)` : Corrige plusieurs textes

### 3. Composants (`components/shared/spell-checked-text.tsx`)

Composants prêts à l'emploi :
- `<SpellCheckedText>` : Wrapper pour un texte simple
- `<SpellCheckedList>` : Wrapper pour une liste de textes

### 4. API Routes

Routes pour la correction côté serveur :
- `POST /api/spell-check` : Corrige un texte
- `POST /api/spell-check-batch` : Corrige plusieurs textes

## 📖 Utilisation

### Option 1 : Composant `<SpellCheckedText>`

Le moyen le plus simple d'ajouter la correction :

```tsx
import { SpellCheckedText } from "@/components/shared/spell-checked-text";

function MyComponent() {
  return (
    <div>
      <h1>
        <SpellCheckedText>
          Titre avec des faute d'orthographe
        </SpellCheckedText>
      </h1>

      <p>
        <SpellCheckedText>
          Un paragraphe avec plusieur fautes
        </SpellCheckedText>
      </p>
    </div>
  );
}
```

**Options du composant :**

```tsx
<SpellCheckedText
  enabled={true}        // Activer/désactiver (défaut: true)
  as="p"               // Élément HTML (défaut: "span")
  showLoader={false}   // Afficher un loader (défaut: false)
  className="text-lg"  // Classes CSS additionnelles
>
  Texte à corriger
</SpellCheckedText>
```

### Option 2 : Hook `useSpellChecker`

Pour plus de contrôle dans vos composants :

```tsx
"use client";

import { useSpellChecker } from "@/hooks/use-spell-checker";

function MyComponent({ originalText }: { originalText: string }) {
  const { text, isCorreting, error } = useSpellChecker(originalText, {
    enabled: true,
    debounceMs: 300, // Attendre 300ms avant de corriger
  });

  if (error) {
    return <p>Erreur: {error}</p>;
  }

  return (
    <div>
      {isCorreting && <span>Correction en cours...</span>}
      <p>{text}</p>
    </div>
  );
}
```

### Option 3 : Fonction utilitaire (côté serveur)

Pour corriger du texte côté serveur (SSR, API routes, etc.) :

```tsx
import { correctSpelling, correctSpellingBatch } from "@/lib/spell-checker";

// Dans une Server Component ou API route
async function MyServerComponent() {
  const originalText = "Texte avec des faute";
  const correctedText = await correctSpelling(originalText);

  // Corriger plusieurs textes en parallèle
  const texts = ["Texte 1 avec faute", "Texte 2 avec erreur"];
  const correctedTexts = await correctSpellingBatch(texts);

  return (
    <div>
      <p>{correctedText}</p>
      {correctedTexts.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  );
}
```

## 🎨 Exemples d'intégration

### Exemple 1 : Corriger les features de la page d'accueil

```tsx
// app/page.tsx
import { homeFeatures } from "@/constants/home-features";
import { FeatureCard } from "@/components/shared/feature-card";

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {homeFeatures.map((feature) => (
        <FeatureCard
          key={feature.href}
          {...feature}
          spellCheck={true}  // ✅ Activer la correction
        />
      ))}
    </div>
  );
}
```

### Exemple 2 : Corriger les ressources

```tsx
// components/domain/ressources/ressource-card.tsx
import { SpellCheckedText } from "@/components/shared/spell-checked-text";

function RessourceCard({ ressource }) {
  return (
    <div>
      <h2>
        <SpellCheckedText>{ressource.name}</SpellCheckedText>
      </h2>

      <p>
        <SpellCheckedText>{ressource.description}</SpellCheckedText>
      </p>

      <div>
        <h3>Cas d'usage</h3>
        <ul>
          {ressource.useCases.map((useCase, i) => (
            <li key={i}>
              <SpellCheckedText>{useCase}</SpellCheckedText>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Fonctionnalités</h3>
        <ul>
          {ressource.features.map((feature, i) => (
            <li key={i}>
              <SpellCheckedText>{feature}</SpellCheckedText>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### Exemple 3 : Corriger le contenu Markdown

```tsx
import { SpellCheckedText } from "@/components/shared/spell-checked-text";
import { MarkdownContent } from "@/components/shared/markdown-content";

function ArticleWithCorrection({ content }: { content: string }) {
  const { text } = useSpellChecker(content);

  return <MarkdownContent content={text} />;
}
```

## ⚙️ Configuration

### Activer/Désactiver globalement

Vous pouvez créer une variable d'environnement pour contrôler la correction :

```env
# .env.local
NEXT_PUBLIC_SPELL_CHECK_ENABLED=true
```

Puis l'utiliser dans vos composants :

```tsx
const spellCheckEnabled = process.env.NEXT_PUBLIC_SPELL_CHECK_ENABLED === "true";

<SpellCheckedText enabled={spellCheckEnabled}>
  Texte à corriger
</SpellCheckedText>
```

### Personnaliser le modèle IA

Modifier `lib/spell-checker.ts` :

```ts
const { text: correctedText } = await generateText({
  model: groq("qwen-qwq-32b-preview"), // Changer le modèle ici
  temperature: 0.1, // Ajuster la créativité
  // ...
});
```

## 🚀 Performance

### Mise en cache

La correction est automatiquement mise en cache :
- ✅ Un texte identique n'est corrigé qu'une seule fois
- ✅ Le cache est persistant durant toute la session
- ✅ Économise les appels API et améliore les performances

### Gestion du cache

```ts
import {
  clearSpellingCache,
  getSpellingCacheSize
} from "@/lib/spell-checker";

// Vider le cache
clearSpellingCache();

// Obtenir la taille du cache
const size = getSpellingCacheSize();
console.log(`${size} textes en cache`);
```

### Optimisations recommandées

1. **Correction par lot** : Utilisez `correctSpellingBatch` pour corriger plusieurs textes
2. **Debounce** : Ajoutez un délai pour éviter trop de corrections
3. **Désactiver si pas nécessaire** : Ne corrigez que le contenu visible par l'utilisateur
4. **SSR quand possible** : Corrigez côté serveur pour un affichage instantané

## 🎯 Cas d'usage recommandés

### ✅ Corriger ces contenus :

- Descriptions de ressources (`ressources-data.ts`)
- Features de la page d'accueil (`home-features.tsx`)
- Titres et descriptions d'exercices (`exercices.ts`)
- Contenu pédagogique dans les pages
- Labels et messages d'interface

### ❌ Ne PAS corriger :

- Code source (JavaScript, TypeScript, etc.)
- URLs et liens
- Noms de packages npm
- Termes techniques (API, SSR, CSR, etc.)
- Noms propres de technologies
- Contenu généré par l'IA (déjà de bonne qualité)

## 🔧 Dépannage

### La correction ne fonctionne pas

1. Vérifier que le composant est dans un Client Component (`"use client"`)
2. Vérifier les logs de la console pour les erreurs
3. Vérifier que l'API Groq est configurée (clé API dans `.env.local`)

### La correction est trop lente

1. Utiliser `correctSpellingBatch` pour corriger en parallèle
2. Corriger côté serveur (SSR) plutôt que côté client
3. Augmenter le `debounceMs` pour réduire les appels

### Le texte corrigé est incorrect

1. Ajuster la `temperature` dans `spell-checker.ts` (0.1 = très cohérent)
2. Améliorer le prompt pour être plus spécifique
3. Vérifier que le texte n'est pas du code ou des termes techniques

## 📊 Monitoring

Pour suivre l'utilisation de la correction :

```ts
// Dans un useEffect ou Server Component
import { getSpellingCacheSize } from "@/lib/spell-checker";

console.log("Textes corrigés en cache:", getSpellingCacheSize());
```

## 🎓 Bonnes pratiques

1. **Activer progressivement** : Commencez par les pages principales
2. **Tester en local** : Vérifiez que la correction fonctionne bien
3. **Monitorer les coûts** : Suivre les appels API à Groq
4. **Utiliser le cache** : Ne jamais désactiver le cache en production
5. **Gérer les erreurs** : Toujours afficher le texte original en cas d'erreur

## 🔮 Évolutions futures possibles

- [ ] Correction côté serveur avec ISR (Incremental Static Regeneration)
- [ ] Interface admin pour activer/désactiver par page
- [ ] Statistiques de correction
- [ ] Support multilingue (anglais, espagnol, etc.)
- [ ] Correction grammaticale avancée
- [ ] Suggestions de reformulation

## 📚 Ressources

- [Documentation Groq](https://console.groq.com/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Next.js App Router](https://nextjs.org/docs/app)

---

**Note** : Cette fonctionnalité utilise l'API Groq qui peut avoir des coûts associés. Assurez-vous de monitorer votre utilisation.
