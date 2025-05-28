<template>
  <form @submit.prevent="handleSubmit" class="email-form">
    <BaseInput
      v-model="email"
      placeholder="請輸入電子信箱"
      :error-message="showError ? emailError : ''"
    />
    <BaseButton type="primary" @click="handleSubmit">提交</BaseButton>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseInput from '@/components/atoms/BaseInput.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import { validators, generateErrorMessage } from '@/utils/validators'

const email = ref('')
const showError = ref(false)

const emailError = computed(() => {
  if (!validators.required(email.value)) return generateErrorMessage('required')
  if (!validators.email(email.value)) return generateErrorMessage('email')
  return ''
})

const handleSubmit = () => {
  showError.value = true
  if (!emailError.value) {
    // 如果沒有錯誤，發出事件通知父組件
    emit('submit', email.value)
    // 重置表單
    email.value = ''
    showError.value = false
  }
}

const emit = defineEmits(['submit'])
</script>

<style scoped>
.email-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
}
</style>
