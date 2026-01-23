<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import CommentSection from '../components/CommentSection.vue';

const API_URL = 'http://localhost:3000';
const posts = ref([]);
const comments = ref([]);
const title = ref('');
const content = ref('');
const imageUrl = ref('');


const fetchPosts = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/posts`);
    posts.value = data;
  } catch (error) {
    console.error('Error:', error);
  }
};


const fetchComments = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/comments`);
    comments.value = data;
  } catch (error) {
    console.error('Error:', error);
  }
};

const addPost = async () => {
  if (!title.value || !content.value) return;
  const newPost = {
    title: title.value,
    content: content.value,
    image: imageUrl.value || `https://picsum.photos/400/200?random=${Date.now()}`,
    date: new Date().toLocaleDateString()
  };
  try {
    await axios.post(`${API_URL}/posts`, newPost);
    title.value = ''; content.value = ''; imageUrl.value = '';
    await fetchPosts();
  } catch (error) {
    console.error('Error:', error);
  }
};

const deletePost = async (id) => {
  if (!confirm("Xác nhận xóa?")) return;
  await axios.delete(`${API_URL}/posts/${id}`);
  await fetchPosts();
};

const editPost = (post) => {
  title.value = post.title;
  content.value = post.content;
  imageUrl.value = post.image;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  fetchPosts();
  fetchComments();
});
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4">Trang chủ Blog</h2>
    
    <div class="card p-4 mb-5 shadow-sm border-success">
      <h4 class="mb-3">Đăng bài mới</h4>
      <input v-model="title" class="form-control mb-2" placeholder="Tiêu đề bài viết">
      <textarea v-model="content" class="form-control mb-2" placeholder="Nội dung bài viết" rows="3"></textarea>
      <input v-model="imageUrl" class="form-control mb-3" placeholder="Link ảnh minh họa (Vd: /images/logo.png)">
      <button @click="addPost" class="btn btn-success px-4">Đăng bài</button>
    </div>

    <div class="row">
      <div v-for="post in posts" :key="post.id" class="col-md-6 mb-4">
        <div class="card h-100 shadow-sm border-0">
          <img :src="post.image" class="card-img-top" style="height: 220px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title text-primary fw-bold">{{ post.title }}</h5>
            <p class="card-text text-muted">{{ post.content }}</p>
            
            <div class="d-flex justify-content-between align-items-center mb-3">
              <small class="text-secondary">{{ post.date }}</small>
              <div>
                <button @click="editPost(post)" class="btn btn-sm btn-outline-warning me-2">Sửa</button>
                <button v-if="!isLoggedIn" @click="deletePost(post.id)" class="btn btn-sm btn-outline-danger">Xóa</button>
              </div>
            </div>

            <CommentSection 
              :postId="post.id" 
              :comments="comments.filter(c => c.postId === post.id)" 
              @commentAdded="fetchComments" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>