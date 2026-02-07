<template>
  <div id="app" class="container py-5">
    <h1 class="text-center mb-4 text-primary">Lab 7 - Tổng hợp bài tập</h1>
    
    <div class="d-flex justify-content-center gap-3 mb-5">
      <button @click="currentTab = 'b1'" class="btn btn-info text-white">Bài 1</button>
      <button @click="currentTab = 'b2'" class="btn btn-info text-white">Bài 2</button>
      <button @click="currentTab = 'b3'" class="btn btn-info text-white">Bài 3</button>
      <button @click="currentTab = 'b4'" class="btn btn-primary">Bài 4</button>
    </div>

    <div class="main-content shadow p-4 rounded bg-light">
      <Bai1 v-if="currentTab === 'b1'" />
      <Bai2 v-else-if="currentTab === 'b2'" />
      <Bai3 v-else-if="currentTab === 'b3'" />
      <Bai4 v-else-if="currentTab === 'b4'" />
      <div v-else class="text-center">Vui lòng chọn bài tập phía trên</div>
    </div>
  </div>                                            
</template>

<script setup>
import { ref } from 'vue';
import Bai1 from './components/Bai1.vue';
import Bai2 from './components/Bai2.vue';
import Bai3 from './components/Bai3.vue';
import Bai4 from './components/Bai4.vue';

const currentTab = ref('b1'); 
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
