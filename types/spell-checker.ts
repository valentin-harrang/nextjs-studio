/**
 * Types pour le système de correction orthographique
 */

export interface SpellCheckOptions {
  /**
   * Utiliser le cache pour éviter les corrections redondantes
   * @default true
   */
  useCache?: boolean;

  /**
   * Nombre maximum de tentatives en cas d'erreur
   * @default 2
   */
  maxRetries?: number;
}

export interface SpellCheckResult {
  /**
   * Texte original
   */
  original: string;

  /**
   * Texte corrigé
   */
  corrected: string;

  /**
   * Indique si le texte a été modifié
   */
  hasChanges: boolean;

  /**
   * Temps de correction en millisecondes
   */
  duration?: number;

  /**
   * Source de la correction (cache ou IA)
   */
  source: "cache" | "ai" | "error";
}

export interface SpellCheckBatchResult {
  /**
   * Résultats individuels
   */
  results: SpellCheckResult[];

  /**
   * Nombre total de textes traités
   */
  total: number;

  /**
   * Nombre de textes modifiés
   */
  modified: number;

  /**
   * Nombre de textes provenant du cache
   */
  cached: number;
}

export interface SpellCheckConfig {
  /**
   * Activer la correction orthographique globalement
   * @default true
   */
  enabled: boolean;

  /**
   * Modèle IA à utiliser
   * @default "qwen-qwq-32b-preview"
   */
  model: string;

  /**
   * Température pour le modèle IA (0-1)
   * @default 0.1
   */
  temperature: number;

  /**
   * Nombre maximum de tokens pour la réponse
   * @default 500
   */
  maxTokens: number;

  /**
   * Délai de debounce en millisecondes
   * @default 0
   */
  debounceMs: number;
}
