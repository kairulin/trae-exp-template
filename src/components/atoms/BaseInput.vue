<template>
  <div class="input-wrapper">
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="base-input"
      :class="{ 'has-error': errorMessage }"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.input-wrapper {
  display: inline-block;
  width: 100%;
  position: relative;
  min-height: 32px;
}

.base-input {
  width: 100%;
  height: 32px;
  padding: 0 12px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 14px;
  line-height: 32px;
  transition: all 0.2s;
  color: var(--color-text-primary);
}

.base-input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.base-input:disabled {
  background-color: var(--color-bg-disabled);
  cursor: not-allowed;
}

.base-input.has-error {
  border-color: var(--color-danger);
}

.error-message {
  position: absolute;
  left: 0;
  font-size: 12px;
  color: var(--color-danger);
  line-height: 1.5;
  white-space: nowrap;
}
</style>
