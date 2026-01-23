<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const user = ref({
  id: null,
  username: '',
  email: '',
  password: '',
  avatar: '' 
});

onMounted(() => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    const data = JSON.parse(savedUser);
    
    if (data.avatar && (data.avatar.includes('http') || data.avatar.includes('via.placeholder'))) {
      data.avatar = 'avatar.png'; 
    }
    user.value = data;
  }
});

const updateProfile = async () => {
  try {
  
    let fileName = user.value.avatar.trim();
    if (fileName.includes('/')) {
      const parts = fileName.split('/');
      fileName = parts[parts.length - 1];
    }
   
    user.value.avatar = fileName || 'avatar.png';

  
    await axios.put(`http://localhost:3000/users/${user.value.id}`, user.value);
    

    localStorage.setItem('user', JSON.stringify(user.value));
    
    alert('Cập nhật thành công!');
   
    window.location.reload(); 
  } catch (error) {
    console.error(error);
    alert('Lỗi khi lưu dữ liệu!');
  }
};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 card p-4 shadow-sm border-0">
        <h3 class="text-center mb-4 fw-bold">Hồ Sơ Cá Nhân</h3>
        
        <div class="text-center mb-4">
          <div class="position-relative d-inline-block">
            <img :src="'/images/' + (user.avatar || 'avatar.png')" 
                 class="rounded-circle border border-4 border-white shadow" 
                 width="130" height="130" 
                 style="object-fit: cover;"
                 alt="Avatar">
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold small">Họ và tên</label>
          <input v-model="user.username" type="text" class="form-control form-control-lg">
        </div>

        <div class="mb-3">
          <label class="form-label fw-bold small">Email</label>
          <input v-model="user.email" type="email" class="form-control form-control-lg">
        </div>

        <div class="mb-4">
          <label class="form-label fw-bold small">Ảnh đại diện</label>
          <div class="input-group">
            <span class="input-group-text bg-light">/images/</span>
            <input v-model="user.avatar" type="text" class="form-control" placeholder="Ví dụ: avatar.png">
          </div>
          <p class="text-danger small mt-1" v-if="user.avatar.includes('http')">
             Đừng dán link mạng vào đây, hãy chỉ nhập tên file ảnh!
          </p>
        </div>

        <button @click="updateProfile" class="btn btn-primary w-100 py-2 fw-bold shadow-sm">
          LƯU THÔNG TIN
        </button>
      </div>
    </div>
  </div>
</template>