# v-rating

[![npm](https://img.shields.io/npm/v/v-rating.svg)](https://www.npmjs.com/package/v-rating)
[![downloads](https://img.shields.io/npm/dm/v-rating.svg)](https://www.npmjs.com/package/v-rating)
[![license](https://img.shields.io/npm/l/v-rating.svg)](./LICENSE)

An accessible Vue 3 rating component styled by [Fomantic-UI](https://fomantic-ui.com/modules/rating.html). Stars or hearts, `v-model`, full keyboard support. No jQuery, no Fomantic JavaScript — only its CSS.

**Demo:** [v-rating.vinayakkulkarni.dev](https://v-rating.vinayakkulkarni.dev)

## Requirements

- [Vue](https://vuejs.org/) 3.5+
- [fomantic-ui-css](https://www.npmjs.com/package/fomantic-ui-css) 2.9+ (icon + rating stylesheets)

## Install

```bash
pnpm add v-rating fomantic-ui-css
```

## Usage

```vue
<script setup lang="ts">
  import { ref } from 'vue';
  import { VRating } from 'v-rating';
  import 'fomantic-ui-css/components/icon.min.css';
  import 'fomantic-ui-css/components/rating.min.css';

  const rating = ref(3);
</script>

<template>
  <VRating v-model="rating" type="heart" :max="5" class="huge" />
</template>
```

Register globally instead:

```ts
import { createApp } from 'vue';
import { VRatingPlugin } from 'v-rating';

createApp(App).use(VRatingPlugin);
```

Fomantic-UI size classes (`mini` … `massive`) pass straight through `class`.

## Props

| Name        | Type                | Default    | Description                                |
| ----------- | ------------------- | ---------- | ------------------------------------------ |
| `v-model`   | `number`            | `0`        | The rating. `0` means no rating.           |
| `type`      | `'star' \| 'heart'` | `'star'`   | Icon set Fomantic-UI styles.               |
| `max`       | `number`            | `5`        | How many icons to render.                  |
| `clearable` | `boolean`           | `true`     | Clicking the current value resets it to 0. |
| `disabled`  | `boolean`           | `false`    | Read-only and out of the tab order.        |
| `label`     | `string`            | `'Rating'` | Accessible name of the radio group.        |

## Events

| Name                | Payload  | When                                   |
| ------------------- | -------- | -------------------------------------- |
| `update:modelValue` | `number` | The value changed.                     |
| `rate`              | `number` | Every pick, even if the value is same. |

## Keyboard

The rating is a `radiogroup` with one tab stop. Arrow keys move the value, Home and End jump to the ends, Enter and Space select (and clear, when `clearable`).

## Development

```bash
pnpm install
pnpm run lint && pnpm run format:check && pnpm run typecheck && pnpm run test
pnpm run build        # the package
pnpm run build:demo   # the package and the Nuxt demo
pnpm run deploy       # the demo to Cloudflare Workers
```

## License

[MIT](./LICENSE) © Vinayak Kulkarni
