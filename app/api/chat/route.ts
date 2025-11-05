// API Route IA Chat
import { createGroq } from "@ai-sdk/groq";
import { streamText, convertToModelMessages } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { AI_MODEL } from "@/app/constants/ai";

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY environment variable is not set. Please create a .env.local file with your Groq API key."
    );
  }

  return createGroq({ apiKey });
}

export async function POST(req: NextRequest) {
  try {
    const groq = getGroqClient();
    const body = await req.json();

    // DefaultChatTransport envoie { chatId, messages }
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid messages format:", body);
      return NextResponse.json(
        { error: "Invalid request: messages array is required" },
        { status: 400 }
      );
    }

    // Convertir UIMessage[] en ModelMessage[]
    const modelMessages = convertToModelMessages(messages);

    // Stream le texte avec l'AI SDK
    const result = streamText({
      model: groq(AI_MODEL),
      messages: modelMessages,
    });

    // Retourner le stream (compatible avec TextStreamChatTransport)
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);

    if (error instanceof Error && error.message.includes("GROQ_API_KEY")) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
