<script setup lang="ts">
  import type { LinkSection } from '~/types/analytics';

  const props = defineProps<{
    href: string;
    section: LinkSection;
  }>();

  const { track } = useAnalytics();

  function onClick() {
    track('outbound_click', { target: props.href, section: props.section });
  }
</script>

<template>
  <a :href="props.href" rel="noopener" @click="onClick">
    <slot />
  </a>
</template>
