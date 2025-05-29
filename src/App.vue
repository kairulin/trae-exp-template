<template>
  <!-- <EmailForm @submit="handleEmailSubmit" />
  <BaseInput v-model="inputValue" placeholder="請輸入..." :error-message="inputValue.length < 3 ? '長度不能小於3個字符' : ''"/>
  <BaseCheckbox v-model="checked">同意條款</BaseCheckbox>
  <BaseButton type="primary" @click="handleClick">提交</BaseButton>
  <BaseMultiSelect
    v-model="multiSelected"
    :options="options"
    placeholder="請選擇..."
  />
  <TableWithSelects /> -->
  <!-- <RegisterForm /> -->
   <DynamicForm />

   <nav>
    <router-link to="/users">用戶管理</router-link>
  </nav>

  <router-view></router-view>
</template>

<script setup>
// import { ref } from 'vue'
// import EmailForm from '@/components/molecules/EmailForm.vue'
// import RegisterForm from '@/components/molecules/RegisterForm.vue'
import DynamicForm from '@/components/molecules/DynamicForm.vue'
// import BaseMultiSelect from '@/components/atoms/BaseMultiSelect.vue'
// import BaseInput from '@/components/atoms/BaseInput.vue'
// import BaseCheckbox from '@/components/atoms/BaseCheckbox.vue'
// import BaseButton from '@/components/atoms/BaseButton.vue'
// import TableWithSelects from '@/components/molecules/TableWithSelects.vue'  // 新增這行

// const inputValue = ref('')
// const checked = ref(false)
// const multiSelected = ref([])
// const options = [
//   { value: '1', label: '選項1' },
//   { value: '2', label: '選項2' },
//   { value: '3', label: '這是一個非常長的選項名稱用來測試顯示效果' }
// ]

// const handleClick = () => {
//   console.log('按鈕點擊')
// }

// const handleEmailSubmit = (email) => {
//   console.log('提交的郵箱:', email)
// }
</script>
