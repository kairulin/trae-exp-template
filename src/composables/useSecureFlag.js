// src/composables/useSecureFlags.ts
import { reactive, computed } from 'vue'

const state = reactive({})

export function useSecureFlags() {
  function register(key) {
    state[key] = false
    return {
      isAllowed: computed(() => state[key]),
      enable: () => state[key] = true,
      disable: () => state[key] = false,
      assert: () => {
        if (!state[key]) throw new Error(`SecureFlag [${String(key)}] is not allowed`)
      }
    }
  }

  return { register }
}
