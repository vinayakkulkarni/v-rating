import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vite-plus/test';
import { createApp } from 'vue';
import VRating, { VRatingPlugin } from '../src/index';

function activeCount(wrapper: ReturnType<typeof mount>) {
  return wrapper.findAll('i.icon.active').length;
}

describe('VRating', () => {
  it('renders Semantic-UI rating markup', () => {
    const wrapper = mount(VRating, { props: { modelValue: 2, type: 'heart' } });
    const root = wrapper.get('div');
    expect(root.classes()).toEqual(
      expect.arrayContaining(['ui', 'rating', 'heart']),
    );
    expect(root.attributes('role')).toBe('radiogroup');
    const icons = wrapper.findAll('i');
    expect(icons).toHaveLength(5);
    expect(icons[0]?.classes()).toEqual(
      expect.arrayContaining(['heart', 'icon', 'active']),
    );
    expect(activeCount(wrapper)).toBe(2);
  });

  it('renders `max` icons', () => {
    const wrapper = mount(VRating, { props: { max: 10 } });
    expect(wrapper.findAll('i')).toHaveLength(10);
  });

  it('emits update:modelValue and rate on click', async () => {
    const wrapper = mount(VRating, { props: { modelValue: 0 } });
    await wrapper.findAll('i')[3]?.trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4]);
    expect(wrapper.emitted('rate')?.[0]).toEqual([4]);
  });

  it('clears when the current rating is clicked again', async () => {
    const wrapper = mount(VRating, { props: { modelValue: 3 } });
    await wrapper.findAll('i')[2]?.trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([0]);
  });

  it('keeps the rating when clearable is false', async () => {
    const wrapper = mount(VRating, {
      props: { modelValue: 3, clearable: false },
    });
    await wrapper.findAll('i')[2]?.trigger('click');
    // The value is unchanged, so v-model stays quiet; `rate` still reports it.
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(wrapper.emitted('rate')?.[0]).toEqual([3]);
    expect(wrapper.findAll('i.icon.active')).toHaveLength(3);
  });

  it('ignores input when disabled', async () => {
    const wrapper = mount(VRating, {
      props: { modelValue: 1, disabled: true },
    });
    await wrapper.findAll('i')[3]?.trigger('click');
    await wrapper.findAll('i')[0]?.trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    expect(wrapper.get('div').classes()).toContain('disabled');
    expect(wrapper.findAll('i[tabindex="0"]')).toHaveLength(0);
  });

  it('previews the hovered rating', async () => {
    const wrapper = mount(VRating, { props: { modelValue: 1 } });
    await wrapper.findAll('i')[2]?.trigger('mouseenter');
    expect(wrapper.get('div').classes()).toContain('selected');
    expect(wrapper.findAll('i.icon.selected')).toHaveLength(3);
    await wrapper.get('div').trigger('mouseleave');
    expect(wrapper.findAll('i.icon.selected')).toHaveLength(0);
  });

  it('supports arrow, Home and End keys', async () => {
    const wrapper = mount(VRating, { props: { modelValue: 2 } });
    const icons = wrapper.findAll('i');
    await icons[1]?.trigger('keydown', { key: 'ArrowRight' });
    await icons[1]?.trigger('keydown', { key: 'End' });
    await icons[1]?.trigger('keydown', { key: 'Home' });
    // ArrowLeft on 1 clamps to 1: no model change, but `rate` fires.
    await icons[0]?.trigger('keydown', { key: 'ArrowLeft' });
    expect(wrapper.emitted('update:modelValue')).toEqual([[3], [5], [1]]);
    expect(wrapper.emitted('rate')).toEqual([[3], [5], [1], [1]]);
  });

  it('selects with Enter and Space', async () => {
    const wrapper = mount(VRating, { props: { modelValue: 0 } });
    await wrapper.findAll('i')[1]?.trigger('keydown', { key: 'Enter' });
    await wrapper.findAll('i')[3]?.trigger('keydown', { key: ' ' });
    expect(wrapper.emitted('update:modelValue')).toEqual([[2], [4]]);
  });

  it('exposes one tab stop on the current rating', () => {
    const wrapper = mount(VRating, { props: { modelValue: 4 } });
    const stops = wrapper.findAll('i[tabindex="0"]');
    expect(stops).toHaveLength(1);
    expect(stops[0]?.attributes('aria-checked')).toBe('true');
  });

  it('registers globally through the plugin', () => {
    const app = createApp({});
    app.use(VRatingPlugin);
    expect(app.component('VRating')).toBe(VRating);
  });
});
