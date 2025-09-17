import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind + conditional classes safely
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Prefix a path with the configured NEXT_PUBLIC_BASE_PATH
 */
export function basePath(path: string): string {
  return (
    (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/*$/, "") +
    "/" +
    path.replace(/^\/*/, "")
  );
}
