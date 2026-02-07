<template>
  <div class="container mt-2">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10">
        
        <div class="card shadow border-0 bg-white">
          <div class="card-header bg-dark text-white py-3">
            <h4 class="mb-0 text-center fw-bold text-uppercase">Quản lý công việc</h4>
          </div>
          
          <div class="card-body p-4">
            <h5 class="text-success mb-3 fw-bold">Thêm công việc</h5>
            
            <form @submit.prevent="addList" class="row g-3 mb-5">
              <div class="col-12">
                <label class="form-label fw-bold"></label>
                <input 
                  type="text" 
                  v-model="newToDo" 
                  class="form-control form-control-lg" 
                  placeholder="Nhập nội dung công việc tại đây..." 
                  required
                >
              </div>

              <div class="col-12 d-grid">
                <button type="submit" class="btn btn-primary fw-bold py-2">
                  THÊM VÀO DANH SÁCH
                </button>
              </div>
            </form>

            <hr>

            <div class="d-flex justify-content-between align-items-center mb-3 mt-4">
               <h5 class="text-dark fw-bold mb-0">Danh sách công việc ({{ jobs.length }})</h5>
            </div>

            <div class="table-responsive">
              <table class="table table-hover align-middle border">
               
                <tbody>
                  <tr v-for="(job, index) in jobs" :key="index" class="text-dark">
                    <td class="text-center fw-bold text-muted">{{ index + 1 }}</td>
                    <td class="fs-5">{{ job }}</td>
                    <td class="text-center">
                      <button @click="removeList(index)" class="btn btn-danger btn-sm px-4">
                        Xóa
                      </button>
                    </td>
                  </tr>
                  <tr v-if="jobs.length === 0">
                    <td colspan="3" class="text-center text-muted py-5">
                      Chưa có công việc nào.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const newToDo = ref('');
const jobs = ref(['Ăn sáng', 'Đi học', 'Chơi bóng rổ']);

const addList = () => {
  if (newToDo.value.trim()) { 
    jobs.value.push(newToDo.value.trim());
    newToDo.value = ''; 
  }
};

const removeList = (index) => {
  if (confirm(`Xóa công việc: ${jobs.value[index]}?`)) {
    jobs.value.splice(index, 1);
  }
};
</script>

<style scoped>
/* Đồng bộ hóa style giống bài Học sinh */
.form-control {
  border: 1px solid #ced4da !important;
  color: #000 !important;
}
.form-control:focus {
  border-color: #198754 !important;
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
}
</style>