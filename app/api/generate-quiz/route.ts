// API Route pour générer un quiz avec l'IA
import { createGroq } from "@ai-sdk/groq";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// 🎓 Modèle Groq avec support structured outputs (json_schema)
// Voir: https://console.groq.com/docs/structured-outputs#supported-models
// Options disponibles: openai/gpt-oss-120b, meta-llama/llama-4-maverick-17b-128e-instruct, etc.
const QUIZ_MODEL = "meta-llama/llama-4-maverick-17b-128e-instruct";

// 🎓 Schema Zod pour valider la structure du quiz généré
const quizSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().describe("La question du quiz"),
      options: z
        .array(z.string())
        .length(4)
        .describe("4 options de réponse distinctes"),
      correctAnswer: z
        .number()
        .min(0)
        .max(3)
        .describe("Index de la bonne réponse (0-3)"),
      explanation: z
        .string()
        .describe("Explication pédagogique de la réponse"),
    })
  ),
});

// 🎓 Schema Zod pour valider le body de la requête
const requestSchema = z.object({
  topic: z.string().min(1, "Le thème est requis"),
  difficulty: z.enum(["Facile", "Moyen", "Difficile"]),
  numQuestions: z.number().min(5).max(15),
});

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
    // 🎓 Étape 1: Parser et valider le body de la requête
    const body = await req.json();
    const validationResult = requestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Données invalides", details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { topic, difficulty, numQuestions } = validationResult.data;

    // 🎓 Étape 2: Initialiser le client Groq
    const groq = getGroqClient();

    // 🎓 Étape 3: Générer le quiz avec generateObject
    // Cette fonction utilise structured output pour garantir
    // que la réponse respecte exactement le schema Zod
    // Utilisation d'un modèle Groq compatible avec json_schema
    const result = await generateObject({
      model: groq(QUIZ_MODEL),
      schema: quizSchema,
      prompt: `Tu es un générateur de quiz éducatif. Génère exactement ${numQuestions} questions de niveau ${difficulty} sur le thème '${topic}'.

Consignes importantes :
- Chaque question doit avoir exactement 4 options de réponse distinctes et pertinentes
- Une seule réponse est correcte
- Les mauvaises réponses doivent être plausibles mais clairement incorrectes
- Fournis une explication pédagogique claire pour chaque question
- Assure-toi que les questions soient variées, intéressantes et adaptées au niveau demandé
- Pour le niveau Facile : questions basiques et accessibles
- Pour le niveau Moyen : questions nécessitant une réflexion
- Pour le niveau Difficile : questions avancées avec des nuances

Format attendu pour correctAnswer : l'index de la bonne réponse dans le tableau options (0 pour la première option, 1 pour la deuxième, etc.)`,
    });

    // 🎓 Étape 4: Retourner le quiz généré
    return NextResponse.json(result.object);
  } catch (error) {
    console.error("Quiz generation error:", error);

    // Gestion d'erreur spécifique pour la clé API manquante
    if (error instanceof Error && error.message.includes("GROQ_API_KEY")) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Gestion d'erreur générique
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de la génération du quiz",
      },
      { status: 500 }
    );
  }
}
