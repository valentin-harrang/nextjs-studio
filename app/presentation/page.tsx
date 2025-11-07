"use client";

import {
  ChevronLeft,
  ChevronRight,
  Home,
  Maximize,
  Minimize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useFullscreen } from "@/hooks/use-fullscreen";
import { useSlideNavigation } from "@/hooks/use-slide-navigation";
import { presentationSlides } from "@/constants/presentation-slides";

const slides = presentationSlides;

export default function PresentationPage() {
  const { isFullscreen, toggleFullscreen, containerRef } = useFullscreen();
  const { currentSlide, goToNext, goToPrevious, goToSlide } =
    useSlideNavigation({
      totalSlides: slides.length,
      onFullscreenToggle: toggleFullscreen,
    });

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
    >
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        <Link href="/">
          <Button variant="outline" size="sm">
            <Home className="size-4 mr-2" />
            Accueil
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleFullscreen}
          title={
            isFullscreen ? "Quitter le plein écran (F)" : "Plein écran (F)"
          }
        >
          {isFullscreen ? (
            <Minimize className="size-4" />
          ) : (
            <Maximize className="size-4" />
          )}
        </Button>
      </div>

      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-5xl">
          <Card className="p-8 md:p-12 min-h-150 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              {slides[currentSlide]?.content}
            </div>

            <div className="mt-8 flex items-center justify-between border-t pt-6">
              <Button
                onClick={goToPrevious}
                disabled={currentSlide === 0}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="size-4" />
                Précédent
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {currentSlide + 1} / {slides.length}
                </span>
                <div className="flex gap-1">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        index === currentSlide
                          ? "bg-primary"
                          : "bg-muted hover:bg-muted-foreground/50"
                      }`}
                      aria-label={`Aller à la slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {currentSlide < slides.length - 1 && (
                <Button
                  onClick={goToNext}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  Suivant
                  <ChevronRight className="size-4" />
                </Button>
              )}
            </div>

            <div className="mt-4 text-center text-xs text-muted-foreground">
              <p>
                Utilisez les flèches du clavier ou la barre d&apos;espace pour
                naviguer
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
