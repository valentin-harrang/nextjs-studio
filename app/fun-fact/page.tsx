// 🎓 CSR - Client-Side Rendering
// Cette page charge les données côté client avec useState et useEffect
"use client";

import { useState, useEffect } from "react";
import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { GoHome } from "@/components/shared/go-home";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, RefreshCw } from "lucide-react";
import { MarkdownContent } from "@/components/shared/markdown-content";

export default function FunFactPage() {
  const [funFact, setFunFact] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🎓 Fonction pour charger le fun fact depuis l'API
  const fetchFunFact = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/fun-fact");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors du chargement du fun fact");
      }

      setFunFact(data.funFact);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors du chargement du fun fact"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🎓 Charger le fun fact au montage du composant
  useEffect(() => {
    fetchFunFact();
  }, []);

  return (
    <PageContainer>
      <GoHome />

      <PageHeader
        title="Fun Fact du Jour"
        emoji="🎯"
        description="Découvrez un fun fact amusant et surprenant généré par l'IA. Cette page utilise le CSR (Client-Side Rendering)."
        className="my-12"
      />

      {/* Contenu principal */}
      <div className="space-y-6">
        {loading && (
          <Card className="p-12 text-center">
            <Loader2 className="size-8 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-muted-foreground">
              Génération du fun fact en cours...
            </p>
          </Card>
        )}

        {error && (
          <Card className="p-6 border-destructive bg-destructive/10">
            <div className="text-center">
              <p className="text-destructive font-semibold mb-4">
                ⚠️ Erreur
              </p>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button onClick={fetchFunFact} variant="outline" size="sm">
                Réessayer
              </Button>
            </div>
          </Card>
        )}

        {funFact && !loading && (
          <Card className="p-8 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Sparkles className="size-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">Fun Fact du Jour</h2>
                <p className="text-sm text-muted-foreground">
                  Généré par l&apos;IA à chaque chargement
                </p>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MarkdownContent content={funFact} />
            </div>

            <div className="mt-6 pt-6 border-t">
              <Button
                onClick={fetchFunFact}
                variant="outline"
                className="w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Génération...
                  </>
                ) : (
                  <>
                    <RefreshCw className="size-4 mr-2" />
                    Générer un autre fun fact
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {/* Note pédagogique sur le CSR */}
        <Card className="p-6 bg-muted/50 border-dashed">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">💡 Note :</strong> Cette page
            utilise le <strong>CSR (Client-Side Rendering)</strong>. Les
            données sont chargées côté client avec <code className="bg-muted px-1 rounded text-xs">useEffect</code> et{" "}
            <code className="bg-muted px-1 rounded text-xs">fetch()</code>. Le
            contenu est généré dynamiquement après le chargement de la page.
          </p>
        </Card>
      </div>
    </PageContainer>
  );
}

