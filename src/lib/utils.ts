import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format markdown-like syntax to HTML
export function formatMarkdown(text: string): string {
  // Handle code blocks
  text = text.replace(/```(\w*)([\s\S]*?)```/g, (_match, language, code) => {
    return `<pre><code class="language-${language}">${escapeHtml(code.trim())}</code></pre>`;
  });
  
  // Handle inline code
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Handle bold text
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // Handle italic text
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // Handle line breaks
  text = text.replace(/\n/g, '<br>');
  
  return text;
}

// Escape HTML special characters
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}