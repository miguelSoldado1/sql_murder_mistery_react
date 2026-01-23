import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STORAGE_KEY = "sql-cold-cases-progress";

interface Progress {
  completedChallenges: Record<string, boolean>;
}

function getProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { completedChallenges: {} };
    return JSON.parse(stored) as Progress;
  } catch {
    return { completedChallenges: {} };
  }
}

function saveProgress(progress: Progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Failed to save progress:", error);
  }
}

export function isChallengeCompleted(pathname: string) {
  const challengeId = pathname.substring(1); // Remove leading slash
  const progress = getProgress();
  return progress.completedChallenges[challengeId] === true;
}

export function markChallengeCompleted(pathname: string) {
  const challengeId = pathname.substring(1); // Remove leading slash
  const progress = getProgress();
  progress.completedChallenges[challengeId] = true;
  saveProgress(progress);
}
