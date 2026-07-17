<template>
  <ion-loading
    :is-open="loading"
    message="Loading..."
  />
</template>

<script setup lang="ts">
import { IonLoading } from '@ionic/vue'

defineProps<{
  loading: boolean
}>()
</script>