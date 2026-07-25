import clsx, { type ClassValue } from "clsx";

/** Concatena classes condicionais. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
