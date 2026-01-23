<script setup>
import { ref } from 'vue';
import axios from 'axios';

const props = defineProps(['postId', 'comments']);
const emit = defineEmits(['commentAdded']);
const newComment = ref('');

const addComment = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return alert("Vui lòng đăng nhập!");
  if (!newComment.value) return;

  try {
    await axios.post('http://localhost:3000/comments', {
      postId: props.postId,
      username: user.username,
      content: newComment.value,
      date: new Date().toLocaleString()
    });
    newComment.value = '';
    emit('commentAdded'); 
  } catch (error) {
    console.error('Lỗi bình luận:', error);
  }
};
</script>

<template>
  <div class="comment-section">
    <hr>
    <h6 class="fw-bold mb-3">Bình luận ({{ comments.length }})</h6>
    <div class="mb-3 overflow-auto" style="max-height: 200px;">
      <div v-for="comment in comments" :key="comment.id" class="bg-light p-2 rounded mb-2">
        <div class="d-flex justify-content-between small">
          <span class="fw-bold">{{ comment.username }}</span> 
          <span class="text-muted">{{ comment.date }}</span>
        </div>
        <p class="mb-0 small text-dark">{{ comment.content }}</p>
      </div>
    </div>
    <div class="input-group">
      <input v-model="newComment" class="form-control" placeholder="Viết bình luận...">
      <button @click="addComment" class="btn btn-primary">Gửi</button>
    </div>
  </div>
</template>