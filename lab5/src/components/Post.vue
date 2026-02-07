<template>
  <div class="post-container">
    <div class="create-post">
      <h2>Tạo bài viết mới</h2> 
      <input v-model="newPost.title" class="form-control" placeholder="Tiêu đề bài viết" /> 
      <input v-model="newPost.author" class="form-control" placeholder="Tên tác giả" /> 
      <textarea v-model="newPost.content" class="form-control" placeholder="Nội dung bài viết"></textarea>
      <button @click="addPost" class="btn-submit">Đăng bài</button> 
    </div>

    <hr />

    <div class="post-list">
      <h2>Danh sách bài viết</h2> 
      <div v-for="(post, index) in posts" :key="index" 
           :class="['post-card', { 'highlighted': post.title.length > 20 }]"
           :style="{ backgroundColor: 'white', color: 'black' }"> 

         <h4 class="text-danger">{{ post.author }}</h4>

        
        <h3 class="text-success">{{ post.title }}</h3>
        
        
        <p class="content">{{ post.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'; 

const posts = ref([
  {
    title: 'Bật Mí 8 Nguyên Tắc Phối Màu Quần Áo Sành Điệu',
    author: 'Nguyễn Văn Tèo',
    content: 'Bạn có thể phối áo màu xanh lá, quần màu kem và giày màu tím...' 
  }
]); 

const newPost = reactive({
  title: '',
  author: '',
  content: ''
});

function addPost() {
  if (newPost.title && newPost.author && newPost.content) {
    posts.value.push({ ...newPost });

    newPost.title = '';
    newPost.author = '';
    newPost.content = '';
  }
}
</script>
