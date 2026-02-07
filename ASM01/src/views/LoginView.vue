<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4 card p-4 shadow">
        <h2 class="text-center mb-4">Đăng nhập</h2>
        <div class="mb-3">
          <label class="form-label">Tên đăng nhập</label>
          <input v-model="username" type="text" class="form-control" placeholder="Nhập tên đăng nhập">
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

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const username = ref(''); // Đổi từ email sang username
const password = ref('');
const router = useRouter();

// isLoggedIn phải được định nghĩa như thế này để tự động cập nhật
const isLoggedIn = computed(() => {
  const user = localStorage.getItem('user');
  return !!user; // Trả về true nếu có dữ liệu user trong localStorage
});

const login = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users');
    const users = response.data;
    
    // Đổi logic tìm kiếm: Kiểm tra username khớp với dữ liệu trong db.json
    const user = users.find(u => u.username === username.value && u.password === password.value);
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      alert('Đăng nhập thành công!');
      router.push('/').then(() => {
        window.location.reload(); 
      });
    } else {
      alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  } catch (error) {
    alert('Lỗi kết nối server! Hãy chắc chắn bạn đã chạy json-server.');
  }
};
</script>