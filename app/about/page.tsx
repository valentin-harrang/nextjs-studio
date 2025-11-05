import { PageContainer } from "@/app/components/shared/page-container";
import { PageHeader } from "@/app/components/shared/page-header";
import { GoHome } from "../components/shared/go-home";

export const metadata = {
  title: "À propos",
};

export default function About() {
  return (
    <PageContainer>
      <GoHome />

      <PageHeader
        title="À propos"
        emoji="🤖"
        description="Découvrez le projet AI Assistant Hub"
        className="my-12"
      />

      <h2 className="text-2xl font-bold mb-4">🚀 Projet :</h2>
      <p className="text-gray-700 mb-4">
        AI Assistant Hub est un petit site Next.js proposant plusieurs
        fonctionnalités IA.
      </p>

      <h2 className="text-2xl font-bold mb-4">🎯 Objectif :</h2>
      <p className="text-gray-700 mb-4">
        Créer un petit site Next.js proposant plusieurs fonctionnalités IA :
      </p>

      <ul className="list-disc list-inside text-gray-700">
        <li>Page d’accueil statique (SSG)</li>
        <li>Chatbot interactif (CSR)</li>
        <li>Générateur d’idées IA (SSR)</li>
        <li>API Route connectée à un modèle IA (OpenAI, Groq ou local)</li>
      </ul>

      <h2 className="text-2xl font-bold my-4">👉 Le but :</h2>
      <ul className="list-disc list-inside text-gray-700">
        <li>Apprendre les fondamentaux de Next.js (App Router, rendu, API)</li>
        <li>Découvrir l’intégration d’un modèle IA via Vercel AI SDK</li>
        <li>Obtenir un projet concret et valorisable sur un portfolio.</li>
      </ul>
    </PageContainer>
  );
}
