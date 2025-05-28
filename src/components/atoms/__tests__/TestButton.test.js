import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TestButton from '../TestButton.vue';

describe('TestButton', () => {
  it('renders properly', () => {
    const wrapper = mount(TestButton);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('renders default slot content', () => {
    const wrapper = mount(TestButton);
    expect(wrapper.text()).toBe('按鈕');
  });

  it('renders custom slot content', () => {
    const wrapper = mount(TestButton, {
      slots: {
        default: '自定義按鈕'
      }
    });
    expect(wrapper.text()).toBe('自定義按鈕');
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(TestButton);
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
