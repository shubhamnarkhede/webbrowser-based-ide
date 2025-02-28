
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};

export const highlightTerminalOutput = (text: string): string => {
  // Basic syntax highlighting for terminal output
  return text
    // Highlight errors
    .replace(/(error|Error|ERROR|Exception|EXCEPTION|fail|Fail|FAIL)/gi, '<span style="color: #f56565;">$1</span>')
    // Highlight warnings
    .replace(/(warning|Warning|WARN|warn)/gi, '<span style="color: #ecc94b;">$1</span>')
    // Highlight success messages
    .replace(/(success|Success|SUCCESS|completed|Completed|done|Done)/gi, '<span style="color: #48bb78;">$1</span>')
    // Highlight paths and URLs
    .replace(/(\/?[\w\-\.\/\\]+\.(js|ts|jsx|tsx|css|html|json|md))/g, '<span style="color: #90cdf4;">$1</span>')
    .replace(/(https?:\/\/[^\s]+)/g, '<span style="color: #90cdf4;">$1</span>');
};
