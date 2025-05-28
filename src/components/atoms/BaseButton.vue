<template>
  <button 
    class="base-button"
    :class="[`type-${type}`, { 'is-disabled': isDisabled }]"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'primary'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  debounceTime: {
    type: Number,
    default: 300
  }
})

const emit = defineEmits(['click'])
const isDisabled = ref(props.disabled)

// 監聽外部傳入的 disabled 屬性變化
watch(() => props.disabled, (newValue) => {
  isDisabled.value = newValue
})

const handleClick = async (event) => {
  if (isDisabled.value) return
  
  // 點擊後立即禁用按鈕
  isDisabled.value = true
  emit('click', event)
  
  // 使用 Promise 來處理延遲
  await new Promise(resolve => setTimeout(resolve, props.debounceTime))
  
  // 延遲後重新啟用按鈕
  if (!props.disabled) {
    isDisabled.value = false
  }
}
</script>

<style scoped>
.base-button {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  transition: all 0.3s;
}

.type-primary {
  background-color: var(--color-primary);
  color: white;
}

.type-primary:hover {
  background-color: var(--color-primary-light);
}

.type-secondary {
  background-color: var(--color-secondary);
  color: white;
}

.type-secondary:hover {
  background-color: var(--color-secondary-light);
}

.type-danger {
  background-color: var(--color-danger);
  color: white;
}

.type-danger:hover {
  background-color: var(--color-danger-light);
}

.is-disabled {
  opacity: 0.7;
  cursor: not-allowed;
  pointer-events: none;
}
</style>