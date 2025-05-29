<template>
  <div class="users-view">
    <h1>用戶列表</h1>

    <!-- 添加用戶表單 -->
    <div class="add-user-form">
      <input v-model="newUserName" type="text" placeholder="輸入用戶名稱" class="name-input" />
      <button @click="addUser" class="add-button">添加用戶</button>
    </div>

    <!-- 用戶列表 -->
    <div class="users-list">
      <div v-if="loading">加載中...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div v-for="user in users" :key="user.id" class="user-item">
          {{ user.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getApiUsers, postApiUsers } from "@/api/apiUsers.js";
const users = ref([]);
const loading = ref(true);
const error = ref(null);
const newUserName = ref("");

// 獲取用戶列表
const fetchUsers = async () => {
  try {
    loading.value = true;
    const response = await getApiUsers();
    console.log("response", response);
    users.value = response.data
  } catch (err) {
    error.value = "獲取用戶列表失敗";
    console.error("Error fetching users:", err);
  } finally {
    loading.value = false;
  }
};

// 添加新用戶
const addUser = async () => {
  if (!newUserName.value.trim()) return;

  try {
    const response = await postApiUsers({
      name: newUserName.value,
    });
    users.value.push(response.data);
    newUserName.value = "";
  } catch (err) {
    error.value = "添加用戶失敗";
    console.error("Error adding user:", err);
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.users-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.add-user-form {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.name-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #45a049;
}

.users-list {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
}

.user-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.user-item:last-child {
  border-bottom: none;
}
</style>
