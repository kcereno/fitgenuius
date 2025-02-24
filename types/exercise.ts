export interface Exercise {
  id: string;
  name: string;
}

export function underscoreToDash(text: string): string {
  return text.replace(/_/g, '-'); // Replace all underscores with dashes
}
