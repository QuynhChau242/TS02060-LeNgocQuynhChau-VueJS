<template>
  <div class="container mt-5">
    <h3>Nhập điểm của bạn:</h3> 
    <input 
      type="number" 
      v-model.number="score" 
      step="0.1" 
      class="form-control mb-3" 
      placeholder="Nhập điểm từ 0 - 10"
    />

    <div v-if="score !== null">
      <p v-if="score < 5"><b>Yếu</b></p> 
      <p v-else-if="score < 6.5"><b>Trung bình</b></p> 
      <p v-else-if="score < 8"><b>Khá</b></p> 
      <p v-else-if="score < 9"><b>Giỏi</b></p> 
      <p v-else><b>Xuất sắc</b></p> 
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const score = ref(0);
</script>
