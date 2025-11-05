import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { parseResponseWithReasoning } from "@/app/lib/filter-reasoning";
import { AI_MODEL } from "@/app/constants/ai";

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY environment variable is not set.");
  }

  return createGroq({ apiKey });
}

export interface PromptsResponse {
  reasoning: string | null;
  content: string;
  timestamp: string;
}

export async function getPrompts(): Promise<PromptsResponse> {
  const groq = getGroqClient();

  const { text } = await generateText({
    model: groq(AI_MODEL),
    prompt:
      "Give 3 original ideas for AI web projects for React and Next.js student developers. First, write your reasoning in English in <think>...</think>, then provide your answer in French formatted in Markdown.",
  });

  const { reasoning, content } = parseResponseWithReasoning(text);

  return {
    reasoning,
    content,
    timestamp: new Date().toISOString(),
  };
}
