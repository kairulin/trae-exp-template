import { mount } from '@vue/test-utils'
import BaseMultiSelect from '../BaseMultiSelect.vue'
import { describe, it, expect } from 'vitest'

describe('BaseMultiSelect', () => {
  const defaultOptions = [
    { value: '1', label: '選項1' },
    { value: '2', label: '選項2' },
    { value: '3', label: '選項3' }
  ]

  const createWrapper = (props = {}) => {
    return mount(BaseMultiSelect, {
      props: {
        options: defaultOptions,
        modelValue: [],
        ...props
      },
      attachTo: document.body // 添加這行來支持 Teleport
    })
  }

  it('正確渲染多選下拉框', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('.select-container').exists()).toBe(true)
    expect(wrapper.find('.custom-select').exists()).toBe(true)
  })

  it('顯示正確的 placeholder', () => {
    const wrapper = createWrapper({ placeholder: '測試佔位符' })
    expect(wrapper.find('.selected-text span').text()).toBe('測試佔位符')
  })

  it('點擊時打開下拉選單', async () => {
    const wrapper = createWrapper()
    await wrapper.find('.custom-select').trigger('click')
    await wrapper.vm.$nextTick() // 等待 DOM 更新
    const dropdown = document.querySelector('.select-dropdown')
    expect(dropdown).toBeTruthy()
  })

  it('選擇選項時正確更新值', async () => {
    const wrapper = createWrapper()
    await wrapper.find('.custom-select').trigger('click')
    await wrapper.vm.$nextTick()
    const option = document.querySelector('.select-option')
    await option.click()
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(['1'])
  })

  it('禁用狀態下不能操作', async () => {
    const wrapper = createWrapper({ disabled: true })
    await wrapper.find('.custom-select').trigger('click')
    const dropdown = document.querySelector('.select-dropdown')
    expect(dropdown).toBeFalsy()
  })

  it('點擊外部時關閉下拉選單', async () => {
    const wrapper = createWrapper()
    await wrapper.find('.custom-select').trigger('click')
    await wrapper.vm.$nextTick()

    // 創建一個 HTML 元素作為點擊目標
    const outsideElement = document.createElement('div')
    document.body.appendChild(outsideElement)

    // 觸發點擊事件
    await outsideElement.click()
    await wrapper.vm.$nextTick()

    const dropdown = document.querySelector('.select-dropdown')
    expect(dropdown).toBeFalsy()

    // 清理
    document.body.removeChild(outsideElement)
  })

  it('可以取消選擇已選項目', async () => {
    const wrapper = createWrapper({
      modelValue: ['1']
    })
    await wrapper.find('.custom-select').trigger('click')
    await wrapper.vm.$nextTick()
    const selectedOption = document.querySelector('.select-option.selected')
    await selectedOption.click()
    expect(wrapper.emitted('update:modelValue')[0][0]).toEqual([])
  })

  describe('黑箱測試', () => {
    it('在禁用狀態下保持已選值', async () => {
      const wrapper = createWrapper({
        modelValue: ['1'],
        disabled: true
      })
      expect(wrapper.find('.selected-text').text()).toBe('選項1')
    })

    it('處理空選項列表', () => {
      const wrapper = createWrapper({
        options: []
      })
      expect(wrapper.find('.selected-text span').text()).toBe('請選擇')
    })

    it('正確處理多個選項的選擇和取消', async () => {
      const wrapper = createWrapper()

      // 選擇第一個選項
      await wrapper.find('.custom-select').trigger('click')
      await wrapper.vm.$nextTick()
      const firstOption = document.querySelector('.select-option')
      await firstOption.click()
      await wrapper.vm.$nextTick()
      expect(wrapper.emitted('update:modelValue')[0][0]).toEqual(['1'])

      // 等待組件更新並重新打開下拉選單
      await wrapper.setProps({ modelValue: ['1'] })
      await wrapper.vm.$nextTick()
      await wrapper.find('.custom-select').trigger('click')
      await wrapper.vm.$nextTick()

      // 選擇第二個選項
      const options = document.querySelectorAll('.select-option')
      if (options.length > 1) {
        await options[1].click()
        await wrapper.vm.$nextTick()
        const emittedEvents = wrapper.emitted('update:modelValue')
        expect(emittedEvents[emittedEvents.length - 1][0]).toEqual(['1', '2'])
      }

      // 等待組件更新並重新打開下拉選單
      await wrapper.setProps({ modelValue: ['1', '2'] })
      await wrapper.vm.$nextTick()
      await wrapper.find('.custom-select').trigger('click')
      await wrapper.vm.$nextTick()

      // 取消第一個選項
      const finalOptions = document.querySelectorAll('.select-option')
      if (finalOptions.length > 0) {
        await finalOptions[0].click()
        await wrapper.vm.$nextTick()
        const emittedEvents = wrapper.emitted('update:modelValue')
        expect(emittedEvents[emittedEvents.length - 1][0]).toEqual(['2'])
      }
    })
  })
})
