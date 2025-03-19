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

export function underscoreToDash(text: string): string {
  return text.replace(/_/g, '-'); // Replace all underscores with dashes
}

export function slugify(name: string): string {
  return name
    .toLowerCase() // Convert to lowercase
    .trim() // Remove extra spaces
    .replace(/\s+/g, '-') // Replace spaces with "-"
    .replace(/[^a-z0-9-]/g, ''); // Remove special characters
}

export function sanitizeAndCapitalize(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') // ✅ Remove HTML tags (XSS protection)
    .replace(/^\s+|\s+$/g, '') // ✅ Trim leading & trailing spaces, but keep spaces inside
    .toLowerCase() // ✅ Convert to lowercase first
    .replace(/(^|\s)\S/g, (char) => char.toUpperCase()); // ✅ Capitalize first letter of each word
}

export function capitalizeFirstLetter(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}
