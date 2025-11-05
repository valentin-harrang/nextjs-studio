import type { PromptsResponse } from "@/lib/get-prompts";

export async function fetchPrompts(): Promise<PromptsResponse> {
  const response = await fetch("/api/prompts", {
    cache: "no-store", // Always fetch fresh data
  });

  if (!response.ok) {
    throw new Error("Failed to fetch prompts");
  }

  return response.json();
}

