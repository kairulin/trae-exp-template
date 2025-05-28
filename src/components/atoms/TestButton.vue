<template>
  <button class="base-button" @click="$emit('click')">
    <slot>按鈕</slot>
  </button>
</template>

<script setup>
defineEmits(['click']);
</script>

<style scoped>
.base-button {
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.base-button:hover {
  background-color: #45a049;
}
</style>
