<template>
  <div class="col-12 col-md-10 mt-10">
    <h2>Bình luận bài viết</h2>
    <div class="card mb-4">
      <img src="../assets/images/8loaircq.jpg" class="card-img-top" alt="Bài viết" /> 
      <div class="card-body">
        <h3 class="card-title">8 loại rau củ quả giàu canxi</h3> 
        <p class="card-text">Canxi là khoáng chất cần thiết đối với cơ thể người... </p>
      </div>
    </div>

    <form @submit.prevent="submitComment">
      <div class="mt-3 mb-2">
        <textarea class="form-control" rows="3" v-model="commentText" placeholder="Nhập bình luận của bạn"></textarea> 
      </div>
      <button type="submit" class="btn btn-success">Gửi bình luận</button> 
    </form>

    <div v-if="comments.length" class="mt-4"> 
      <h5>Danh sách các bình luận:</h5> 
      <ul class="list-unstyled">
        <li v-for="(comment, index) in comments" :key="index" class="border-bottom py-2">
          <strong>{{ comment.name }}</strong>: {{ comment.text }} 
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps(['username']);
const commentText = ref(''); 
const comments = ref([]); 

function submitComment() {
  if (commentText.value) {
    comments.value.push({
      name: props.username, // Lấy tên từ props mà cha truyền xuống [cite: 287]
      text: commentText.value
    });
    commentText.value = ''; 
  }
}
</script>