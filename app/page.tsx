// Home Page SSG
import { Sparkles, BookOpen } from "lucide-react";
import { PageContainer } from "@/components/shared/page-container";
import { FeatureCard } from "@/components/shared/feature-card";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { homeFeatures } from "@/constants/home-features";

export default function Home() {
  return (
    <PageContainer centered>
      <div className="text-center mb-8 w-full">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Sparkles className="size-8 text-blue-500" />
          <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Next.js Studio
          </h1>
        </div>
        <p className="text-base mx-auto text-muted-foreground">
          Découvrez l&apos;intégration de l&apos;IA avec Next.js et les
          différents modes de rendu : CSR, SSR, SSG et ISR
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 w-full">
        {homeFeatures.map((feature) => (
          <FeatureCard
            key={feature.href}
            title={feature.title}
            description={feature.description}
            href={feature.href}
            icon={feature.icon}
            badge={feature.badge}
            badgeVariant={feature.badgeVariant}
            gradient={feature.gradient}
          />
        ))}
      </div>

      {/* Modes de Rendu - Pleine largeur */}
      <Card className="w-full p-6 mb-8 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookOpen className="size-5 text-slate-700 dark:text-slate-300" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Modes de Rendu
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Comprendre CSR, SSR, SSG et ISR
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
          <Link href="/csr">
            <Card className="h-full p-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/20 text-center flex flex-col justify-center">
              <div className="text-3xl mb-2">💻</div>
              <h3 className="font-semibold mb-1">CSR</h3>
              <p className="text-xs text-muted-foreground">
                Client-Side Rendering
              </p>
            </Card>
          </Link>

          <Link href="/ssr">
            <Card className="h-full p-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 text-center flex flex-col justify-center">
              <div className="text-3xl mb-2">🖥️</div>
              <h3 className="font-semibold mb-1">SSR</h3>
              <p className="text-xs text-muted-foreground">
                Server-Side Rendering
              </p>
            </Card>
          </Link>

          <Link href="/ssg">
            <Card className="h-full p-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20 text-center flex flex-col justify-center">
              <div className="text-3xl mb-2">📄</div>
              <h3 className="font-semibold mb-1">SSG</h3>
              <p className="text-xs text-muted-foreground">
                Static Site Generation
              </p>
            </Card>
          </Link>

          <Link href="/isr">
            <Card className="h-full p-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20 text-center flex flex-col justify-center">
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="font-semibold mb-1">ISR</h3>
              <p className="text-xs text-muted-foreground leading-tight">
                Incremental Static Regeneration
              </p>
            </Card>
          </Link>
        </div>
      </Card>
    </PageContainer>
  );
}
