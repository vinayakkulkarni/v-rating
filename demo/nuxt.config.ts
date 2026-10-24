import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

// Cloudflare compatibility date — keep the two copies below in sync.
const COMPATIBILITY_DATE = '2026-10-23';

export default defineNuxtConfig({
  compatibilityDate: COMPATIBILITY_DATE,

  modules: ['@nuxtjs/color-mode'],

  devtools: { enabled: false },

  // The demo runs the library from source, so dev, typecheck and build never
  // wait on `vp pack` and always exercise the current component.
  alias: {
    'v-rating': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
  },

  css: [
    'fomantic-ui-css/components/icon.min.css',
    'fomantic-ui-css/components/rating.min.css',
    '~/assets/css/main.css',
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  // Cookie-backed so the server renders the right class on <html>; the
  // module's inline head script resolves "system" before first paint.
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    storage: 'cookie',
    storageKey: 'v-rating-color-mode',
  },

  // Public IDs ship in the HTML; they are not secrets. Override per env with
  // NUXT_PUBLIC_GTAG_ID, NUXT_PUBLIC_PLAUSIBLE_SCRIPT_ID, etc. An empty
  // gtagId skips GA4 entirely (no measurement ID is issued yet).
  runtimeConfig: {
    public: {
      gtagId: '',
      plausibleScriptId: 'pa-EHQKi7RdV4c3G2RfNFWdT',
      plausibleApiHost: 'https://analytics.geoql.in',
      openpanelClientId: '4ba70595-d6ee-4d6c-9012-66df905541dc',
      openpanelApiUrl: 'https://events.geoql.in/api',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'v-rating — accessible rating for Vue 3',
      meta: [
        {
          name: 'description',
          content:
            'An accessible Vue 3 rating component styled by Fomantic-UI. Stars or hearts, keyboard support, v-model, no jQuery.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'preload',
          href: '/fonts/clash-display-600.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
        },
        {
          rel: 'preload',
          href: '/fonts/satoshi-400.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
        },
      ],
    },
  },

  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      nodeCompat: true,
      deployConfig: true,
      // Merged into the generated .output/server/wrangler.json.
      wrangler: {
        name: 'v-rating-demo',
        account_id: 'bd11b1c42ee2759044a1769f80f704dd',
        compatibility_date: COMPATIBILITY_DATE,
        workers_dev: true,
        preview_urls: false,
        routes: [
          { pattern: 'v-rating.vinayakkulkarni.dev', custom_domain: true },
        ],
        observability: { enabled: true },
      },
    },
  },

  typescript: {
    strict: true,
  },
});
