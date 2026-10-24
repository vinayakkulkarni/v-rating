<script setup lang="ts">
  type Preference = 'system' | 'light' | 'dark';

  const ORDER: Preference[] = ['system', 'light', 'dark'];

  const colorMode = useColorMode();
  const { track } = useAnalytics();

  const preference = computed<Preference>(() =>
    ORDER.includes(colorMode.preference as Preference)
      ? (colorMode.preference as Preference)
      : 'system',
  );

  function cycle() {
    const next = ORDER[(ORDER.indexOf(preference.value) + 1) % ORDER.length]!;
    colorMode.preference = next;
    track('theme_changed', { preference: next });
  }
</script>

<template>
  <button
    type="button"
    class="inline-flex h-9 items-center gap-2 border border-rule px-3 font-mono text-xs text-ink-2 transition-colors hover:border-ink-3 hover:text-ink"
    :aria-label="`Theme: ${preference}. Switch theme`"
    :title="`Theme: ${preference}`"
    @click="cycle"
  >
    <svg
      class="size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <template v-if="preference === 'light'">
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        />
      </template>
      <path
        v-else-if="preference === 'dark'"
        d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z"
      />
      <template v-else>
        <rect x="3" y="4" width="18" height="12" rx="1" />
        <path d="M8 20h8M12 16v4" />
      </template>
    </svg>
    <span class="hidden sm:inline">{{ preference }}</span>
  </button>
</template>
