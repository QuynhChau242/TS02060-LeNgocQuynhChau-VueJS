<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users');
    const users = response.data;
    const user = users.find(u => u.email === email.value && u.password === password.value);
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      alert('Đăng nhập thành công!');
      router.push('/').then(() => {
        window.location.reload(); 
      });
    } else {
      alert('Email hoặc mật khẩu không đúng!');
    }
  } catch (error) {
    alert('Lỗi kết nối server! Hãy chắc chắn bạn đã chạy json-server.');
  }
};

</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4 card p-4 shadow">
        <h2 class="text-center mb-4">Đăng nhập</h2>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" placeholder="Nhập email">
        </div>
        <div class="mb-3">
          <label class="form-label">Mật khẩu</label>
          <input v-model="password" type="password" class="form-control" placeholder="Nhập mật khẩu">
        </div>
        <button @click="login" class="btn btn-success w-100">Đăng nhập</button>
        <p class="mt-3 text-center">
          Chưa có tài khoản? <router-link to="/register">Đăng ký ngay</router-link>
        </p>
      </div>
    </div>
  </div>
</template>