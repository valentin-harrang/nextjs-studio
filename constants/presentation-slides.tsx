import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Slide {
  id: string;
  title: string;
  content: React.ReactNode;
}

export const presentationSlides: Slide[] = [
  {
    id: "intro",
    title: "Présentation et tour de table",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          Présentation et tour de table
        </div>
        <iframe
          src="https://giphy.com/embed/3ornk57KwDXf81rjWM"
          width="480"
          height="259"
          allowFullScreen
        />
      </div>
    ),
  },
  {
    id: "react-history",
    title: "Pourquoi React a été créé ?",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          Pourquoi React a été créé ?
        </div>
        <div className="space-y-4 text-lg">
          <p>
            Vers <strong>2010-2012</strong>, les développeurs utilisaient
            principalement <strong>JQuery</strong> pour manipuler le DOM.
          </p>
          <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border-l-4 border-red-500">
            <p className="font-semibold mb-2">Problème 👉</p>
            <p>
              Les pages web devenaient de plus en plus{" "}
              <strong>dynamiques et complexes</strong> mais le DOM du navigateur
              était <strong>lent</strong> et{" "}
              <strong>difficile à maintenir</strong>.
            </p>
          </div>
          <p>
            Facebook avait justement ce problème avec sa{" "}
            <strong>boîte de commentaires en temps réel</strong> et son{" "}
            <strong>fil d&apos;actualité</strong> 👉 Chaque petite mise à jour
            devait être rendue sans recharger toute la page, ça devenait
            ingérable.
          </p>
          <p>
            <strong>Jordan Walke</strong>, ingénieur de chez{" "}
            <strong>Facebook</strong> a créé React en <strong>2011</strong> en
            interne et l&apos;a <strong>open-sourcé en 2013</strong>
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "react-innovations",
    title: "Les innovations de React",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          Les innovations de React
        </div>
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">
              1. Création du Virtual DOM 👉
            </h3>
            <p className="mb-4">
              Au lieu de modifier directement le DOM (lent), React utilise un
              Virtual DOM qui est un modèle en mémoire qui représente
              l&apos;interface (ce qu&apos;on voit à l&apos;écran).
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg space-y-2">
              <p className="font-semibold">Quand l&apos;état change :</p>
              <ol className="list-decimal list-inside space-y-1 ml-4">
                <li>React crée une nouvelle version du Virtual DOM</li>
                <li>Il la compare à l&apos;ancienne</li>
                <li>
                  Il met à jour <strong>seulement</strong> les parties
                  nécessaires du vrai DOM
                </li>
              </ol>
              <p className="mt-2 text-green-600 dark:text-green-400">
                C&apos;est plus rapide et plus simple
              </p>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">
              2. Logique par composants 👉
            </h3>
            <p>
              Chaque composant gère son propre état et affichage pour
              qu&apos;une interface soit une{" "}
              <strong>arborescence de composants</strong> indépendants
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">3. Création du JSX 👉</h3>
            <p>Syntaxe qui mélange HTML et Javascript</p>
          </Card>
        </div>
      </div>
    ),
  },
  {
    id: "react-today",
    title: "React aujourd&apos;hui",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          Aujourd&apos;hui React est devenu :
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <p className="text-lg">
              La lib la plus utilisée pour construire des interfaces web
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-lg">
              Très demandé sur le marché de l&apos;emploi
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-lg">
              La base de plusieurs frameworks comme Next.js, Remix, Gatsby,
              Expo, etc.
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-lg">
              Un modèle pour d&apos;autres technos comme Vue ou Svelte
            </p>
          </Card>
        </div>
      </div>
    ),
  },
  {
    id: "create-react-app",
    title: "Comment créer une app React ?",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          Comment créer une app React ?
        </div>
        <div className="space-y-4">
          <p className="text-lg">
            Quand on va sur la doc officielle de React, il y a{" "}
            <strong>5 façons recommandées</strong> :
          </p>
          <div className="space-y-3">
            <Card className="p-4">
              <p className="font-semibold">• Next.js</p>
            </Card>
            <Card className="p-4">
              <p className="font-semibold">• React Router</p>
            </Card>
            <Card className="p-4">
              <p className="font-semibold">
                • Expo (React Native pour le mobile)
              </p>
            </Card>
            <Card className="p-4">
              <p className="font-semibold">• TanStack Start (bêta)</p>
            </Card>
            <Card className="p-4">
              <p className="font-semibold">• RedwoodSDK</p>
            </Card>
          </div>
          <p className="text-lg mt-6">
            Ou alors <strong>from scratch</strong> en utilisant un outil de
            build comme <strong>Vite</strong>
          </p>
          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border-l-4 border-blue-500 mt-6">
            <p className="font-semibold mb-2">
              La doc recommande Next.js en 1er
            </p>
            <p>
              parce que c&apos;est le framework React qui exploite le mieux les
              dernières fonctionnalités de React.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "nextjs-why",
    title: "Pourquoi Next.js ?",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          Pourquoi Next.js a été créé ?
        </div>
        <div className="space-y-4">
          <p className="text-lg">
            Next.js a été créé en <strong>2016</strong> par{" "}
            <strong>Vercel</strong> pour :
          </p>
          <Card className="p-6">
            <ul className="space-y-3 list-disc list-inside">
              <li>Simplifier la création d&apos;applications React</li>
              <li>Répondre aux problématiques de référencement SEO</li>
            </ul>
          </Card>
          <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border-l-4 border-yellow-500">
            <p className="mb-2">
              React permettait de créer des interfaces dynamiques côté client
              mais ne supportait pas nativement le{" "}
              <strong>server side rendering</strong> ou la{" "}
              <strong>génération de sites statiques</strong>, alors que
              c&apos;était des fonctionnalités indispensables pour le
              référencement SEO.
            </p>
          </div>
          <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border-l-4 border-red-500">
            <p>
              Sans Next.js, les robots des moteurs de recherche voyaient une{" "}
              <strong>page blanche</strong> parce que le code HTML était rendu
              par le Javascript via le navigateur (côté client).
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "rendering-modes",
    title: "CSR, SSR, SSG et ISR",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          CSR, SSR, SSG et ISR
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <Badge className="mb-3">CSR</Badge>
            <h3 className="font-bold mb-2">Client-Side Rendering</h3>
            <p>
              Rendu <strong>dans le navigateur</strong> après chargement du
              JavaScript.
            </p>
          </Card>
          <Card className="p-6">
            <Badge className="mb-3">SSR</Badge>
            <h3 className="font-bold mb-2">Server-Side Rendering</h3>
            <p>
              Rendu <strong>sur le serveur</strong> à chaque requête, puis envoi
              du HTML complet.
            </p>
          </Card>
          <Card className="p-6">
            <Badge className="mb-3">SSG</Badge>
            <h3 className="font-bold mb-2">Static Site Generation</h3>
            <p>
              Rendu <strong>sur le serveur une fois</strong> (au build), puis
              servit statiquement.
            </p>
          </Card>
          <Card className="p-6">
            <Badge className="mb-3">ISR</Badge>
            <h3 className="font-bold mb-2">Incremental Static Regeneration</h3>
            <p>
              Rendu <strong>statique initial</strong> (comme SSG), puis{" "}
              <strong>régénération en arrière-plan</strong> après un délai
              défini.
            </p>
          </Card>
        </div>
        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border-l-4 border-green-500 mt-6">
          <p className="font-semibold mb-2">En résumé :</p>
          <p>SSG/ISR et SSR c&apos;est bien pour le SEO ✅</p>
          <p className="mt-2">
            Le CSR est à utiliser pour des pages dynamiques comme des apps
            privées ou des dashboards quand il n&apos;y a pas besoin de SEO.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "project",
    title: "Projet",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">Projet</div>
        <div className="space-y-4">
          <p className="text-lg">
            Sur ces <strong>3 jours</strong> on va donc créer un petit projet{" "}
            <strong>concret</strong> et que vous pourrez{" "}
            <strong>valoriser</strong> sur votre portfolio en utilisant les
            différents <strong>types de rendus</strong> que propose Next.js et
            on va <strong>intégrer l&apos;IA</strong>.
          </p>
          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg border-l-4 border-blue-500">
            <p className="font-semibold mb-2">👉 Faire la démo :</p>
            <a
              href="https://nextjs-studio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              https://nextjs-studio.vercel.app/
            </a>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "nextjs-versions",
    title: "Versions de Next.js",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          Versions de Next.js
        </div>
        <div className="space-y-6">
          <Card className="p-6 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500">
            <h3 className="text-xl font-bold mb-4">
              Dans les anciennes versions de Next.js
            </h3>
            <p className="mb-2">
              Jusqu&apos;à la version <strong>12</strong> 👉
            </p>
            <p className="font-semibold">
              Pages Router avec composants client par défaut
            </p>
          </Card>
          <Card className="p-6 bg-green-50 dark:bg-green-950 border-l-4 border-green-500">
            <h3 className="text-xl font-bold mb-4">
              Dans les dernières versions de Next.js
            </h3>
            <p className="mb-2">
              À partir de la version <strong>13</strong> 👉
            </p>
            <p className="font-semibold">
              App Router avec composants serveur par défaut
            </p>
          </Card>
          <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg border-l-4 border-red-500">
            <p className="font-semibold">
              ⚠️ Sur la documentation, bien vérifier qu&apos;on est en App
              Router
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "structure",
    title: "Structure de fichiers",
    content: (
      <div className="space-y-6">
        <div className="text-2xl font-bold text-center mb-8">
          La structure de fichiers / dossiers de Next.js (App Router)
        </div>
        <div className="space-y-4">
          <Card className="p-5 bg-blue-50 dark:bg-blue-950">
            <div className="font-mono text-sm space-y-2">
              <div className="font-bold text-blue-700 dark:text-blue-300 mb-3 text-base">
                📁 app/
              </div>
              <div className="ml-4 space-y-2">
                <div>
                  📄 page.tsx{" "}
                  <span className="text-muted-foreground">
                    → Page (route accessible)
                  </span>
                </div>
                <div>
                  📄 layout.tsx{" "}
                  <span className="text-muted-foreground">
                    → Layout partagé (persiste)
                  </span>
                </div>
                <div>
                  📄 template.tsx{" "}
                  <span className="text-muted-foreground">
                    → Template (se réinstancie)
                  </span>
                </div>
                <div>
                  📄 loading.tsx{" "}
                  <span className="text-muted-foreground">
                    → UI de chargement
                  </span>
                </div>
                <div>
                  📄 error.tsx{" "}
                  <span className="text-muted-foreground">
                    → UI d&apos;erreur
                  </span>
                </div>
                <div>
                  📄 not-found.tsx{" "}
                  <span className="text-muted-foreground">→ Page 404</span>
                </div>
                <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800">
                  <div>📁 about/</div>
                  <div className="ml-4">
                    📄 page.tsx{" "}
                    <span className="text-muted-foreground">→ /about</span>
                  </div>
                </div>
                <div className="mt-2">
                  <div>📁 api/</div>
                  <div className="ml-4">
                    📄 route.ts{" "}
                    <span className="text-muted-foreground">
                      → Route API (GET, POST, etc.)
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <div>📁 [slug]/</div>
                  <div className="ml-4">
                    📄 page.tsx{" "}
                    <span className="text-muted-foreground">
                      → Route dynamique
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <div>📁 (group)/</div>
                  <div className="ml-4 text-muted-foreground">
                    → Route group (n&apos;affecte pas l&apos;URL)
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-purple-50 dark:bg-purple-950">
            <div className="font-mono text-sm space-y-1">
              <div className="font-bold text-purple-700 dark:text-purple-300 mb-2">
                📁 public/
              </div>
              <div className="ml-4 text-muted-foreground">
                Images, fichiers statiques (accessibles via /nom-fichier)
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <Card className="p-3 bg-slate-50 dark:bg-slate-900">
              <div className="font-mono text-xs">
                <div className="font-bold mb-1">📄 package.json</div>
                <div className="text-muted-foreground">
                  Dépendances & scripts
                </div>
              </div>
            </Card>
            <Card className="p-3 bg-slate-50 dark:bg-slate-900">
              <div className="font-mono text-xs">
                <div className="font-bold mb-1">📄 next.config.js</div>
                <div className="text-muted-foreground">
                  Configuration Next.js
                </div>
              </div>
            </Card>
            <Card className="p-3 bg-slate-50 dark:bg-slate-900">
              <div className="font-mono text-xs">
                <div className="font-bold mb-1">📄 tsconfig.json</div>
                <div className="text-muted-foreground">Config TypeScript</div>
              </div>
            </Card>
            <Card className="p-3 bg-slate-50 dark:bg-slate-900">
              <div className="font-mono text-xs">
                <div className="font-bold mb-1">📄 .env.local</div>
                <div className="text-muted-foreground">
                  Variables d&apos;environnement
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg border-l-4 border-amber-500 mt-4">
            <p className="font-semibold mb-3">💡 Fichiers spéciaux Next.js :</p>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold mb-1">
                  📄 layout.tsx vs 📄 template.tsx
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded border border-amber-200 dark:border-amber-800">
                    <p className="font-semibold text-blue-600 dark:text-blue-400 mb-1">
                      layout.tsx
                    </p>
                    <ul className="text-xs space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Persiste entre navigations</li>
                      <li>Conserve l&apos;état</li>
                      <li>Ne se réinstancie pas</li>
                      <li>Parfait pour : navigation, sidebar, footer</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-3 rounded border border-amber-200 dark:border-amber-800">
                    <p className="font-semibold text-green-600 dark:text-green-400 mb-1">
                      template.tsx
                    </p>
                    <ul className="text-xs space-y-1 list-disc list-inside text-muted-foreground">
                      <li>Se réinstancie à chaque navigation</li>
                      <li>Recrée les composants enfants</li>
                      <li>Utile pour : animations, effets de transition</li>
                    </ul>
                  </div>
                </div>
              </div>
              <ul className="space-y-1 list-disc list-inside">
                <li>
                  <strong>page.tsx</strong> = Route accessible publiquement
                </li>
                <li>
                  <strong>loading.tsx</strong> = UI affichée pendant le
                  chargement
                </li>
                <li>
                  <strong>error.tsx</strong> = UI affichée en cas d&apos;erreur
                </li>
                <li>
                  <strong>route.ts</strong> = Route API (GET, POST, etc.)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

