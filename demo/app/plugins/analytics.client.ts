import type {
  GtagHandle,
  OpenPanelHandle,
  PlausibleHandle,
  QueuedFn,
} from '~/types/analytics';
import { isAutomationBrowser } from '~/utils/automation-browser';

type AnalyticsWindow = Window & {
  plausible?: QueuedFn;
  op?: QueuedFn;
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

/** Queue stub: calls made before the script loads are replayed by it. */
function queued(existing: QueuedFn | undefined): QueuedFn {
  if (existing) return existing;
  const stub: QueuedFn = (...args: unknown[]) => {
    (stub.q ||= []).push(args);
  };
  return stub;
}

export default defineNuxtPlugin(() => {
  if (isAutomationBrowser()) return;

  const config = useRuntimeConfig().public;
  const w = window as AnalyticsWindow;
  const scripts: { src: string; async: true }[] = [];
  const provide: {
    plausible?: PlausibleHandle;
    openpanel?: OpenPanelHandle;
    ga?: GtagHandle;
  } = {};

  // Plausible official snippet: the pa-*.js tracker boots only if
  // `plausible.o` is already set, so init() runs before the script arrives.
  if (config.plausibleScriptId && config.plausibleApiHost) {
    const plausible = queued(w.plausible);
    plausible.init ||= (options?: Record<string, unknown>) => {
      plausible.o = options || {};
    };
    w.plausible = plausible;
    plausible.init();
    scripts.push({
      src: `${config.plausibleApiHost}/js/${config.plausibleScriptId}.js`,
      async: true,
    });
    provide.plausible = {
      plausible: (...args: unknown[]) => w.plausible?.(...args),
    };
  }

  // OpenPanel official op1.js snippet. Client id only, never a secret.
  if (config.openpanelClientId && config.openpanelApiUrl) {
    w.op = queued(w.op);
    w.op('init', {
      apiUrl: config.openpanelApiUrl,
      clientId: config.openpanelClientId,
      trackScreenViews: true,
      trackOutgoingLinks: true,
      trackAttributes: true,
    });
    scripts.push({ src: 'https://openpanel.dev/op1.js', async: true });
    provide.openpanel = {
      track: (name, properties) => w.op?.('track', name, properties),
    };
  }

  // GA4 gtag. Skipped while the measurement ID is empty.
  if (config.gtagId) {
    w.dataLayer ||= [];
    w.gtag ||= function gtag() {
      // gtag.js reads the Arguments object, not an array.
      w.dataLayer!.push(arguments);
    };
    w.gtag('js', new Date());
    w.gtag('config', config.gtagId);
    scripts.push({
      src: `https://www.googletagmanager.com/gtag/js?id=${config.gtagId}`,
      async: true,
    });
    provide.ga = { gtag: (...args: unknown[]) => w.gtag?.(...args) };
  }

  useHead({ script: scripts });

  return { provide };
});
