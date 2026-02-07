<template>
  <div class="m-1 col-10-center col-sm-12 border p-4">
    <h2>Đăng Nhập</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="username">Tên đăng nhập:</label>
        <input type="text" class="form-control" id="username" v-model="username" placeholder="Nhập tên đăng nhập" />
      </div>
      <div class="mb-3">
        <label for="password">Mật khẩu:</label>
        <input type="password" class="form-control" id="password" v-model="password" placeholder="Nhập mật khẩu" />
      </div>
      <button type="submit" class="btn btn-primary">Đăng nhập</button>
    </form>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const username = ref(''); 
const password = ref('');
const emit = defineEmits(['loggedIn']); 

function handleLogin() {
  if (username.value && password.value) { 
    // Phát sự kiện 'loggedIn' gửi kèm tên người dùng lên component cha [cite: 235, 236]
    emit('loggedIn', username.value); 
  }
}
</script>