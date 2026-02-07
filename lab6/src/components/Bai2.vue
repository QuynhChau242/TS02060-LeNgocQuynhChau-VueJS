<template>
  <div class="d-flex justify-content-center mt-5">
    <div class="card p-4 shadow-sm" style="width: 100%; max-width: 350px;">
      <h3 class="text-center mb-3">Dự báo Mùa</h3>
      
    <div class="form-group">
        <label class="form-label">Nhập tháng (1 - 12):</label>
        <input 
          type="number" 
          v-model.number="month" 
          @keyup.enter="handleEnter"
          @input="showResult = false"
          class="form-control mb-3 text-dark bg-white" 
          placeholder="Nhập tháng rồi nhấn Enter..."
        />
      </div>

      <div v-if="showResult && month !== null && month !== ''" class="text-center">
        <h5 v-if="month < 1 || month > 12" class="text-danger">
          Vui lòng nhập tháng từ 1 đến 12!
        </h5>
        
        <div v-else>
          <h5>Mùa: 
            <span class="fw-bold text-primary">
              <span v-if="month >= 1 && month <= 3">Xuân 🌸</span>
              <span v-else-if="month >= 4 && month <= 6">Hè ☀️</span>
              <span v-else-if="month >= 7 && month <= 9">Thu 🍂</span>
              <span v-else>Đông ❄️</span>
            </span>
          </h5>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Khởi tạo biến tháng bằng chuỗi rỗng để ô input sạch sẽ lúc đầu
const month = ref('');
const showResult = ref(false); // Biến kiểm soát hiển thị

const handleEnter = () => {
  if (month.value !== '') {
    showResult.value = true; // Cho phép hiện kết quả khi nhấn Enter
  }
};
</script>

<style scoped>
/* Định dạng khung card và input chữ đen nền trắng */
.card {
  border-radius: 12px;
  border: 1px solid #ddd;
  background-color: #ffffff;
}

.form-control {
  border: 1px solid #ced4da !important;
  color: #000000 !important;
  background-color: #ffffff !important;
}

.form-control:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>