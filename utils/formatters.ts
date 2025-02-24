export function normalizeToUnderscore(text: string): string {
  return text
    .trim() // Remove leading/trailing spaces
    .replace(/[-\s]+/g, '_') // Replace spaces & dashes with underscores
    .replace(/^_+|_+$/g, ''); // Remove leading & trailing underscores
}

export function sanitizeInput(input: string): string {
  return input
    .trim() // Remove leading/trailing spaces
    .replace(/<[^>]*>/g, '') // Remove HTML tags to prevent XSS
    .replace(/[^\w\s-]/g, ''); // Remove special characters except spaces & dashes
}

export function capitalizeWords(text: string): string {
  return text
    .toLowerCase() // Convert entire string to lowercase first
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
}

export function dashToUnderscore(text: string): string {
  return text.replace(/-/g, '_'); // Replace all dashes with underscores
}
