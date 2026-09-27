const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };

export function escapeHtml(text: string): string {
  return text.replace(/[&<>"]/g, (char) => ESCAPES[char]);
}

/**
 * Converts dictionary text with *accent* markers into safe HTML: the text is
 * escaped first, then each *marked* run becomes the italic serif accent.
 */
export function accentHtml(text: string): string {
  return escapeHtml(text).replace(/\*([^*]+)\*/g, '<em class="accent">$1</em>');
}
