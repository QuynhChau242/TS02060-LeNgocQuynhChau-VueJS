<template>
  <div>
    <LoginComponent v-if="!isLoggedIn" @loggedIn="handleLoginSuccess" />
    
    <CommentComponent v-else :username="loggedInUser" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LoginComponent from './LoginComponent.vue'; 
import CommentComponent from './CommentComponent.vue';

const isLoggedIn = ref(false); 
const loggedInUser = ref(''); 

// Hàm xử lý khi con (LoginComponent) báo đăng nhập thành công
function handleLoginSuccess(username) { 
  loggedInUser.value = username;
  isLoggedIn.value = true;
}
</script>