<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
const posts = ref([]);
const fetchPosts = async () => {
try {
const response = await axios.get('http://localhost:3000/posts');
posts.value = response.data;
} catch (error) {
console.error('Lỗi khi lấy dữ liệu:', error);
}
};
onMounted(fetchPosts);
</script>
<template>
<div>
<h2>Danh sách bài viết</h2>
<ul>
<li v-for="post in posts" :key="post.id">
{{ post.title }} - {{ post.content }}
</li>
</ul>
</div>
</template>