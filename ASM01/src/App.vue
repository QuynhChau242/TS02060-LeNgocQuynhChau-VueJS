<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const isLoggedIn = ref(false);


onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('user');
});

const logout = () => {
  if (confirm("Bạn có muốn đăng xuất không?")) {

    localStorage.removeItem('user'); 
    

    alert("Đã đăng xuất!");
    

    isLoggedIn.value = false;

    
    router.push('/login');
    
   
    setTimeout(() => {
       window.location.reload();
    }, 100);
  }
};
</script>

<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow">
      <div class="container">
        <router-link class="navbar-brand fw-bold" to="/">POLY BLOG</router-link>
        
        <div class="navbar-nav">
  <router-link class="nav-link" to="/">Trang chủ</router-link>
  
  <template v-if="!isLoggedIn">
    <router-link class="nav-link" to="/login">Đăng nhập</router-link>
    <router-link class="nav-link" to="/register">Đăng ký</router-link>
  </template>

    <router-link class="nav-link" to="/profile">Cá nhân</router-link>
    <button @click="logout" class="btn btn-outline-danger btn-sm ms-2">Đăng xuất</button>

</div>
      </div>
    </nav>

    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>

.nav-link.router-link-exact-active {
  color: #ffc107 !important;
  font-weight: bold;
}

.navbar-brand {
  color: #42b983 !important;
}
</style>