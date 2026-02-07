<template>
  <div class="post-container">
    <div class="col-sm-8">
      <h2>Thông tin cá nhân</h2>
      <form>
        <div class="mb-3">
          <label>Họ và Tên: </label>
          <input v-model="userInfo.name" type="text" class="form-control" placeholder="Le Ngoc Quynh Chau" />
        </div>
        <div class="mb-3">
          <label>Tuổi: </label>
          <input v-model="userInfo.age" type="number" class="form-control" placeholder="18"/>
        </div>
        <div class="mb-3">
          <label>Email:</label>
          <input v-model="userInfo.email" type="email" class="form-control" placeholder="chaulnqts02060@gmail.com" />
        </div>
      </form>

      <div class="post">
      <div class="info-display mt-4 p-3 bg-dark text-white rounded">
        <h2>Thông tin đã nhập:</h2>
        <p><strong>Họ và Tên:</strong> {{ userInfo.name }}</p>
        <p><strong>Tuổi:</strong> {{ userInfo.age }}</p>
        <p><strong>Email:</strong> {{ userInfo.email }}</p>
      </div>
    </div>

      <hr />
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
const userInfo = reactive({
  name: '',
  age: null,
  email: ''
}); 
</script>

