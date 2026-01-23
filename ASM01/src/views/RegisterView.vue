<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const register = async () => {
  if (!name.value || !email.value || !password.value) {
    alert('Vui lòng nhập đầy đủ thông tin!');
    return;
  }
  try {
  
    await axios.post('http://localhost:3000/users', {
      username: name.value,
      email: email.value,
      password: password.value,
      avatar: "https://via.placeholder.com/150" 
    });
    alert('Đăng ký thành công!');
    router.push('/login'); 
  } catch (error) {
    console.error('Lỗi khi đăng ký:', error);
  }
};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-4 card p-4 shadow">
        <h2 class="text-center mb-4">Đăng ký tài khoản</h2>
        <div class="mb-3">
          <label class="form-label">Họ và tên</label>
          <input v-model="name" type="text" class="form-control" placeholder="Nhập tên">
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" placeholder="Email">
        </div>
        <div class="mb-3">
          <label class="form-label">Mật khẩu</label>
          <input v-model="password" type="password" class="form-control" placeholder="Mật khẩu">
        </div>
        <button @click="register" class="btn btn-primary w-100">Đăng ký</button>
      </div>
    </div>
  </div>
</template>