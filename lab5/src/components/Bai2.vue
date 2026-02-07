<template>
  <div class="url-5">

    <input v-model="userInput"  class="form-control" placeholder="Nhập dữ liệu vào đây" /> <p>Giá trị bạn nhập: {{ userInput }}</p> </div>
</template>

<script setup>
import { ref } from 'vue';
const userInput = ref('FPL'); 
</script>

