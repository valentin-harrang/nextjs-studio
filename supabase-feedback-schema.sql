-- Table pour stocker les feedbacks anonymes des étudiants
-- À exécuter dans l'éditeur SQL de Supabase

CREATE TABLE IF NOT EXISTS course_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Évaluations (1-5)
  learning_rating INTEGER NOT NULL CHECK (learning_rating >= 1 AND learning_rating <= 5),
  enjoyment_rating INTEGER NOT NULL CHECK (enjoyment_rating >= 1 AND enjoyment_rating <= 5),

  -- Réponses textuelles
  what_learned TEXT NOT NULL,
  improvements TEXT NOT NULL,

  -- Recommandation
  would_recommend VARCHAR(10) NOT NULL CHECK (would_recommend IN ('yes', 'no', 'maybe')),

  -- Commentaires optionnels
  additional_comments TEXT,

  -- Métadonnées
  session_date DATE DEFAULT CURRENT_DATE,

  -- Index pour les requêtes
  CONSTRAINT feedback_check_length CHECK (
    length(what_learned) >= 10 AND
    length(improvements) >= 10
  )
);

-- Index pour améliorer les performances des requêtes
CREATE INDEX idx_course_feedback_created_at ON course_feedback(created_at DESC);
CREATE INDEX idx_course_feedback_session_date ON course_feedback(session_date);

-- Activer Row Level Security (RLS)
ALTER TABLE course_feedback ENABLE ROW LEVEL SECURITY;

-- Politique : Tout le monde peut insérer (anonyme)
CREATE POLICY "Anyone can insert feedback"
  ON course_feedback
  FOR INSERT
  WITH CHECK (true);

-- Politique : Seuls les admins peuvent lire (vous avec service_role)
CREATE POLICY "Only admins can read feedback"
  ON course_feedback
  FOR SELECT
  USING (false);

-- Note: Avec la service_role_key, vous pourrez quand même lire les données
-- car elle bypass les RLS policies

COMMENT ON TABLE course_feedback IS 'Feedbacks anonymes des étudiants pour les formations';
COMMENT ON COLUMN course_feedback.learning_rating IS 'Note d''apprentissage de 1 à 5';
COMMENT ON COLUMN course_feedback.enjoyment_rating IS 'Note d''appréciation de 1 à 5';
COMMENT ON COLUMN course_feedback.what_learned IS 'Ce que l''étudiant a appris';
COMMENT ON COLUMN course_feedback.improvements IS 'Suggestions d''amélioration';
COMMENT ON COLUMN course_feedback.would_recommend IS 'Si l''étudiant recommanderait la formation';
