import { NextRequest, NextResponse } from 'next/server';
import { supabase, type CourseFeedback } from '@/lib/supabase';
import { z } from 'zod';

// Schema de validation
const feedbackSchema = z.object({
  learningRating: z.number().int().min(1).max(5),
  enjoymentRating: z.number().int().min(1).max(5),
  whatLearned: z.string().min(10),
  improvements: z.string().min(10),
  wouldRecommend: z.enum(['yes', 'no', 'maybe']),
  additionalComments: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Vérifier la date d'expiration
    const now = new Date();
    const expirationDate = new Date();
    expirationDate.setHours(23, 59, 59, 999);

    if (now > expirationDate) {
      return NextResponse.json(
        { error: 'Le formulaire a expiré' },
        { status: 403 }
      );
    }

    // Parser et valider les données
    const body = await request.json();
    const validatedData = feedbackSchema.parse(body);

    // Préparer les données pour Supabase
    const feedbackData: Omit<CourseFeedback, 'id' | 'created_at' | 'session_date'> = {
      learning_rating: validatedData.learningRating,
      enjoyment_rating: validatedData.enjoymentRating,
      what_learned: validatedData.whatLearned,
      improvements: validatedData.improvements,
      would_recommend: validatedData.wouldRecommend,
      additional_comments: validatedData.additionalComments || null,
    };

    // Insérer dans Supabase
    const { data, error } = await supabase
      .from('course_feedback')
      .insert([feedbackData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement du feedback' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Feedback enregistré avec succès',
        id: data.id
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// GET pour vérifier si le formulaire est encore actif
export async function GET() {
  const now = new Date();
  const expirationDate = new Date();
  expirationDate.setHours(23, 59, 59, 999);

  return NextResponse.json({
    isActive: now <= expirationDate,
    expiresAt: expirationDate.toISOString(),
  });
}
