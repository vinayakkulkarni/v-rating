<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { RatingIcon } from '../types';

  const props = withDefaults(
    defineProps<{
      /** Icon set: Semantic-UI / Fomantic-UI ships `star` and `heart`. */
      type?: RatingIcon;
      /** Number of icons rendered. */
      max?: number;
      /** Clicking the current rating again resets it to 0. */
      clearable?: boolean;
      /** Render the rating read-only. */
      disabled?: boolean;
      /** Accessible name for the radio group. */
      label?: string;
    }>(),
    {
      type: 'star',
      max: 5,
      clearable: true,
      disabled: false,
      label: 'Rating',
    },
  );

  const rating = defineModel<number>({ default: 0 });

  const emit = defineEmits<{
    rate: [value: number];
  }>();

  const hovered = ref(0);

  const icons = computed(() =>
    Array.from({ length: Math.max(0, Math.floor(props.max)) }, (_, i) => i + 1),
  );

  /** The icon that receives focus when tabbing into the group. */
  const focusable = computed(() =>
    rating.value >= 1 && rating.value <= icons.value.length ? rating.value : 1,
  );

  function commit(value: number) {
    rating.value = value;
    emit('rate', value);
  }

  /** Click / Enter / Space: selecting the current rating clears it. */
  function rate(value: number) {
    if (props.disabled) return;
    commit(props.clearable && value === rating.value ? 0 : value);
  }

  function hover(value: number) {
    if (!props.disabled) hovered.value = value;
  }

  function onKeydown(event: KeyboardEvent, value: number) {
    if (props.disabled) return;
    const keys: Record<string, number> = {
      ArrowRight: value + 1,
      ArrowUp: value + 1,
      ArrowLeft: value - 1,
      ArrowDown: value - 1,
      Home: 1,
      End: icons.value.length,
    };
    const target = keys[event.key];
    if (target === undefined) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        rate(value);
      }
      return;
    }
    event.preventDefault();
    const clamped = Math.min(Math.max(target, 1), icons.value.length);
    commit(clamped);
    const group = (event.currentTarget as HTMLElement).parentElement;
    const next = group?.children.item(clamped - 1);
    if (next instanceof HTMLElement) next.focus();
  }
</script>

<template>
  <div
    class="ui rating"
    :class="[props.type, { selected: hovered > 0, disabled: props.disabled }]"
    role="radiogroup"
    :aria-label="props.label"
    :aria-disabled="props.disabled || undefined"
    @mouseleave="hovered = 0"
  >
    <i
      v-for="value in icons"
      :key="value"
      class="icon"
      :class="[
        props.type,
        { active: value <= rating, selected: value <= hovered },
      ]"
      role="radio"
      :aria-checked="value === rating"
      :aria-label="`${value} of ${icons.length}`"
      :tabindex="props.disabled ? -1 : value === focusable ? 0 : -1"
      @click="rate(value)"
      @mouseenter="hover(value)"
      @keydown="onKeydown($event, value)"
    />
  </div>
</template>
