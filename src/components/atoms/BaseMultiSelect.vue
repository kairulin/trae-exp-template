<template>
  <div class="select-container" ref="selectContainer">
    <select
      multiple
      class="native-select"
      :value="modelValue"
      @change="handleChange"
      :disabled="disabled"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <div
      class="custom-select"
      @click="toggleDropdown"
      :class="{ 'is-disabled': disabled }"
      ref="customSelect"
    >
      <div class="selected-text">
        <span v-if="!selectedLabels.length">{{ placeholder }}</span>
        <span v-else>{{ selectedLabels.join(', ') }}</span>
      </div>
      <div class="select-arrow"></div>
    </div>

    <Teleport to="body">
      <div
        v-if="isOpen"
        class="select-dropdown"
        :style="dropdownStyle"
      >
        <div
          v-for="option in options"
          :key="option.value"
          class="select-option"
          :class="{ 'selected': isSelected(option.value) }"
          @click="toggleOption(option.value)"
        >
          {{ option.label }}
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: '請選擇'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
const isOpen = ref(false)
const dropdownStyle = ref({})

const selectedLabels = computed(() => {
  return props.modelValue
    .map(value => props.options.find(opt => opt.value === value)?.label)
    .filter(Boolean)
})

const isSelected = (value) => props.modelValue.includes(value)

const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) updateDropdownPosition()
}

const selectContainer = ref(null)
const customSelect = ref(null)

const updateDropdownPosition = () => {
  if (!customSelect.value) return

  const rect = customSelect.value.getBoundingClientRect()
  dropdownStyle.value = {
    position: 'absolute',
    top: `${rect.bottom + 2}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    zIndex: 1000
  }
}

const handleClickOutside = (event) => {
  const isClickInContainer = selectContainer.value?.contains(event.target)
  const isClickInDropdown = event.target.closest('.select-dropdown')

  if (!isClickInContainer && !isClickInDropdown) {
    isOpen.value = false
  }
}

const toggleOption = (value) => {
  const newValue = [...props.modelValue]
  const index = newValue.indexOf(value)

  if (index === -1) {
    newValue.push(value)
  } else {
    newValue.splice(index, 1)
  }

  emit('update:modelValue', newValue)
}

const handleChange = (event) => {
  const selectedOptions = Array.from(event.target.selectedOptions)
  const values = selectedOptions.map(option => option.value)
  emit('update:modelValue', values)
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', updateDropdownPosition)
  window.addEventListener('resize', updateDropdownPosition)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', updateDropdownPosition)
  window.removeEventListener('resize', updateDropdownPosition)
})
</script>

<style scoped>
.select-container {
  position: relative;
  width: 240px;
}

.native-select {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.custom-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  padding: 0 8px;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s;
}

.custom-select:hover:not(.is-disabled) {
  border-color: var(--color-primary);
}

.custom-select.is-disabled {
  background: var(--color-disabled-bg);
  cursor: not-allowed;
  color: var(--color-disabled-text);
}

.selected-text {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  color: var(--color-text-primary);
}

.selected-text span {
  color: var(--color-text-secondary);
}

.select-arrow {
  width: 0;
  height: 0;
  margin-left: 8px;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid var(--color-text-secondary);
}

.select-option {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  color: var(--color-text-primary);
}

.select-option:hover {
  color: var(--color-primary-lighter);
  background: var(--color-text-primary);
}

.select-option.selected {
  color: var(--color-primary-lighter);
  background: var(--color-text-primary);
}

.select-option.selected:hover {
  color: var(--color-primary-lighter);
  background: var(--color-text-primary);
}

/* 添加新的樣式：選中項目的基本狀態 */
.select-option.selected:not(:hover) {
  background: var(--color-primary);
  color: #fff;
}

.select-dropdown {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  max-height: 256px;
  overflow-y: auto;
  border: 1px solid var(--color-border);
}
</style>
