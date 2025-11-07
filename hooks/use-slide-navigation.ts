import { useState, useEffect, useCallback } from "react";

interface UseSlideNavigationOptions {
  totalSlides: number;
  onFullscreenToggle?: () => void;
}

export function useSlideNavigation({
  totalSlides,
  onFullscreenToggle,
}: UseSlideNavigationOptions) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, totalSlides - 1)));
  }, [totalSlides]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevious();
      } else if ((e.key === "f" || e.key === "F") && onFullscreenToggle) {
        e.preventDefault();
        onFullscreenToggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNext, goToPrevious, onFullscreenToggle]);

  return {
    currentSlide,
    goToNext,
    goToPrevious,
    goToSlide,
  };
}

