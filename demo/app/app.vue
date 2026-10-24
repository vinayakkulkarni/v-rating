<script setup lang="ts">
  const REPO = 'https://github.com/vinayakkulkarni/v-rating';
  const NPM = 'https://www.npmjs.com/package/v-rating';
  const SITE = 'https://v-rating.vinayakkulkarni.dev';
  const INSTALL = 'pnpm add v-rating fomantic-ui-css';
  const DESCRIPTION =
    'An accessible Vue 3 rating component styled by Fomantic-UI. Stars or hearts, keyboard support, v-model, no jQuery.';

  const USAGE = `<script setup lang="ts">
  import { ref } from 'vue';
  import { VRating } from 'v-rating';
  import 'fomantic-ui-css/components/icon.min.css';
  import 'fomantic-ui-css/components/rating.min.css';

  const rating = ref(3);
</${'script'}>

<template>
  <VRating v-model="rating" type="heart" :max="5" class="huge" />
</template>`;

  useSeoMeta({
    ogType: 'website',
    ogUrl: `${SITE}/`,
    ogTitle: 'v-rating — accessible rating for Vue 3',
    ogDescription: DESCRIPTION,
    twitterCard: 'summary',
  });

  useHead({
    link: [{ rel: 'canonical', href: `${SITE}/` }],
    meta: [
      {
        name: 'theme-color',
        content: '#f8f6f1',
        media: '(prefers-color-scheme: light)',
      },
      {
        name: 'theme-color',
        content: '#14161c',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  });

  const PROPS = [
    ['v-model', 'number', '0', 'The rating. 0 means no rating.'],
    ['type', "'star' | 'heart'", "'star'", 'Icon set Fomantic-UI styles.'],
    ['max', 'number', '5', 'How many icons to render.'],
    ['clearable', 'boolean', 'true', 'Clicking the current value resets to 0.'],
    ['disabled', 'boolean', 'false', 'Read-only, out of the tab order.'],
    ['label', 'string', "'Rating'", 'Accessible name of the radio group.'],
  ] as const;
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <header
      class="flex h-16 shrink-0 items-center justify-between gap-4 px-5 sm:px-8 lg:px-12"
    >
      <p class="font-mono text-sm text-ink">
        v-rating<span class="text-accent">.</span>
      </p>
      <nav class="flex items-center gap-2" aria-label="Project">
        <OutboundLink
          :href="NPM"
          section="header"
          class="inline-flex h-9 items-center border border-rule px-3 font-mono text-xs text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
        >
          npm
        </OutboundLink>
        <OutboundLink
          :href="REPO"
          section="header"
          class="inline-flex h-9 items-center gap-2 border border-rule px-3 font-mono text-xs text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
        >
          <svg
            class="size-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"
            />
          </svg>
          <span class="hidden sm:inline">GitHub</span>
        </OutboundLink>
        <ThemeToggle />
      </nav>
    </header>

    <main class="flex flex-1 flex-col">
      <RatingPlayground class="min-h-[calc(100dvh-4rem)]" />

      <section
        aria-labelledby="install-title"
        class="grid gap-10 border-t border-rule px-5 py-16 sm:px-8 lg:grid-cols-12 lg:px-12"
      >
        <div class="lg:col-span-5">
          <h2
            id="install-title"
            class="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.05] font-semibold tracking-tight"
          >
            Install
          </h2>
          <p class="mt-4 max-w-[48ch] leading-relaxed text-ink-2">
            The component renders Fomantic-UI markup. Bring the icon and rating
            stylesheets from
            <code class="font-mono text-sm">fomantic-ui-css</code>; no jQuery,
            no Fomantic JavaScript.
          </p>
        </div>
        <div class="flex min-w-0 flex-col gap-3 lg:col-span-7">
          <CopyCommand :command="INSTALL" />
          <pre
            class="overflow-x-auto border border-rule bg-paper-2 p-4 font-mono text-[13px] leading-relaxed text-ink-2"
          ><code>{{ USAGE }}</code></pre>
        </div>

        <div class="lg:col-span-5">
          <h2
            class="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.05] font-semibold tracking-tight"
          >
            Props
          </h2>
          <p class="mt-4 max-w-[48ch] leading-relaxed text-ink-2">
            Emits <code class="font-mono text-sm">update:modelValue</code> and
            <code class="font-mono text-sm">rate</code>. Arrow keys, Home and
            End move the value; Enter and Space select.
          </p>
        </div>
        <div class="min-w-0 overflow-x-auto lg:col-span-7">
          <table class="w-full min-w-[34rem] border-collapse text-left text-sm">
            <thead class="font-mono text-xs text-ink-3">
              <tr class="border-b border-rule">
                <th class="py-2 pr-4 font-normal">prop</th>
                <th class="py-2 pr-4 font-normal">type</th>
                <th class="py-2 pr-4 font-normal">default</th>
                <th class="py-2 font-normal">what it does</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="[name, kind, fallback, about] in PROPS"
                :key="name"
                class="border-b border-rule"
              >
                <td class="py-3 pr-4 font-mono text-ink">{{ name }}</td>
                <td class="py-3 pr-4 font-mono text-ink-2">{{ kind }}</td>
                <td class="py-3 pr-4 font-mono text-ink-2">{{ fallback }}</td>
                <td class="py-3 text-ink-2">{{ about }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <footer
      class="flex flex-wrap items-center justify-between gap-4 border-t border-rule px-5 py-6 font-mono text-xs text-ink-3 sm:px-8 lg:px-12"
    >
      <p>MIT · made with Vue by Vinayak Kulkarni</p>
      <OutboundLink
        :href="REPO"
        section="footer"
        class="underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-ink-3"
      >
        github.com/vinayakkulkarni/v-rating
      </OutboundLink>
    </footer>
  </div>
</template>
