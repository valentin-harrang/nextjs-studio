"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/shared/page-container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Trophy, ArrowRight } from "lucide-react";
import type { Quiz, QuizQuestion } from "../page";

// 🎓 Type pour une réponse utilisateur
type UserAnswer = {
  questionIndex: number;
  selectedAnswer: number;
  isCorrect: boolean;
};

export default function QuizPlayPage() {
  const router = useRouter();

  // 🎓 State du quiz
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [quizTopic, setQuizTopic] = useState<string>("");
  const [quizDifficulty, setQuizDifficulty] = useState<string>("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [score, setScore] = useState(0);

  // 🎓 Charger le quiz depuis sessionStorage au montage
  useEffect(() => {
    const storedQuiz = sessionStorage.getItem("currentQuiz");
    const storedTopic = sessionStorage.getItem("quizTopic");
    const storedDifficulty = sessionStorage.getItem("quizDifficulty");

    if (!storedQuiz) {
      // Si pas de quiz, rediriger vers la page de configuration
      router.push("/quiz");
      return;
    }

    try {
      const parsedQuiz = JSON.parse(storedQuiz) as Quiz;
      setQuiz(parsedQuiz);
      setQuizTopic(storedTopic || "Quiz");
      setQuizDifficulty(storedDifficulty || "Moyen");
    } catch (error) {
      console.error("Error parsing quiz:", error);
      router.push("/quiz");
    }
  }, [router]);

  // 🎓 Si le quiz n'est pas encore chargé, afficher un loader
  if (!quiz) {
    return (
      <PageContainer centered>
        <p className="text-muted-foreground">Chargement du quiz...</p>
      </PageContainer>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // 🎓 Fonction pour sélectionner une réponse
  const handleSelectAnswer = (answerIndex: number) => {
    if (hasAnswered) return; // Empêcher de changer de réponse après avoir validé

    setSelectedAnswer(answerIndex);
    setHasAnswered(true);

    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    // Enregistrer la réponse
    setUserAnswers([
      ...userAnswers,
      {
        questionIndex: currentQuestionIndex,
        selectedAnswer: answerIndex,
        isCorrect,
      },
    ]);

    // Mettre à jour le score
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  // 🎓 Fonction pour passer à la question suivante
  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      // Passer à la question suivante
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      // Dernier question - rediriger vers les résultats
      // Stocker les données nécessaires pour la page des résultats
      sessionStorage.setItem(
        "quizResults",
        JSON.stringify({
          quiz,
          userAnswers: [
            ...userAnswers,
            {
              questionIndex: currentQuestionIndex,
              selectedAnswer,
              isCorrect: selectedAnswer === currentQuestion.correctAnswer,
            },
          ],
          score: selectedAnswer === currentQuestion.correctAnswer ? score + 1 : score,
          totalQuestions,
          topic: quizTopic,
          difficulty: quizDifficulty,
        })
      );
      router.push("/quiz/results");
    }
  };

  // 🎓 Fonction pour déterminer le style d'un bouton de réponse
  const getAnswerButtonStyle = (answerIndex: number) => {
    if (!hasAnswered) {
      return "bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 border-2 border-slate-200 dark:border-slate-700 text-left";
    }

    // Après avoir répondu, afficher les couleurs
    if (answerIndex === currentQuestion.correctAnswer) {
      return "bg-green-100 dark:bg-green-950/30 border-2 border-green-500 text-green-900 dark:text-green-100";
    }

    if (answerIndex === selectedAnswer && answerIndex !== currentQuestion.correctAnswer) {
      return "bg-red-100 dark:bg-red-950/30 border-2 border-red-500 text-red-900 dark:text-red-100";
    }

    return "bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 opacity-50";
  };

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        {/* Header avec score et progression */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">{quizTopic}</h1>
              <p className="text-sm text-muted-foreground">Niveau: {quizDifficulty}</p>
            </div>
            <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-950/30 px-4 py-2 rounded-lg">
              <Trophy className="size-5 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-blue-900 dark:text-blue-100">
                Score: {score}/{totalQuestions}
              </span>
            </div>
          </div>

          {/* Barre de progression */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Question {currentQuestionIndex + 1}/{totalQuestions}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question */}
        <Card className="p-8 mb-6 border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20">
          <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>

          {/* Options de réponse */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={hasAnswered}
                className={`w-full p-4 rounded-lg transition-all duration-200 ${getAnswerButtonStyle(
                  index
                )} ${!hasAnswered ? "hover:shadow-md cursor-pointer" : "cursor-default"}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-8 rounded-full bg-slate-200 dark:bg-slate-700 font-semibold text-sm shrink-0">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">{option}</span>
                  {hasAnswered && index === currentQuestion.correctAnswer && (
                    <CheckCircle2 className="size-6 text-green-600 dark:text-green-400 shrink-0" />
                  )}
                  {hasAnswered &&
                    index === selectedAnswer &&
                    index !== currentQuestion.correctAnswer && (
                      <XCircle className="size-6 text-red-600 dark:text-red-400 shrink-0" />
                    )}
                </div>
              </button>
            ))}
          </div>

          {/* Explication (visible après avoir répondu) */}
          {hasAnswered && (
            <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                💡 Explication
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </Card>

        {/* Bouton suivant */}
        {hasAnswered && (
          <Button
            onClick={handleNextQuestion}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            size="lg"
          >
            {currentQuestionIndex < totalQuestions - 1 ? (
              <>
                Question suivante
                <ArrowRight className="size-4" />
              </>
            ) : (
              <>
                Voir les résultats
                <Trophy className="size-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </PageContainer>
  );
}
