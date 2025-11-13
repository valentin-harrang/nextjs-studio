"use client";

import { useSpellChecker } from "@/hooks/use-spell-checker";
import { cn } from "@/lib/utils";

interface SpellCheckedTextProps {
  /**
   * Le texte original à corriger
   */
  children: string;
  /**
   * Activer/désactiver la correction orthographique
   * @default true
   */
  enabled?: boolean;
  /**
   * Classes CSS additionnelles
   */
  className?: string;
  /**
   * Élément HTML à utiliser
   * @default "span"
   */
  as?: "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /**
   * Afficher un indicateur de chargement pendant la correction
   * @default false
   */
  showLoader?: boolean;
}

/**
 * Composant qui affiche du texte avec correction orthographique automatique
 * Le texte original n'est jamais modifié, seul l'affichage est corrigé
 *
 * @example
 * ```tsx
 * <SpellCheckedText>Ceci est un texte avec des faute</SpellCheckedText>
 * // Affichera : "Ceci est un texte avec des fautes"
 * ```
 */
export function SpellCheckedText({
  children,
  enabled = true,
  className,
  as: Component = "span",
  showLoader = false,
}: SpellCheckedTextProps) {
  const { text, isCorreting } = useSpellChecker(children, { enabled });

  return (
    <Component className={cn(className, isCorreting && showLoader && "opacity-70")}>
      {text}
    </Component>
  );
}

interface SpellCheckedListProps {
  /**
   * Le tableau de textes à corriger
   */
  items: string[];
  /**
   * Activer/désactiver la correction orthographique
   * @default true
   */
  enabled?: boolean;
  /**
   * Fonction de rendu pour chaque élément
   */
  renderItem: (text: string, index: number) => React.ReactNode;
  /**
   * Afficher un indicateur de chargement pendant la correction
   * @default false
   */
  showLoader?: boolean;
}

/**
 * Composant qui affiche une liste de textes avec correction orthographique
 *
 * @example
 * ```tsx
 * <SpellCheckedList
 *   items={['Texte avec faute', 'Autre texte']}
 *   renderItem={(text) => <li>{text}</li>}
 * />
 * ```
 */
export function SpellCheckedList({
  items,
  enabled = true,
  renderItem,
  showLoader = false,
}: SpellCheckedListProps) {
  // Pour l'instant, on corrige chaque texte individuellement
  // On pourrait optimiser avec useSpellCheckerBatch si besoin
  return (
    <>
      {items.map((item, index) => (
        <SpellCheckedText
          key={index}
          enabled={enabled}
          showLoader={showLoader}
          as="span"
        >
          {renderItem(item, index) as unknown as string}
        </SpellCheckedText>
      ))}
    </>
  );
}
