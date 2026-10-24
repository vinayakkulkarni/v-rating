/**
 * Automation browsers (Playwright, headless checkers) get no analytics: bot
 * traffic pollutes the dataset and third-party beacons stretch the
 * networkidle window that agent checkers wait on. Real users are unaffected.
 *
 * Gate the `useHead()` call itself, not the value passed to it: `useHead`
 * also runs during SSR, where this helper is always false.
 */
export function isAutomationBrowser(): boolean {
  if (!import.meta.client) return false;
  return navigator.webdriver === true;
}
