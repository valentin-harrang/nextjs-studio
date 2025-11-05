"use client";

import { PageHeader } from "@/app/components/shared/page-header";
import { MarkdownContent } from "@/app/components/shared/markdown-content";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Lightbulb, Brain } from "lucide-react";
import { fetchPrompts } from "@/app/lib/fetch-prompts";
import Link from "next/link";
import { GoHome } from "../components/shared/go-home";

export default function PromptsPage() {
  const {
    data,
    isLoading,
    error: queryError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["prompts"],
    queryFn: fetchPrompts,
  });

  const handleRefetch = async () => {
    await refetch();
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-background via-background to-background/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <GoHome />

        <PageHeader
          title="Générateur d'idées IA"
          emoji="💡"
          description="Découvrez des idées de projets web innovants adaptées aux développeurs React et Next.js"
          className="my-12"
        />

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Loader2 className="size-8 animate-spin text-blue-500" />
            <p className="text-muted-foreground">
              Génération d&apos;idées en cours...
            </p>
          </div>
        )}

        {/* Error State */}
        {queryError && (
          <Card className="border-destructive bg-destructive/10 p-6">
            <p className="text-destructive font-semibold">
              Erreur:{" "}
              {queryError instanceof Error
                ? queryError.message
                : "Une erreur est survenue"}
            </p>
          </Card>
        )}

        {/* Content */}
        {data && !isLoading && (
          <div className="space-y-6">
            {/* Accordions pour raisonnement et contenu */}
            <Accordion type="multiple" className="w-full space-y-4">
              {/* Accordion pour le raisonnement */}
              {data.reasoning && (
                <AccordionItem
                  value="reasoning"
                  className="border rounded-lg overflow-hidden bg-card shadow-sm"
                >
                  <AccordionTrigger className="hover:no-underline px-4 py-4 bg-linear-to-r from-blue-500/10 to-purple-500/10 hover:bg-blue-500/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <Brain className="size-5 text-blue-500 shrink-0" />
                      <span className="font-semibold text-foreground text-base">
                        Raisonnement de l&apos;IA
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-0">
                    <div className="bg-muted/30 border-t p-6">
                      <MarkdownContent
                        content={data.reasoning}
                        className="text-sm prose-sm max-w-none dark:prose-invert"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Accordion pour les idées générées */}
              <AccordionItem
                value="ideas"
                className="border rounded-lg overflow-hidden bg-card shadow-sm"
              >
                <AccordionTrigger className="hover:no-underline px-4 py-4 bg-linear-to-r from-yellow-500/10 to-orange-500/10 hover:bg-yellow-500/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="size-5 text-yellow-500 shrink-0" />
                    <span className="font-semibold text-foreground text-base">
                      Idées générées
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-0">
                  <div className="bg-muted/30 border-t p-6 sm:p-8">
                    <MarkdownContent
                      content={data.content}
                      className="prose max-w-none dark:prose-invert"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex gap-3 justify-center pt-4">
              <Button
                variant="outline"
                onClick={handleRefetch}
                disabled={isLoading || isFetching}
              >
                {isFetching ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Génération...
                  </>
                ) : (
                  "Générer d'autres idées"
                )}
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  // Scroll vers le haut pour voir les nouvelles idées
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Retour en haut
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
