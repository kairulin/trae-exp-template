<template>
  <label class="checkbox-wrapper">
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      class="checkbox-input"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="checkbox-label">
      <slot></slot>
    </span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.checkbox-wrapper {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-input {
  margin-right: 8px;
  cursor: pointer;
}

.checkbox-input:disabled {
  cursor: not-allowed;
}

.checkbox-label {
  font-size: 14px;
  user-select: none;
}
</style>