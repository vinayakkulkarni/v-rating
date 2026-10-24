<script setup lang="ts">
  import { VRating, type RatingIcon } from 'v-rating';

  const MIN_MAX = 1;
  const MAX_MAX = 10;
  const TYPES: RatingIcon[] = ['star', 'heart'];

  const { track } = useAnalytics();

  const rating = ref(4);
  const type = ref<RatingIcon>('star');
  const max = ref(5);
  const clearable = ref(true);
  const disabled = ref(false);
  const lastEvent = ref<string | null>(null);

  const size = computed(() => (max.value > 6 ? 'huge' : 'massive'));
  const word = computed(() => (type.value === 'star' ? 'stars' : 'hearts'));

  function onRate(value: number) {
    lastEvent.value = `@rate → ${value}`;
    track('rating_changed', { value, max: max.value, type: type.value });
  }

  function setType(next: RatingIcon) {
    if (next === type.value) return;
    type.value = next;
    track('option_changed', { option: 'type', value: next });
  }

  function step(delta: number) {
    const next = Math.min(MAX_MAX, Math.max(MIN_MAX, max.value + delta));
    if (next === max.value) return;
    max.value = next;
    if (rating.value > next) rating.value = next;
    track('option_changed', { option: 'max', value: String(next) });
  }

  function toggle(option: 'clearable' | 'disabled') {
    const target = option === 'clearable' ? clearable : disabled;
    target.value = !target.value;
    track('option_changed', { option, value: String(target.value) });
  }
</script>

<template>
  <section
    aria-labelledby="playground-title"
    class="grid content-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12"
  >
    <div class="min-w-0 lg:col-span-5">
      <p class="font-mono text-xs tracking-wide text-ink-3 uppercase">
        Current rating
      </p>
      <p
        class="mt-2 flex items-baseline font-display font-semibold tracking-tight"
        aria-live="polite"
      >
        <span
          class="text-numeral tabular-nums"
          :class="type === 'heart' ? 'text-heart' : 'text-accent-ink'"
          >{{ rating }}</span
        >
        <span class="ml-3 text-numeral-sub text-ink-3">/{{ max }}</span>
      </p>
      <h1
        id="playground-title"
        class="mt-8 max-w-headline font-display text-heading font-semibold tracking-tight"
      >
        An accessible rating for Vue 3.
      </h1>
      <p class="mt-4 max-w-measure leading-relaxed text-ink-2">
        Fomantic-UI markup, no jQuery. Click, hover or use the arrow keys —
        <code class="font-mono text-sm">v-model</code> keeps the number in sync.
      </p>
    </div>

    <div class="flex min-w-0 flex-col gap-8 lg:col-span-7">
      <div class="border border-rule bg-paper-2 p-5 sm:p-8">
        <VRating
          v-model="rating"
          :class="size"
          :type="type"
          :max="max"
          :clearable="clearable"
          :disabled="disabled"
          :label="`Rate out of ${max} ${word}`"
          @rate="onRate"
        />
        <p class="mt-5 font-mono text-xs text-ink-3" aria-live="polite">
          {{ lastEvent ?? 'Pick a value to see the @rate event.' }}
        </p>
      </div>

      <dl class="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <dt class="font-mono text-xs text-ink-3">type</dt>
          <dd class="mt-2 flex">
            <button
              v-for="option in TYPES"
              :key="option"
              type="button"
              class="h-10 border border-rule px-4 font-mono text-sm transition-colors first:border-r-0"
              :class="
                option === type
                  ? 'bg-ink text-paper'
                  : 'text-ink-2 hover:text-ink'
              "
              :aria-pressed="option === type"
              @click="setType(option)"
            >
              {{ option }}
            </button>
          </dd>
        </div>

        <div>
          <dt class="font-mono text-xs text-ink-3">max</dt>
          <dd class="mt-2 flex items-stretch">
            <button
              type="button"
              class="h-10 w-10 border border-rule font-mono text-ink-2 transition-colors hover:text-ink disabled:opacity-40"
              aria-label="Fewer icons"
              :disabled="max <= MIN_MAX"
              @click="step(-1)"
            >
              −
            </button>
            <output
              class="flex h-10 w-12 items-center justify-center border-y border-rule font-mono text-sm tabular-nums"
              >{{ max }}</output
            >
            <button
              type="button"
              class="h-10 w-10 border border-rule font-mono text-ink-2 transition-colors hover:text-ink disabled:opacity-40"
              aria-label="More icons"
              :disabled="max >= MAX_MAX"
              @click="step(1)"
            >
              +
            </button>
          </dd>
        </div>

        <div v-for="option in ['clearable', 'disabled'] as const" :key="option">
          <dt class="font-mono text-xs text-ink-3">{{ option }}</dt>
          <dd class="mt-2">
            <button
              type="button"
              role="switch"
              class="inline-flex h-10 items-center gap-3 border border-rule px-4 font-mono text-sm text-ink-2 transition-colors hover:text-ink"
              :aria-checked="option === 'clearable' ? clearable : disabled"
              @click="toggle(option)"
            >
              <span
                class="size-2.5"
                :class="
                  (option === 'clearable' ? clearable : disabled)
                    ? 'bg-accent'
                    : 'border border-ink-3'
                "
                aria-hidden="true"
              />
              {{
                (option === 'clearable' ? clearable : disabled)
                  ? 'true'
                  : 'false'
              }}
            </button>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>
