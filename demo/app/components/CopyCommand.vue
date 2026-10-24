<script setup lang="ts">
  const props = defineProps<{ command: string }>();

  const { track } = useAnalytics();
  const copied = ref(false);
  let timer: ReturnType<typeof setTimeout> | null = null;

  async function copy() {
    await navigator.clipboard.writeText(props.command);
    track('install_copy', { command: props.command });
    copied.value = true;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => (copied.value = false), 1600);
  }

  onBeforeUnmount(() => {
    if (timer) clearTimeout(timer);
  });
</script>

<template>
  <div class="flex min-w-0 items-stretch border border-rule bg-paper-2">
    <code
      class="min-w-0 flex-1 overflow-x-auto px-4 py-3 font-mono text-sm whitespace-nowrap text-ink"
      >{{ props.command }}</code
    >
    <button
      type="button"
      class="shrink-0 border-l border-rule px-4 font-mono text-xs text-ink-2 transition-colors hover:bg-paper hover:text-ink"
      :aria-label="copied ? 'Copied' : `Copy: ${props.command}`"
      @click="copy"
    >
      <span aria-live="polite">{{ copied ? 'copied' : 'copy' }}</span>
    </button>
  </div>
</template>
