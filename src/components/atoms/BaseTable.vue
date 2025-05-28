<template>
  <table class="base-table">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.key">
          {{ column.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data" :key="row.id">
        <td v-for="column in columns" :key="column.key">
          <slot
            v-if="column.slot"
            :name="column.slot"
            :row="row"
            :column="column"
          ></slot>
          <template v-else>
            {{ row[column.key] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.base-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

.base-table th,
.base-table td {
  padding: 12px;
  border: 1px solid var(--color-border);
  text-align: left;
}

.base-table th {
  background-color: var(--color-bg-secondary);
  font-weight: bold;
  color: var(--color-text-primary);
}

.base-table td {
  vertical-align: middle;
}
</style>