import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/shared/page-header";
import { GoHome } from "@/components/shared/go-home";
import { ressources, categories } from "@/lib/ressources-data";
import { RessourcesTabs } from "@/components/domain/ressources/ressources-tabs";

export const metadata = {
  title: "Ressources",
  description: "Bibliothèques et outils recommandés pour Next.js et React",
};

export default function RessourcesPage() {
  const ressourcesByCategory = categories.map((category) => ({
    category,
    ressources: ressources
      .filter((r) => r.category === category)
      .map((r) => ({
        slug: r.slug,
        name: r.name,
        category: r.category,
        description: r.description,
        color: r.color,
      })),
  })).filter((group) => group.ressources.length > 0);

  return (
    <PageContainer>
      <GoHome />

      <PageHeader
        title="Ressources"
        emoji="📚"
        description="Bibliothèques et outils recommandés pour développer avec Next.js et React"
        className="my-12"
      />

      <RessourcesTabs ressourcesByCategory={ressourcesByCategory} />
    </PageContainer>
  );
}

