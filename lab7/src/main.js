import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 1. Chỉ giữ lại import Bootstrap chuẩn (Bạn đã cài rồi)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// 2. TUYỆT ĐỐI KHÔNG để dòng bootstrap-vue ở đây vì sẽ bị lỗi ngay lập tức

createApp(App).mount('#app')