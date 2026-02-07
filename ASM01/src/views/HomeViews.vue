<template>
  <div class="container mt-4">
    <h2 class="mb-4">Trang chủ Blog</h2>
    
    <div class="card p-4 mb-5 shadow-sm border-success">
  <h4 class="mb-3">Đăng bài mới</h4>
  <input v-model="title" class="form-control mb-2" placeholder="Tiêu đề bài viết">
  <textarea v-model="content" class="form-control mb-2" placeholder="Nội dung bài viết" rows="3"></textarea>
  <input v-model="imageUrl" class="form-control mb-3" placeholder="Link ảnh minh họa (Vd: /images/logo.png)">
  
  <div class="card p-4 mb-5 shadow-sm border-success">
  <h4 class="mb-3">{{ editingPostId ? 'Chỉnh sửa bài viết' : 'Đăng bài mới' }}</h4>
  <div class="d-flex gap-2">
    <button v-if="editingPostId" @click="updatePost" class="btn btn-warning px-4">Cập nhật</button>
    <button v-else @click="addPost" class="btn btn-success px-4">Đăng bài</button>
    
    <button v-if="editingPostId" @click="cancelEdit" class="btn btn-secondary px-4">Hủy</button>
  </div>
</div>
</div>

    <div class="row">
      <div v-for="post in posts" :key="post.id" class="col-md-6 mb-4">
        <div class="card h-100 shadow-sm border-0">
          <img :src="post.image" class="card-img-top" style="height: 220px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title text-primary fw-bold">{{ post.title }}</h5>
            <p class="card-text text-muted">{{ post.content }}</p>
            
            <div class="d-flex justify-content-between align-items-center mb-3">
  <small class="text-secondary">{{ post.date }} - Tác giả: {{ post.author }}</small>
  
  <div v-if="isAuthor(post.author)">
    <button @click="editPost(post)" class="btn btn-sm btn-outline-warning me-2">Sửa</button>
    <button @click="deletePost(post.id)" class="btn btn-sm btn-outline-danger">Xóa</button>
  </div>
  
  <div v-else>
    <small class="text-muted italic">Chỉ xem</small>
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

<script setup>
import { ref, onMounted, computed } from 'vue'; // Thêm computed
import axios from 'axios';
import CommentSection from '../components/CommentSection.vue';

const API_URL = 'http://localhost:3000';
const posts = ref([]);
const comments = ref([]);
const title = ref('');
const content = ref('');
const imageUrl = ref('');
const editingPostId = ref(null);

// Kiểm tra trạng thái đăng nhập dựa trên localStorage
const isLoggedIn = computed(() => !!localStorage.getItem('user'));

const isAuthor = (postAuthor) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.username === postAuthor;
};

const fetchPosts = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/posts`);
    posts.value = data;
  } catch (error) {
    alert("Lỗi kết nối server! Hãy chắc chắn bạn đã chạy json-server.");
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
  if (!isLoggedIn.value) {
    alert("Vui lòng đăng nhập để thực hiện chức năng này!");
    return;
  }

  if (!title.value || !content.value) {
    alert("Vui lòng nhập đầy đủ tiêu đề và nội dung.");
    return;
  }

  const user = JSON.parse(localStorage.getItem('user'));

  const newPost = {
    title: title.value,
    content: content.value,
    // Ưu tiên: Link nhập > Link random (hoặc bạn thay link random bằng đường dẫn ảnh local mặc định)
    image: imageUrl.value || `https://picsum.photos/400/200?random=${Date.now()}`, 
    date: new Date().toLocaleDateString(),
    author: user.username
  };

  try {
    await axios.post(`${API_URL}/posts`, newPost);
    // Reset form
    title.value = ''; content.value = ''; imageUrl.value = '';
    await fetchPosts();
    alert("Đăng bài thành công!");
  } catch (error) {
    console.error('Error:', error);
  }
};

const deletePost = async (id, postAuthor) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Kiểm tra: Phải đăng nhập VÀ phải là chủ bài viết
  if (!user || user.username !== postAuthor) {
    alert("Bạn không có quyền xóa bài viết của người khác!");
    return;
  }

  if (!confirm("Xác nhận xóa bài viết của bạn?")) return;

  try {
    await axios.delete(`${API_URL}/posts/${id}`);
    await fetchPosts();
    alert("Đã xóa bài viết thành công!");
  } catch (error) {
    console.error('Error:', error);
  }
};
const editPost = (post) => {
  if (!isLoggedIn.value) {
    alert("Vui lòng đăng nhập để chỉnh sửa!");
    return;
  }
  // Lưu lại ID để tí nữa biết là đang cập nhật bài này
  editingPostId.value = post.id; 
  
  title.value = post.title;
  content.value = post.content;
  imageUrl.value = post.image;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const updatePost = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  const updatedData = {
    title: title.value,
    content: content.value,
    image: imageUrl.value,
    date: new Date().toLocaleDateString(),
    author: user.username
  };

  try {
    // Dùng axios.put để ghi đè dữ liệu cũ
    await axios.put(`${API_URL}/posts/${editingPostId.value}`, updatedData);
    alert("Cập nhật thành công!");
    cancelEdit(); // Reset form
    await fetchPosts();
  } catch (error) {
    console.error('Error:', error);
  }
};

const cancelEdit = () => {
  editingPostId.value = null;
  title.value = '';
  content.value = '';
  imageUrl.value = '';
};

onMounted(() => {
  fetchPosts();
  fetchComments();
});
</script>

