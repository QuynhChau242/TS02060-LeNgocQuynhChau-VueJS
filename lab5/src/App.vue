<template>
  <div id="app" class="container py-5">
    <h1 class="text-center mb-4 text-primary">Lab 5 - Tổng hợp bài tập</h1>
    <h2 class="text-center mb-4 text-primary">07. Quỳnh Châu</h2>
    
    <div class="d-flex justify-content-center gap-3 mb-5">
      <button @click="currentTab = 'b1'" class="btn btn-info text-white">Bài 1</button>
      <button @click="currentTab = 'b2'" class="btn btn-info text-white">Bài 2</button>
      <button @click="currentTab = 'b3'" class="btn btn-info text-white">Bài 3</button>
      <button @click="currentTab = 'b4'" class="btn btn-primary">Bài 4 (Blog)</button>
      <button @click="currentTab = 'b5'" class="btn btn-primary">Test - Products</button>
    </div>

    <div class="main-content shadow p-4 rounded bg-light">
      <Bai1 v-if="currentTab === 'b1'" />
      <Bai2 v-else-if="currentTab === 'b2'" />
      <Bai3 v-else-if="currentTab === 'b3'" />
      <Post v-else-if="currentTab === 'b4'" />
      <products v-else-if="currentTab === 'b5'" />
      <div v-else class="text-center">Vui lòng chọn bài tập phía trên</div>
    </div>
  </div>                                            
</template>

<script setup>
import { ref } from 'vue';
import Bai1 from './components/Bai1.vue';
import Bai2 from './components/Bai2.vue';
import Bai3 from './components/Bai3.vue';
import Post from './components/Post.vue';
import products from './components/products.vue';
const currentTab = ref('b1'); 
</script>