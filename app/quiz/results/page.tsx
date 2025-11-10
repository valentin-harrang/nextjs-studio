"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/shared/page-container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, CheckCircle2, XCircle, RefreshCw, Sparkles } from "lucide-react";
import type { Quiz } from "../page";

// 🎓 Type pour les résultats du quiz
type QuizResults = {
  quiz: Quiz;
  userAnswers: Array<{
    questionIndex: number;
    selectedAnswer: number;
    isCorrect: boolean;
  }>;
  score: number;
  totalQuestions: number;
  topic: string;
  difficulty: string;
};

export default function QuizResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<QuizResults | null>(null);

  // 🎓 Charger les résultats depuis sessionStorage
  useEffect(() => {
    const storedResults = sessionStorage.getItem("quizResults");

    if (!storedResults) {
      // Si pas de résultats, rediriger vers la page de configuration
      router.push("/quiz");
      return;
    }

    try {
      const parsedResults = JSON.parse(storedResults) as QuizResults;
      setResults(parsedResults);
    } catch (error) {
      console.error("Error parsing results:", error);
      router.push("/quiz");
    }
  }, [router]);

  // 🎓 Si les résultats ne sont pas encore chargés
  if (!results) {
    return (
      <PageContainer centered>
        <p className="text-muted-foreground">Chargement des résultats...</p>
      </PageContainer>
    );
  }

  const percentage = Math.round((results.score / results.totalQuestions) * 100);

  // 🎓 Fonction pour déterminer le message selon le score
  const getScoreMessage = () => {
    if (percentage === 100) return "Parfait ! 🎉";
    if (percentage >= 80) return "Excellent ! 🌟";
    if (percentage >= 60) return "Bien joué ! 👍";
    if (percentage >= 40) return "Pas mal ! 💪";
    return "Continue à t'entraîner ! 📚";
  };

  // 🎓 Fonction pour déterminer la couleur du score
  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600 dark:text-green-400";
    if (percentage >= 60) return "text-blue-600 dark:text-blue-400";
    if (percentage >= 40) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  // 🎓 Fonction pour refaire un quiz
  const handleNewQuiz = () => {
    // Nettoyer le sessionStorage
    sessionStorage.removeItem("currentQuiz");
    sessionStorage.removeItem("quizResults");
    sessionStorage.removeItem("quizTopic");
    sessionStorage.removeItem("quizDifficulty");

    // Rediriger vers la page de configuration
    router.push("/quiz");
  };

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        {/* Header avec score */}
        <Card className="p-8 mb-8 text-center border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Trophy className="size-12 text-purple-600 dark:text-purple-400" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">Quiz terminé !</h1>
          <p className="text-muted-foreground mb-6">
            {results.topic} - Niveau {results.difficulty}
          </p>

          <div className="space-y-2">
            <div className={`text-6xl font-bold ${getScoreColor()}`}>
              {results.score}/{results.totalQuestions}
            </div>
            <div className="text-2xl text-muted-foreground">{percentage}%</div>
            <p className="text-xl font-semibold mt-4">{getScoreMessage()}</p>
          </div>

          <Button
            onClick={handleNewQuiz}
            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white"
            size="lg"
          >
            <RefreshCw className="size-4" />
            Refaire un quiz
          </Button>
        </Card>

        {/* Titre de la section récapitulative */}
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="size-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-2xl font-bold">Récapitulatif détaillé</h2>
        </div>

        {/* Liste des questions */}
        <div className="space-y-6">
          {results.quiz.questions.map((question, index) => {
            const userAnswer = results.userAnswers.find((a) => a.questionIndex === index);
            const isCorrect = userAnswer?.isCorrect ?? false;
            const selectedAnswerIndex = userAnswer?.selectedAnswer ?? -1;

            return (
              <Card
                key={index}
                className={`p-6 border-2 ${
                  isCorrect
                    ? "border-green-200 dark:border-green-800 bg-green-50/30 dark:bg-green-950/10"
                    : "border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-950/10"
                }`}
              >
                {/* Numéro et statut de la question */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex items-center justify-center size-8 rounded-full bg-slate-200 dark:bg-slate-700 font-semibold text-sm shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{question.question}</h3>
                  </div>
                  {isCorrect ? (
                    <CheckCircle2 className="size-6 text-green-600 dark:text-green-400 shrink-0" />
                  ) : (
                    <XCircle className="size-6 text-red-600 dark:text-red-400 shrink-0" />
                  )}
                </div>

                {/* Réponse de l'utilisateur (si incorrecte) */}
                {!isCorrect && selectedAnswerIndex !== -1 && (
                  <div className="mb-3 p-3 rounded-lg bg-red-100 dark:bg-red-950/30 border border-red-300 dark:border-red-800">
                    <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-1">
                      ❌ Ta réponse
                    </p>
                    <p className="text-sm text-red-800 dark:text-red-200">
                      {String.fromCharCode(65 + selectedAnswerIndex)}.{" "}
                      {question.options[selectedAnswerIndex]}
                    </p>
                  </div>
                )}

                {/* Bonne réponse */}
                <div className="mb-3 p-3 rounded-lg bg-green-100 dark:bg-green-950/30 border border-green-300 dark:border-green-800">
                  <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-1">
                    ✅ Bonne réponse
                  </p>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    {String.fromCharCode(65 + question.correctAnswer)}.{" "}
                    {question.options[question.correctAnswer]}
                  </p>
                </div>

                {/* Explication */}
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    💡 Explication
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-200">{question.explanation}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Bouton pour refaire un quiz en bas */}
        <div className="mt-8 text-center">
          <Button
            onClick={handleNewQuiz}
            className="bg-purple-600 hover:bg-purple-700 text-white"
            size="lg"
          >
            <RefreshCw className="size-4" />
            Refaire un quiz
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
