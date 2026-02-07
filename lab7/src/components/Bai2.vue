<template>
  <div v-if="!isLoggedIn" class="col-10-center col-sm-12 ">
    <h3>Form Đăng nhập</h3>
    <form @submit.prevent="login">
      <div class="mb-3 mt-3">
        <label>Email:</label>
        <input 
          type="email" 
          class="form-control" 
          v-model="email"
          placeholder="Nhập email"
        >
        <p v-if="emailError" style="color: red;">{{ emailError }}</p>
      </div>

      <div class="mb-3">
        <label>Mật khẩu:</label>
        <input 
          type="password" 
          class="form-control" 
          v-model="password"
          placeholder="Nhập mật khẩu"
        >
        <p v-if="passwordError" style="color: red;">{{ passwordError }}</p>
      </div>

      <button type="submit" class="btn btn-primary">Đăng nhập</button>
    </form>
  </div>

  <div v-else class="p-5 col-sm-5">
    <h3>Chào mừng, {{ email }}!</h3>
    <button @click="logout" class="btn btn-primary">Đăng xuất</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Khai báo các biến trạng thái và dữ liệu
const isLoggedIn = ref(false); // Trạng thái đăng nhập [cite: 115]
const email = ref(''); // Lưu trữ email người dùng nhập [cite: 116]
const password = ref(''); // Lưu trữ mật khẩu [cite: 117]
const emailError = ref(''); // Lưu trữ thông điệp lỗi email [cite: 118]
const passwordError = ref(''); // Lưu trữ thông điệp lỗi mật khẩu [cite: 123]

// Biểu thức chính quy để kiểm tra định dạng email [cite: 125]
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Hàm xử lý logic đăng nhập
const login = () => {
  // Reset các thông điệp lỗi trước khi kiểm tra mới [cite: 127, 128, 129]
  emailError.value = '';
  passwordError.value = '';

  // Kiểm tra tính hợp lệ của Email [cite: 130]
  if (!email.value) {
    emailError.value = 'Email là bắt buộc.';
  } else if (!emailRegex.test(email.value)) {
    emailError.value = 'Vui lòng nhập email hợp lệ.';
  }

  // Kiểm tra tính hợp lệ của Mật khẩu [cite: 136]
  if (!password.value) {
    passwordError.value = 'Mật khẩu là bắt buộc.'; 
  }

  // Nếu không còn lỗi, chuyển trạng thái sang đã đăng nhập [cite: 141, 142]
  if (!emailError.value && !passwordError.value) {
    isLoggedIn.value = true;
  }
};

// Hàm xử lý đăng xuất [cite: 145]
const logout = () => {
  isLoggedIn.value = false; // Quay lại giao diện đăng nhập [cite: 147]
  email.value = ''; // Reset thông tin form [cite: 148]
  password.value = ''; 
  emailError.value = ''; 
  passwordError.value = ''; 
};
</script>