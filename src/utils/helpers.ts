
/**
 * Debounce function to limit the rate at which a function can fire
 */
export function debounce<F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
}

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy text: ', error);
    return false;
  }
}

/**
 * Simple syntax highlighting for terminal output
 */
export function highlightTerminalOutput(text: string): string {
  const errorRegex = /(error|fail|exception):/gi;
  const warningRegex = /(warning|warn):/gi;
  const successRegex = /(success|done|completed):/gi;
  const pathRegex = /([a-zA-Z0-9_-]+\.[a-zA-Z0-9]+)/g;
  
  return text
    .replace(errorRegex, '<span class="text-red-500">$1:</span>')
    .replace(warningRegex, '<span class="text-yellow-500">$1:</span>')
    .replace(successRegex, '<span class="text-green-500">$1:</span>')
    .replace(pathRegex, '<span class="text-blue-400">$1</span>');
}

// Helper function for classnames
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
