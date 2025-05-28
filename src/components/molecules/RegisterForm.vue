<template>
  <form @submit.prevent="handleSubmit" class="register-form">
    <BaseInput 
      v-model="formData.username" 
      placeholder="請輸入帳號" 
      :error-message="showErrors ? errors.username : ''"
    />
    <BaseInput 
      v-model="formData.password"
      type="password" 
      placeholder="請輸入密碼" 
      :error-message="showErrors ? errors.password : ''"
    />
    <BaseInput 
      v-model="formData.confirmPassword"
      type="password" 
      placeholder="請確認密碼" 
      :error-message="showErrors ? errors.confirmPassword : ''"
    />
    <BaseInput 
      v-model="formData.nickname" 
      placeholder="請輸入暱稱" 
      :error-message="showErrors ? errors.nickname : ''"
    />
    <BaseButton type="primary" @click="handleSubmit">註冊</BaseButton>
  </form>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import BaseInput from '@/components/atoms/BaseInput.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import { createValidator, validate } from '@/utils/validators'

const formData = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  nickname: ''
})

const showErrors = ref(false)

// 創建表單驗證器
const validator = createValidator({
  username: [
    validate.required('帳號'),
    validate.min(4)
  ],
  password: [
    validate.required('密碼'),
    validate.min(6)
  ],
  confirmPassword: [
    validate.required('確認密碼'),
    (value) => validate.equals(formData.password, '兩次輸入的密碼不一致')(value)
  ],
  nickname: [
    validate.required('暱稱')
  ]
})

// 計算錯誤信息
const errors = computed(() => {
  const { errors } = validator(formData)
  return errors
})

const isValid = computed(() => {
  return Object.keys(errors).length === 0  // 移除 .value
})

const handleSubmit = () => {
  showErrors.value = true
  
  if (isValid.value) {
    emit('submit', {
      username: formData.username,
      password: formData.password,
      nickname: formData.nickname
    })
    // 重置表單
    Object.assign(formData, {
      username: '',
      password: '',
      confirmPassword: '',
      nickname: ''
    })
    showErrors.value = false
  }
}

const emit = defineEmits(['submit'])
</script>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 400px;
  margin: 0 auto;
}
</style>