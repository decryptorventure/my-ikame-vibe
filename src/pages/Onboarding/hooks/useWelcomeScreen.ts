import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';

const STORAGE_KEY = 'ikame_has_seen_welcome';

interface SlideData {
  id: string;
  title: string;
  description: string;
  image: string;
}

export function useWelcomeScreen(slides: SlideData[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const isLastSlide = currentIndex === slides.length - 1;

  const goNext = useCallback(() => {
    if (isLastSlide) return;
    setCurrentIndex((prev) => prev + 1);
  }, [isLastSlide]);

  const goBack = useCallback(() => {
    if (currentIndex === 0) return;
    setCurrentIndex((prev) => prev - 1);
  }, [currentIndex]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const complete = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');
    navigate(ROUTES.DASHBOARD, { replace: true });
  }, [navigate]);

  return {
    currentIndex,
    isLastSlide,
    goNext,
    goBack,
    goToSlide,
    complete,
  };
}

export function hasSeenWelcome(): boolean {
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

export function resetWelcome(): void {
  localStorage.removeItem(STORAGE_KEY);
}
