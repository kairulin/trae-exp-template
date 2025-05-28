import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BaseInput from '../BaseInput.vue'

describe('BaseInput', () => {
  it('渲染輸入框元素', () => {
    const wrapper = mount(BaseInput)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('輸入時觸發 update:modelValue 事件', async () => {
    const wrapper = mount(BaseInput)
    const input = wrapper.find('input')
    await input.setValue('測試')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['測試'])
  })

  it('正確應用禁用屬性', () => {
    const wrapper = mount(BaseInput, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.find('input').element.disabled).toBe(true)
  })

  describe('黑箱測試', () => {
    it('輸入框在不同類型下正確工作', () => {
      const types = ['text', 'password', 'number', 'email']
      types.forEach(type => {
        const wrapper = mount(BaseInput, {
          props: { type }
        })
        expect(wrapper.find('input').attributes('type')).toBe(type)
      })
    })
  
    it('正確顯示佔位符文本', () => {
      const placeholder = '請輸入...'
      const wrapper = mount(BaseInput, {
        props: { placeholder }
      })
      expect(wrapper.find('input').attributes('placeholder')).toBe(placeholder)
    })
  
    it('在禁用狀態下保持輸入值', async () => {
      const wrapper = mount(BaseInput, {
        props: {
          modelValue: '初始值'
        }
      })
      
      await wrapper.setProps({ disabled: true })
      expect(wrapper.find('input').element.value).toBe('初始值')
    })
  
    it('在輸入特殊字符時正確處理', async () => {
      const wrapper = mount(BaseInput)
      const input = wrapper.find('input')
      const specialChars = '!@#$%^&*()'
      
      await input.setValue(specialChars)
      expect(wrapper.emitted('update:modelValue')[0][0]).toBe(specialChars)
    })
  })
})