<template>
  <div class="table-container">
    <base-table :columns="columns" :data="tableData">
      <template #column-optionA="{ row }">
        <BaseMultiSelect
          v-model="row.selectedA"
          :options="optionsA"
          placeholder="請選擇選項 A"
        />
      </template>
      <template #column-optionB="{ row }">
        <BaseSelect
          v-model="row.selectedB"
          :options="optionsB"
          placeholder="請選擇選項 B"
        />
      </template>
    </base-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseSelect from '../atoms/BaseSelect.vue'
import BaseMultiSelect from '../atoms/BaseMultiSelect.vue'
import BaseTable from '../atoms/BaseTable.vue'

const columns = [
  {
    title: '選項 A',
    key: 'optionA',
    slot: 'column-optionA'
  },
  {
    title: '選項 B',
    key: 'optionB',
    slot: 'column-optionB'
  }
]

const tableData = ref([
  {
    id: 1,
    selectedA: [],
    selectedB: ''
  }
])

const optionsA = [
  { value: 'a1', label: '選項 A1' },
  { value: 'a2', label: '選項 A2' },
  { value: 'a3', label: '選項 A3' }
]

const optionsB = [
  { value: 'b1', label: '選項 B1' },
  { value: 'b2', label: '選項 B2' },
  { value: 'b3', label: '選項 B3' }
]
</script>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
}
</style>