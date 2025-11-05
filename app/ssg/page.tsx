// 🎓 Page explicative SSG - Vulgarisée pour les étudiants
import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { GoHome } from "@/components/shared/go-home";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, FileText, Zap } from "lucide-react";

export default function SSGPage() {
  return (
    <PageContainer>
      <GoHome />

      <PageHeader
        title="SSG - Static Site Generation"
        emoji="📄"
        description="Rendu statique : la page est créée une fois au build, puis servie instantanément"
        className="my-12"
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Analogie simple */}
        <Card className="p-6 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-4">
            <FileText className="size-8 text-purple-600 dark:text-purple-400 shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-2">🍕 Analogie : La Pizza Surgelée</h2>
              <p className="text-muted-foreground leading-relaxed">
                Avec le <strong>SSG</strong>, c&apos;est comme une pizza surgelée :
              </p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li>• 🏭 La pizza est préparée <strong>une fois en usine</strong> (au build)</li>
                <li>• ❄️ Elle est congelée et stockée (HTML statique sur le CDN)</li>
                <li>• 🚀 Quand tu en veux une, c&apos;est <strong>instantané</strong> : on la sort du frigo et c&apos;est prêt !</li>
              </ul>
              <p className="mt-3 text-muted-foreground">
                Le travail est fait <strong>une seule fois</strong>, puis c&apos;est ultra-rapide pour tout le monde !
              </p>
            </div>
          </div>
        </Card>

        {/* Comment ça marche - Version simple */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">⚙️ Comment ça marche ? (Version simple)</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Le développeur lance le build</h3>
                <p className="text-sm text-muted-foreground">
                  Quand tu fais <code className="bg-muted px-1 rounded">npm run build</code>, Next.js génère toutes les pages
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Next.js crée les fichiers HTML</h3>
                <p className="text-sm text-muted-foreground">
                  Chaque page devient un fichier HTML complet, prêt à être servi. Comme un document Word finalisé.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Les fichiers sont stockés</h3>
                <p className="text-sm text-muted-foreground">
                  Les HTML sont mis sur un CDN (Content Delivery Network) - comme un cloud ultra-rapide
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">Quelqu&apos;un visite le site</h3>
                <p className="text-sm text-muted-foreground">
                  Le CDN envoie directement le fichier HTML pré-généré. Aucun traitement, juste envoyer un fichier !
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 className="font-semibold mb-1">Affichage instantané</h3>
                <p className="text-sm text-muted-foreground">
                  La page s&apos;affiche en quelques millisecondes. C&apos;est comme ouvrir un fichier texte sur ton ordinateur !
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Avantages - Version simple */}
        <Card className="p-6 border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="size-6 text-green-600 dark:text-green-400" />
            <h2 className="text-2xl font-bold">✅ Les Avantages</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Zap className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Ultra Rapide</h3>
                <p className="text-sm text-muted-foreground">
                  Pas de traitement serveur, juste envoyer un fichier. C&apos;est la méthode la plus rapide qui existe !
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">SEO Parfait</h3>
                <p className="text-sm text-muted-foreground">
                  Google voit tout le contenu immédiatement. C&apos;est le meilleur pour le référencement !
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Gratuit ou Presque</h3>
                <p className="text-sm text-muted-foreground">
                  Tu peux héberger sur Vercel, Netlify, GitHub Pages gratuitement. Pas besoin de serveur coûteux !
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Scalabilité Infinie</h3>
                <p className="text-sm text-muted-foreground">
                  Un CDN peut servir des millions de visiteurs sans problème. Aucune limite !
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="size-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Sécurité Maximale</h3>
                <p className="text-sm text-muted-foreground">
                  Pas de serveur à hacker, pas de base de données. Juste des fichiers statiques. Super sécurisé !
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Inconvénients - Version simple */}
        <Card className="p-6 border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="size-6 text-red-600 dark:text-red-400" />
            <h2 className="text-2xl font-bold">❌ Les Inconvénients</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5 text-xl">
                ⚠️
              </div>
              <div>
                <h3 className="font-semibold">Contenu Statique Uniquement</h3>
                <p className="text-sm text-muted-foreground">
                  Le contenu est figé au moment du build. Si tu veux changer quelque chose, il faut rebuilder et redéployer.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5 text-xl">
                ⚠️
              </div>
              <div>
                <h3 className="font-semibold">Pas de Personnalisation</h3>
                <p className="text-sm text-muted-foreground">
                  Tu ne peux pas afficher &quot;Bonjour Valentin&quot; si c&apos;est Valentin qui visite. C&apos;est la même page pour tout le monde.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5 text-xl">
                ⚠️
              </div>
              <div>
                <h3 className="font-semibold">Temps de Build</h3>
                <p className="text-sm text-muted-foreground">
                  Si tu as 1000 pages, le build peut prendre 10-15 minutes. Pas idéal pour les gros sites.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="size-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5 text-xl">
                ⚠️
              </div>
              <div>
                <h3 className="font-semibold">Pas de Données Dynamiques</h3>
                <p className="text-sm text-muted-foreground">
                  Impossible d&apos;afficher des données qui changent en temps réel (comme le nombre de likes, les commentaires récents).
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quand l'utiliser - Version simple */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">🎯 Quand utiliser le SSG ?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">✅ Utilise SSG pour :</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 📝 Les blogs (articles qui changent rarement)</li>
                <li>• 📚 Les sites de documentation</li>
                <li>• 🏠 Les landing pages</li>
                <li>• 🎨 Les portfolios</li>
                <li>• 🌐 Les sites vitrines</li>
                <li>• 📰 Les sites d&apos;actualité (rebuild quotidien)</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">❌ Évite SSG pour :</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 👤 Les pages de profil utilisateur</li>
                <li>• 🛒 Les paniers d&apos;achat dynamiques</li>
                <li>• 💬 Les chats et commentaires en temps réel</li>
                <li>• 📊 Les dashboards avec données live</li>
                <li>• 🔐 Les pages nécessitant authentification</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Exemple concret dans le projet */}
        <Card className="p-6 bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
          <h2 className="text-2xl font-bold mb-4">💡 Exemple dans notre projet</h2>
          <p className="text-muted-foreground mb-4">
            La page <strong>/about</strong> utilise le SSG. Voici pourquoi c&apos;est parfait :
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400">→</span>
              <span>Le contenu est <strong>statique</strong> (informations sur le projet qui ne changent pas)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400">→</span>
              <span>Pas besoin de données dynamiques ou personnalisées</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400">→</span>
              <span><strong>Performance maximale</strong> : chargement instantané</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400">→</span>
              <span>SEO optimal pour expliquer le projet</span>
            </div>
          </div>
        </Card>

        {/* Résumé en une phrase */}
        <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-300 dark:border-purple-700">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">📝 Résumé en une phrase</h2>
            <p className="text-lg text-muted-foreground">
              <strong>SSG</strong> = La page est créée <strong>une fois au build</strong>, puis servie instantanément à tous les visiteurs, comme un document PDF finalisé.
            </p>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}

