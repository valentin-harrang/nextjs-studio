import { Code, Lightbulb, MessageSquare, Rocket, Server } from "lucide-react";

export const exercices = [
  {
    numero: 1,
    titre: "Créer un nouveau projet Next.js",
    description: "Mettre en place le projet avec la configuration recommandée",
    icon: Rocket,
    color: "blue",
    details: [
      "Utiliser `create-next-app@latest` avec l'App Router",
      "Sélectionner TypeScript, Tailwind CSS, ESLint",
      "Installer les dépendances nécessaires",
    ],
  },
  {
    numero: 2,
    titre: "Page d'accueil en SSG",
    description: "Créer une page de présentation statique",
    icon: Code,
    color: "purple",
    details: [
      "Créer/modifier `app/page.tsx`",
      "Afficher une photo ou avatar",
      "Se présenter (nom, passions, compétences)",
      "Utiliser Server Component (pas de 'use client')",
      "Design avec Tailwind CSS",
    ],
  },
  {
    numero: 3,
    titre: "Page en SSR avec génération de contenu via Route Handler + AI SDK",
    description:
      "Apprendre à créer un Route Handler interne et une page SSR qui l'appelle",
    icon: Lightbulb,
    color: "amber",
    details: [
      "Créer `app/api/ai/route.ts` (Route Handler)",
      "Utiliser `generateText()` de l'AI SDK pour générer du texte",
      "Retourner un JSON avec `NextResponse.json()`",
      "Créer `app/idee/page.tsx` (ou autre nom) avec `export const dynamic = 'force-dynamic'`",
      "Appeler le Route Handler interne avec `fetch('/api/ai', { cache: 'no-store' })`",
      "Afficher le contenu généré par l'IA (citation, idée, fun fact, etc.)",
      "Comprendre : la clé API reste sécurisée côté serveur (jamais exposée au client)",
    ],
  },
  {
    numero: 4,
    titre: "Chatbot en CSR avec AI SDK",
    description: "Créer un chatbot interactif avec streaming",
    icon: MessageSquare,
    color: "blue",
    details: [
      "Installer `@ai-sdk/react` et `@ai-sdk/groq`",
      "Créer une clé API sur groq.com (gratuit)",
      "Créer `app/chat/page.tsx` avec `'use client'`",
      "Utiliser le hook `useChat()` pour gérer les messages",
      "Afficher les messages et le formulaire de chat",
      "Suivre la documentation : https://ai-sdk.dev/docs/getting-started/nextjs-app-router",
    ],
  },
  {
    numero: 5,
    titre: "Route Handler API pour le chatbot",
    description: "Créer l'endpoint API qui communique avec le LLM",
    icon: Server,
    color: "green",
    details: [
      "Créer `app/api/chat/route.ts`",
      "Implémenter une fonction `POST` async",
      "Utiliser `streamText()` de la lib `ai`",
      "Configurer le modèle Groq avec la clé API",
      "Retourner `result.toTextStreamResponse()` ou `result.toUIMessageStreamResponse()`",
      "Gérer les erreurs (clé API manquante, etc.)",
    ],
  },
];
