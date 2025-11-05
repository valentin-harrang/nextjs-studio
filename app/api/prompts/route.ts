import { getPrompts } from "@/lib/get-prompts";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getPrompts();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error generating prompts:", error);
    return NextResponse.json(
      { error: "Failed to generate prompts" },
      { status: 500 }
    );
  }
}
