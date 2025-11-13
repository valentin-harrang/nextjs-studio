import { correctSpelling } from "@/lib/spell-checker";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Le texte est requis" },
        { status: 400 }
      );
    }

    const correctedText = await correctSpelling(text, { useCache: true });

    return NextResponse.json({ correctedText });
  } catch (error) {
    console.error("Erreur API spell-check:", error);
    return NextResponse.json(
      { error: "Erreur lors de la correction" },
      { status: 500 }
    );
  }
}
