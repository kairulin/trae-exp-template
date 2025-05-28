import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import BaseSelect from '../BaseSelect.vue'

describe('BaseSelect', () => {
  const options = [
    { value: '1', label: '選項1' },
    { value: '2', label: '選項2' }
  ]

  it('渲染下拉選單和選項', () => {
    const wrapper = mount(BaseSelect, {
      props: {
        options
      }
    })
    expect(wrapper.findAll('option')).toHaveLength(2)
  })

  it('變更時觸發 update:modelValue 事件', async () => {
    const wrapper = mount(BaseSelect, {
      props: {
        options
      }
    })
    await wrapper.find('select').setValue('1')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['1'])
  })

  it('提供佔位符時渲染佔位符選項', () => {
    const wrapper = mount(BaseSelect, {
      props: {
        options,
        placeholder: '請選擇選項'
      }
    })
    expect(wrapper.find('option:first-child').text()).toBe('請選擇選項')
  })

  describe('黑箱測試', () => {
    it('在禁用狀態下保持選中值', async () => {
      const wrapper = mount(BaseSelect, {
        props: {
          options: [
            { value: '1', label: '選項1' },
            { value: '2', label: '選項2' }
          ],
          modelValue: '1',
          disabled: true
        }
      })
      
      const select = wrapper.find('select')
      expect(select.element.value).toBe('1')
      await select.trigger('change')
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })
  
    it('處理空選項列表', () => {
      const wrapper = mount(BaseSelect, {
        props: {
          options: [],
          placeholder: '無可用選項'
        }
      })
      
      expect(wrapper.find('option').text()).toBe('無可用選項')
      expect(wrapper.findAll('option')).toHaveLength(1)
    })
  
    it('正確處理不同類型的選項值', async () => {
      const wrapper = mount(BaseSelect, {
        props: {
          options: [
            { value: 1, label: '數字選項' },
            { value: 'string', label: '字串選項' },
            { value: true, label: '布林選項' }
          ]
        }
      })
      
      const options = wrapper.findAll('option')
      expect(options).toHaveLength(3)
      
      // 修改這裡：將值轉換為字串進行比較，因為 select 元素總是返回字串值
      await wrapper.find('select').setValue('1')
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['1'])
    })
  
    it('在快速切換選項時正確更新', async () => {
      const wrapper = mount(BaseSelect, {
        props: {
          options: [
            { value: '1', label: '選項1' },
            { value: '2', label: '選項2' }
          ]
        }
      })
      
      const select = wrapper.find('select')
      
      await select.setValue('1')
      await select.setValue('2')
      await select.setValue('1')
      
      expect(wrapper.emitted('update:modelValue')).toHaveLength(3)
      expect(wrapper.emitted('update:modelValue')[2]).toEqual(['1'])
    })
  })
})