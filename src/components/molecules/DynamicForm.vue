<template>
  <form @submit.prevent="handleSubmit" class="dynamic-form">
    <div v-for="(field, index) in formFields" :key="field.key" class="form-item">
      <BaseInput
        v-model="formData[field.name]"
        :placeholder="field.placeholder"
        :error-message="showErrors ? errors[field.name] : ''"
      />
      <button
        v-if="formFields.length > 1"
        type="button"
        class="remove-button"
        @click="removeField(index)"
      >
        刪除
      </button>
    </div>

    <div class="form-actions">
      <BaseButton type="dashed" @click="addField">新增欄位</BaseButton>
      <BaseButton type="primary" @click="handleSubmit">提交</BaseButton>
      <BaseButton @click="resetForm">重置</BaseButton>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import BaseInput from '@/components/atoms/BaseInput.vue'
import BaseButton from '@/components/atoms/BaseButton.vue'
import { createFormValidator } from '@/utils/formValidator'

const showErrors = ref(false)

const formFields = reactive([
  { name: 'field1', key: Date.now(), placeholder: '請輸入欄位內容' }
])

const formData = reactive({})

const validator = createFormValidator({
  field1: [{ required: true, message: '此欄位為必填' }]
})

const errors = computed(() => {
  const { errors } = validator.validate(formData)
  return errors
})

const isValid = computed(() => {
  return Object.keys(errors.value).length === 0
})

const addField = () => {
  const newField = {
    name: `field${formFields.length + 1}`,
    key: Date.now(),
    placeholder: '請輸入欄位內容'
  }
  formFields.push(newField)

  // 動態添加驗證規則
  validator.addField(newField.name, [
    { required: true, message: '此欄位為必填' }
  ])
}

const removeField = (index) => {
  const field = formFields[index]
  formFields.splice(index, 1)
  delete formData[field.name]
  validator.removeField(field.name)
}

const handleSubmit = () => {
  showErrors.value = true
  if (isValid.value) {
    emit('submit', formData)
  }
}

const resetForm = () => {
  Object.keys(formData).forEach(key => {
    formData[key] = ''
  })
  showErrors.value = false
}

const emit = defineEmits(['submit'])
</script>

<style scoped>
.dynamic-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-item {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.form-actions {
  display: flex;
  gap: 8px;
  margin-top: 24px;
}

.remove-button {
  padding: 4px 8px;
  color: #ff4d4f;
  border: 1px solid #ff4d4f;
  border-radius: 4px;
  cursor: pointer;
  background: transparent;
}

.remove-button:hover {
  background: #fff1f0;
}
</style>
