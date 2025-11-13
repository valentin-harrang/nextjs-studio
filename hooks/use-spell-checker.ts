"use client";

import { useState, useEffect } from "react";

/**
 * Hook React pour corriger l'orthographe d'un texte à l'affichage
 * Le texte original n'est jamais modifié
 */
export function useSpellChecker(
  originalText: string,
  options: {
    enabled?: boolean;
    debounceMs?: number;
  } = {}
) {
  const { enabled = true, debounceMs = 0 } = options;

  const [correctedText, setCorrectedText] = useState<string>(originalText);
  const [isCorreting, setIsCorreting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si désactivé, utiliser le texte original
    if (!enabled) {
      setCorrectedText(originalText);
      return;
    }

    // Si le texte est vide ou très court, pas besoin de corriger
    if (!originalText || originalText.trim().length < 3) {
      setCorrectedText(originalText);
      return;
    }

    let timeoutId: NodeJS.Timeout | undefined;

    const correctText = async () => {
      setIsCorreting(true);
      setError(null);

      try {
        const response = await fetch("/api/spell-check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: originalText }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la correction");
        }

        const data = await response.json();
        setCorrectedText(data.correctedText);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        // En cas d'erreur, utiliser le texte original
        setCorrectedText(originalText);
      } finally {
        setIsCorreting(false);
      }
    };

    if (debounceMs > 0) {
      timeoutId = setTimeout(correctText, debounceMs);
    } else {
      correctText();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [originalText, enabled, debounceMs]);

  return {
    text: correctedText,
    isCorreting,
    error,
  };
}

/**
 * Hook pour corriger un tableau de textes
 */
export function useSpellCheckerBatch(
  originalTexts: string[],
  options: {
    enabled?: boolean;
  } = {}
) {
  const { enabled = true } = options;

  const [correctedTexts, setCorrectedTexts] = useState<string[]>(originalTexts);
  const [isCorreting, setIsCorreting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setCorrectedTexts(originalTexts);
      return;
    }

    const correctTexts = async () => {
      setIsCorreting(true);
      setError(null);

      try {
        const response = await fetch("/api/spell-check-batch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ texts: originalTexts }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la correction");
        }

        const data = await response.json();
        setCorrectedTexts(data.correctedTexts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        setCorrectedTexts(originalTexts);
      } finally {
        setIsCorreting(false);
      }
    };

    correctTexts();
  }, [JSON.stringify(originalTexts), enabled]);

  return {
    texts: correctedTexts,
    isCorreting,
    error,
  };
}
