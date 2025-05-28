import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BaseCheckbox from '../BaseCheckbox.vue'

describe('BaseCheckbox', () => {
  it('渲染複選框輸入框', () => {
    const wrapper = mount(BaseCheckbox)
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('變更時觸發 update:modelValue 事件', async () => {
    const wrapper = mount(BaseCheckbox)
    const checkbox = wrapper.find('input')
    await checkbox.setChecked()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([true])
  })

  it('渲染插槽內容', () => {
    const wrapper = mount(BaseCheckbox, {
      slots: {
        default: '複選框標籤'
      }
    })
    expect(wrapper.text()).toContain('複選框標籤')
  })

  describe('黑箱測試', () => {
    it('在禁用狀態下保持選中狀態', async () => {
      const wrapper = mount(BaseCheckbox, {
        props: {
          modelValue: true,
          disabled: true
        }
      })
      
      const checkbox = wrapper.find('input')
      expect(checkbox.element.checked).toBe(true)
      await checkbox.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })
  
    it('正確處理複雜的插槽內容', () => {
      const wrapper = mount(BaseCheckbox, {
        slots: {
          default: '<span class="icon">✓</span> 我同意<a href="#">服務條款</a>'
        }
      })
      
      expect(wrapper.html()).toContain('✓')
      expect(wrapper.html()).toContain('服務條款')
    })
  
    it('在快速切換時正確更新狀態', async () => {
      const wrapper = mount(BaseCheckbox)
      const checkbox = wrapper.find('input')
      
      for (let i = 0; i < 5; i++) {
        await checkbox.setChecked(true)
        await checkbox.setChecked(false)
      }
      
      expect(wrapper.emitted('update:modelValue').length).toBe(10)
    })
  })
})