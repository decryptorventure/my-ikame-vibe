// Utility functions can be added here
// Example: date formatting, string manipulation, etc.

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString();
}
