/**
 * Render the explicit theme class on <html> during SSR, from the
 * @nuxtjs/color-mode preference cookie, so the first byte already paints in
 * the chosen theme. "system" stays unset here: the module's inline head
 * script resolves it from prefers-color-scheme before first paint.
 */
const COOKIE = 'v-rating-color-mode';
const EXPLICIT = new Set(['light', 'dark']);

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', (html, { event }) => {
    const value = getCookie(event, COOKIE);
    if (value && EXPLICIT.has(value)) html.htmlAttrs.push(`class="${value}"`);
  });
});
