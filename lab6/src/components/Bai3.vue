<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Kiến thức sức khỏe cộng đồng</h1>
    <div class="row">
      <div class="col-sm-4 mb-4" v-for="(item, index) in items" :key="index">
        <div class="card h-100">
          <img :src="item.image" class="card-img-top" alt="Hình ảnh bài viết" />
          <div class="card-body d-flex flex-column">
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-text">{{ item.content }}</p>
            <button class="btn btn-info mt-auto text-white">Xem chi tiết</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Import hình ảnh từ thư mục assets (Đảm bảo đường dẫn file ảnh của bạn đúng)
import img1 from '../assets/images/8loaircq.jpg';
import img2 from '../assets/images/loaigiavi.jpg';
import img3 from '../assets/images/9loaidau.jpg';

// Sử dụng ref để dữ liệu có tính phản hồi (Reactive)
const items = ref([
  { 
    title: '8 loại rau củ quả giàu canxi', 
    content: 'Canxi là khoáng chất cần thiết cho xương và răng. Các loại rau như bông cải xanh, rau chân vịt rất giàu canxi...', 
    image: img1 
  },
  { 
    title: 'Các loại gia vị tốt cho sức khỏe', 
    content: 'Một số loại gia vị như gừng, nghệ, tỏi không chỉ làm món ăn ngon hơn mà còn giúp tăng cường sức đề kháng...', 
    image: img2 
  },
  { 
    title: '9 loại đậu bổ dưỡng nên dùng nhiều', 
    content: 'Đậu lăng, đậu nành, đậu đen là nguồn cung cấp protein thực vật dồi dào và nhiều chất xơ rất tốt cho tim mạch...', 
    image: img3 
  },
]);
</script>
