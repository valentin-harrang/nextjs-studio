/**
 * Types pour le chat AI
 */

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface TextPart {
  type: "text";
  text: string;
}

export interface ChatUiMessage {
  id: string;
  role: "user" | "assistant" | "system";
  parts: TextPart[];
}

