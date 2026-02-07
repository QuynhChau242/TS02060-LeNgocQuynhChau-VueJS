<template>
  <div class="container mt-5">
    <div class="card shadow border-0 bg-white">
      <div class="card-header bg-dark text-white py-3">
        <h4 class="mb-0 text-center">QUẢN LÝ HỌC SINH</h4>
      </div>
      
      <div class="card-body p-0">
        <div class="row g-0">
          
          <div class="col-md-4 border-end p-4">
            <h5 class="text-primary mb-4 fw-bold">
              {{ isEditing ? 'Cập nhật thông tin' : 'Thêm học sinh mới' }}
            </h5>
            
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label class="form-label text-dark fw-bold">Họ và tên</label>
                <input type="text" v-model="student.name" class="form-control bg-white text-dark" placeholder="Nhập họ tên..." required>
              </div>
              
              <div class="mb-3">
                <label class="form-label text-dark fw-bold">Điểm số</label>
                <input type="number" v-model.number="student.score" min="0" max="10" step="0.1" class="form-control bg-white text-dark" placeholder="0 - 10" required>
              </div>
              
              <div class="mb-3">
                <label class="form-label text-dark fw-bold">Ngày sinh</label>
                <input type="date" v-model="student.dob" class="form-control bg-white text-dark" required>
              </div>
              
              <div class="d-grid gap-2 mt-4">
                <button type="submit" :class="isEditing ? 'btn btn-warning' : 'btn btn-success'" class="fw-bold">
                  {{ isEditing ? 'CẬP NHẬT' : 'THÊM MỚI' }}
                </button>
                <button v-if="isEditing" @click="resetForm" type="button" class="btn btn-outline-secondary">
                  Hủy bỏ
                </button>
              </div>
            </form>
          </div>

          <div class="col-md-8 p-4 bg-light">
            <h5 class="text-dark mb-4 fw-bold">Danh sách học sinh</h5>
            <div class="table-responsive">
              <table class="table table-white table-hover align-middle border">
                <thead class="table-secondary">
                  <tr>
                    <th>Họ tên</th>
                    <th>Điểm</th>
                    <th>Ngày sinh</th>
                    <th class="text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(st, index) in students" :key="index" class="text-dark">
                    <td class="fw-bold">{{ st.name }}</td>
                    <td><span class="badge bg-primary">{{ st.score }}</span></td>
                    <td>{{ st.dob }}</td>
                    <td class="text-center">
                      <button @click="editStudent(index)" class="btn btn-sm btn-warning me-2">
                        Sửa
                      </button>
                      <button @click="deleteStudent(index)" class="btn btn-sm btn-danger">
                        Xóa
                      </button>
                    </td>
                  </tr>
                  <tr v-if="students.length === 0">
                    <td colspan="4" class="text-center text-muted py-4">Chưa có dữ liệu học sinh</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div> </div> </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 1. Dữ liệu mẫu ban đầu theo Lab 6
const students = ref([
  { name: 'Nguyễn Chí Hùng', score: 8.0, dob: '2006-01-01' },
  { name: 'Phạm Thị Lan', score: 9.0, dob: '2006-05-15' }
]);

// 2. Biến quản lý trạng thái form và dữ liệu đang nhập
const student = ref({ name: '', score: null, dob: '' });
const isEditing = ref(false);
const editingIndex = ref(null);

// 3. Hàm gửi form (Xử lý cả Thêm và Sửa)
const submitForm = () => {
  if (isEditing.value) {
    // Cập nhật: Dùng Spread operator để copy giá trị mới vào vị trí cũ
    students.value[editingIndex.value] = { ...student.value };
  } else {
    // Thêm mới: Push vào mảng
    students.value.push({ ...student.value });
  }
  resetForm(); // Xóa sạch form sau khi xong
};

// 4. Hàm chọn học sinh để sửa (Đổ dữ liệu từ bảng lên form)
const editStudent = (index) => {
  student.value = { ...students.value[index] };
  isEditing.value = true;
  editingIndex.value = index;
};

// 5. Hàm xóa học sinh
const deleteStudent = (index) => {
  if (confirm(`Bạn có chắc muốn xóa học sinh ${students.value[index].name}?`)) {
    students.value.splice(index, 1);
    if (isEditing.value && editingIndex.value === index) resetForm();
  }
};

// 6. Hàm Reset form về trạng thái ban đầu
const resetForm = () => {
  student.value = { name: '', score: null, dob: '' };
  isEditing.value = false;
  editingIndex.value = null;
};
</script>

<style scoped>
/* Đảm bảo chữ đen nền trắng đúng yêu cầu */
.card { border-radius: 10px; overflow: hidden; }
.form-control { border: 1px solid #ced4da !important; color: #000 !important; }
.form-control:focus { background-color: #fff; color: #000; }
.table { background-color: #fff; }
.border-end { border-right: 1px solid #dee2e6 !important; }
</style>