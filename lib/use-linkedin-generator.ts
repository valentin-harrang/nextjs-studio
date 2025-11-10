"use client";

import { useState } from "react";
import { z } from "zod";

// 🎓 Types pour les tons disponibles
export const toneOptions = [
  "Professionnel et inspirant",
  "Authentique et personnel",
  "Pédagogique et didactique",
  "Réflexif et introspectif",
  "Enthousiaste et motivant",
] as const;

export type ToneOption = (typeof toneOptions)[number];

// 🎓 Schema Zod pour la validation du formulaire
export const linkedInFormSchema = z.object({
  objective: z
    .string()
    .min(10, "L'objectif doit faire au moins 10 caractères")
    .max(500, "L'objectif ne peut pas dépasser 500 caractères"),
  context: z
    .string()
    .min(20, "Le contexte doit faire au moins 20 caractères")
    .max(1000, "Le contexte ne peut pas dépasser 1000 caractères"),
  tone: z.enum(toneOptions, {
    errorMap: () => ({ message: "Veuillez sélectionner un ton valide" }),
  }),
  numVariations: z
    .number()
    .int("Le nombre de variations doit être un entier")
    .min(1, "Au moins 1 variation est requise")
    .max(3, "Maximum 3 variations autorisées"),
});

export type LinkedInFormData = z.infer<typeof linkedInFormSchema>;

// 🎓 Type pour les erreurs de validation
export type ValidationErrors = Partial<Record<keyof LinkedInFormData, string>>;

// 🎓 Hook pour gérer le générateur de posts LinkedIn
export function useLinkedInGenerator() {
  // State pour le formulaire
  const [objective, setObjective] = useState("");
  const [context, setContext] = useState("");
  const [tone, setTone] = useState<ToneOption>("Professionnel et inspirant");
  const [numVariations, setNumVariations] = useState(1);

  // State pour les résultats
  const [posts, setPosts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // State pour les boutons "Copier"
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // 🎓 Fonction de validation du formulaire
  const validateForm = (): boolean => {
    try {
      linkedInFormSchema.parse({
        objective,
        context,
        tone,
        numVariations,
      });
      setValidationErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: ValidationErrors = {};
        err.errors.forEach((error) => {
          const path = error.path[0] as keyof LinkedInFormData;
          errors[path] = error.message;
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  // 🎓 Fonction pour générer les posts
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation avec Zod
    if (!validateForm()) {
      setError("Veuillez corriger les erreurs dans le formulaire");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-linkedin-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objective, context, tone, numVariations }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la génération");
      }

      const data = await response.json();
      setPosts(data.posts);
    } catch (err) {
      console.error("Error generating LinkedIn post:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  // 🎓 Fonction pour copier un post
  const handleCopy = async (post: string, index: number) => {
    try {
      await navigator.clipboard.writeText(post);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // 🎓 Fonction pour régénérer une variation spécifique
  const handleRegenerateVariation = async (index: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-linkedin-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ objective, context, tone, numVariations: 1 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la régénération");
      }

      const data = await response.json();
      const newPosts = [...posts];
      newPosts[index] = data.posts[0];
      setPosts(newPosts);
    } catch (err) {
      console.error("Error regenerating post:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  // 🎓 Fonction pour tout effacer
  const handleClear = () => {
    setPosts([]);
    setObjective("");
    setContext("");
    setTone("Professionnel et inspirant");
    setNumVariations(1);
    setError(null);
    setValidationErrors({});
  };

  return {
    // Form state
    objective,
    setObjective,
    context,
    setContext,
    tone,
    setTone,
    numVariations,
    setNumVariations,

    // Results state
    posts,
    isLoading,
    error,
    validationErrors,
    copiedIndex,

    // Actions
    handleGenerate,
    handleCopy,
    handleRegenerateVariation,
    handleClear,
  };
}
