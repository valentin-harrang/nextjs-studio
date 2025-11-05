export interface ParsedResponse {
  reasoning: string | null;
  content: string;
}

export function parseResponseWithReasoning(text: string): ParsedResponse {
  let reasoning: string | null = null;
  let content = text;

  // Extraire le raisonnement depuis <think>...</think> (format demandé)
  const redactedReasoningMatch = text.match(
    /<think>([\s\S]*?)<\/redacted_reasoning>/i
  );
  if (redactedReasoningMatch && redactedReasoningMatch[1]) {
    reasoning = redactedReasoningMatch[1].trim();
    content = text
      .replace(/<think>[\s\S]*?<\/redacted_reasoning>/gi, "")
      .trim();
  }

  // Extraire le raisonnement depuis <think>...</think> (format Qwen)
  const thinkMatch = text.match(/<think>([\s\S]*?)<\/think>/i);
  if (thinkMatch && thinkMatch[1] && !reasoning) {
    reasoning = thinkMatch[1].trim();
    content = text.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
  }

  // Extraire le raisonnement depuis <Thinking>...</Thinking> (format Groq)
  const thinkingMatch = text.match(/<Thinking>([\s\S]*?)<\/Thinking>/i);
  if (thinkingMatch && thinkingMatch[1] && !reasoning) {
    reasoning = thinkingMatch[1].trim();
    content = text.replace(/<Thinking>[\s\S]*?<\/Thinking>/gi, "").trim();
  }

  // Extraire le raisonnement depuis <reasoning>...</reasoning>
  const reasoningMatch = text.match(/<reasoning>([\s\S]*?)<\/reasoning>/i);
  if (reasoningMatch && reasoningMatch[1] && !reasoning) {
    reasoning = reasoningMatch[1].trim();
    content = text.replace(/<reasoning>[\s\S]*?<\/reasoning>/gi, "").trim();
  }

  // Nettoyer les balises orphelines restantes
  content = content
    .replace(/<\/?Thinking>/gi, "")
    .replace(/<\/?think>/gi, "")
    .replace(/<\/?reasoning>/gi, "")
    .replace(/<\/?redacted_reasoning>/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { reasoning, content };
}
