import type { UIMessage } from "@ai-sdk/react";
import { cn } from "@/lib/utils";
import { parseResponseWithReasoning } from "@/lib/filter-reasoning";
import { MarkdownContent } from "@/components/shared/markdown-content";

interface MessageItemProps {
  message: UIMessage;
  isStreaming?: boolean;
}

export function MessageItem({
  message,
  isStreaming = false,
}: MessageItemProps) {
  const isUser = message.role === "user";

  // Extraire le texte depuis parts (format AI SDK)
  const rawText = message.parts
    .filter((part) => part.type === "text")
    .map((part) => ("text" in part ? part.text : ""))
    .join("");

  // Détecter si une balise de raisonnement est ouverte (non fermée)
  const hasOpenThinkTag =
    !isUser &&
    ((rawText.includes("<think>") && !rawText.includes("</think>")) ||
      (rawText.includes("<Thinking>") && !rawText.includes("</Thinking>")) ||
      (rawText.includes("<reasoning>") && !rawText.includes("</reasoning>")));

  // Si une balise est ouverte pendant le streaming, ne rien afficher
  // Sinon, filtrer le raisonnement normalement
  const textContent = isUser
    ? rawText
    : hasOpenThinkTag && isStreaming
    ? ""
    : parseResponseWithReasoning(rawText).content;

  // Afficher le markdown seulement quand le streaming est terminé
  const shouldRenderMarkdown = !isUser && !isStreaming;

  return (
    <div
      className={cn(
        "mb-4 p-4 rounded-lg",
        isUser
          ? "bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100"
          : "bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
      )}
    >
      <div className="font-semibold text-sm mb-2">
        {isUser ? "👤 Vous" : "🤖 Assistant"}
      </div>
      {textContent ? (
        shouldRenderMarkdown ? (
          <MarkdownContent
            content={textContent}
            className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
          />
        ) : (
          <div className="text-sm whitespace-pre-wrap">{textContent}</div>
        )
      ) : hasOpenThinkTag && isStreaming ? (
        <p className="text-sm text-muted-foreground italic">
          Réflexion en cours...
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">(message vide)</p>
      )}
    </div>
  );
}
