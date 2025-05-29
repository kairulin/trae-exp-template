import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserList from '../UserList.vue'

describe('UserList', () => {
  it('正確獲取並顯示用戶列表', async () => {
    const wrapper = mount(UserList)
    
    // 等待 API 請求完成
    await wrapper.vm.$nextTick()
    
    // 驗證渲染的用戶列表
    expect(wrapper.text()).toContain('使用者1')
    expect(wrapper.text()).toContain('使用者2')
  })
})