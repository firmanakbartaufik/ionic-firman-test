<template>
  <div class="empty-state">

    <ion-icon
      :icon="documentOutline"
      size="large"
    />

    <h2>{{ title }}</h2>

    <p>{{ description }}</p>

  </div>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue'
import { documentOutline } from 'ionicons/icons'

withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {
    title: 'Tidak ada data',
    description: 'Belum ada data yang tersedia.',
  }
)
</script>

<style scoped>
.empty-state{
  height:300px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
}
</style>