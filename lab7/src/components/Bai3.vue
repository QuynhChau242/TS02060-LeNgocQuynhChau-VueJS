<template>
  <div class="container mt-5">
    <div class="row col-md-12 ">
      <div class="col-sm-6 p-4 border-end">
        <h3>Form Đăng Ký</h3>
        <form @submit.prevent>
          <div class="mb-4">
            <label class="form-label">Họ tên:</label>
            <input type="text" class="form-control" v-model="student.fullName" placeholder="Nhập họ tên">
          </div>

          <div class="mb-3">
            <label class="form-label">Email:</label>
            <input type="email" class="form-control" v-model="student.email" placeholder="Nhập email">
          </div>

          <div class="mb-3">
            <label class="form-label">Mật khẩu:</label>
            <input type="password" class="form-control" v-model="student.password" placeholder="Nhập mật khẩu">
          </div>

          <div class="mb-3">
            <label class="form-label">Ngày sinh:</label>
            <input type="date" class="form-control" v-model="student.birthday">
          </div>

          <div class="mb-3">
            <label class="form-label">Giới tính:</label>
            <div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="student.gender" value="Nam">
                <label class="form-check-label">Nam</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="student.gender" value="Nữ">
                <label class="form-check-label">Nữ</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="student.gender" value="Khác">
                <label class="form-check-label">Khác</label>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Ngôn ngữ:</label>
            <div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" v-model="student.languages" value="Tiếng Việt">
                <label class="form-check-label">Tiếng Việt</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" v-model="student.languages" value="Tiếng Anh">
                <label class="form-check-label">Tiếng Anh</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" v-model="student.languages" value="Tiếng Nhật">
                <label class="form-check-label">Tiếng Nhật</label>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Đăng ký</button>
        </form>
      </div>

      <div class="col-sm-6 p-4">
        <h3>Thông tin đã đăng ký:</h3>
        <p><strong>Họ tên:</strong> {{ student.fullName }}</p>
        <p><strong>Email:</strong> {{ student.email }}</p>
        <p><strong>Ngày sinh:</strong> {{ student.birthday }}</p>
        <p><strong>Giới tính:</strong> {{ student.gender }}</p>
        <p><strong>Ngôn ngữ:</strong> {{ student.languages.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Sử dụng một object để quản lý tất cả các trường trong form [cite: 155]
const student = ref({
  fullName: '',
  email: '',
  password: '',
  birthday: '',
  gender: '',
  languages: [] // Checkbox cần lưu vào một mảng
});
</script>