<template>
  <div class="pagination-container">

    <ion-button
      fill="outline"
      size="small"
      :disabled="currentPage <= 1"
      @click="changePage(currentPage - 1)"
    >
      Previous
    </ion-button>

    <div class="pagination-info">
      Halaman {{ currentPage }} dari {{ lastPage }}
    </div>

    <ion-button
      fill="outline"
      size="small"
      :disabled="currentPage >= lastPage"
      @click="changePage(currentPage + 1)"
    >
      Next
    </ion-button>

  </div>
</template>

<script setup lang="ts">
import { IonButton } from '@ionic/vue'

interface Props {
  currentPage: number
  lastPage: number
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'change', page: number): void
}>()

const changePage = (page: number) => {
  emit('change', page)
}
</script>

<style scoped>
.pagination-container{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-top:20px;
}

.pagination-info{
  font-size:14px;
  font-weight:500;
}
</style>