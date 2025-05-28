import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import BaseButton from '../BaseButton.vue'

describe('BaseButton', () => {
  it('渲染按鈕並顯示插槽內容', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: '點擊我'
      }
    })
    expect(wrapper.text()).toBe('點擊我')
  })

  it('點擊時觸發 click 事件', async () => {
    const wrapper = mount(BaseButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('正確應用類型樣式', () => {
    const wrapper = mount(BaseButton, {
      props: {
        type: 'primary'
      }
    })
    expect(wrapper.classes()).toContain('type-primary')
  })

  it('防止連續點擊', async () => {
    vi.useFakeTimers()
    const wrapper = mount(BaseButton, {
      props: {
        debounceTime: 300
      }
    })

    // 第一次點擊
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
    
    // 立即再次點擊，不應該觸發事件
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
    
    // 等待防抖時間
    await vi.advanceTimersByTime(300)
    await wrapper.vm.$nextTick()
    
    // 現在可以再次點擊
    await wrapper.trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('click')).toHaveLength(2)
    
    vi.useRealTimers()
  })

  describe('黑箱測試', () => {
    it('按鈕在禁用狀態下不能點擊', async () => {
      const wrapper = mount(BaseButton, {
        props: {
          disabled: true
        }
      })
      
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('按鈕在載入時正確顯示不同類型的樣式', () => {
      const types = ['primary', 'secondary', 'danger']
      
      types.forEach(type => {
        const wrapper = mount(BaseButton, {
          props: { type }
        })
        expect(wrapper.classes()).toContain(`type-${type}`)
      })
    })

    it('按鈕能正確處理複雜的插槽內容', () => {
      const wrapper = mount(BaseButton, {
        slots: {
          default: '<span class="icon">🚀</span> 複雜的按鈕內容'
        }
      })
      
      expect(wrapper.html()).toContain('🚀')
      expect(wrapper.text()).toContain('複雜的按鈕內容')
    })

    it('按鈕在連續快速點擊時只觸發一次事件', async () => {
      vi.useFakeTimers()
      const wrapper = mount(BaseButton)
      
      // 模擬快速連續點擊
      for (let i = 0; i < 5; i++) {
        await wrapper.trigger('click')
      }
      
      expect(wrapper.emitted('click')).toHaveLength(1)
      
      // 等待防抖時間結束
      await vi.advanceTimersByTime(300)
      await wrapper.vm.$nextTick()
      
      // 再次點擊應該可以觸發
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(2)
      
      vi.useRealTimers()
    })

    it('按鈕在不同防抖時間設置下正確工作', async () => {
      vi.useFakeTimers()
      const wrapper = mount(BaseButton, {
        props: {
          debounceTime: 500 // 設置較長的防抖時間
        }
      })
      
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
      
      // 等待 300ms（預設防抖時間）
      await vi.advanceTimersByTime(300)
      await wrapper.vm.$nextTick()
      
      // 300ms 後應該還是不能點擊
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(1)
      
      // 再等待 200ms（總共 500ms）
      await vi.advanceTimersByTime(200)
      await wrapper.vm.$nextTick()
      
      // 現在應該可以點擊了
      await wrapper.trigger('click')
      expect(wrapper.emitted('click')).toHaveLength(2)
      
      vi.useRealTimers()
    })
  })
})