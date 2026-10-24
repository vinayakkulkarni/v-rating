import type { App, Plugin } from 'vue';
import VRating from './components/VRating.vue';

export type { RatingIcon } from './types';

export const VRatingPlugin: Plugin = {
  install(app: App) {
    app.component('VRating', VRating);
  },
};

export { VRating };
export default VRating;
