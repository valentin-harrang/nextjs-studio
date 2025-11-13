import { correctSpellingBatch } from "@/lib/spell-checker";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { texts } = await request.json();

    if (!Array.isArray(texts)) {
      return NextResponse.json(
        { error: "Un tableau de textes est requis" },
        { status: 400 }
      );
    }

    const correctedTexts = await correctSpellingBatch(texts, {
      useCache: true,
    });

    return NextResponse.json({ correctedTexts });
  } catch (error) {
    console.error("Erreur API spell-check-batch:", error);
    return NextResponse.json(
      { error: "Erreur lors de la correction" },
      { status: 500 }
    );
  }
}
