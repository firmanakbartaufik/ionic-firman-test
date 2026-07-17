<template>
  <ion-page>

    <AppMenu />

    <ion-page id="main-content">

      <AppHeader :title="pageTitle" />

      <ion-router-outlet />

    </ion-page>

  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonRouterOutlet,
} from '@ionic/vue'

import { computed } from 'vue'
import { useRoute } from 'vue-router'

import AppHeader from '@/components/layout/AppHeader.vue'
import AppMenu from '@/components/layout/AppMenu.vue'

const route = useRoute()

const pageTitle = computed(() => {
  switch (route.name) {
    case 'dashboard':
      return 'Dashboard'

    case 'contents':
      return 'Content'

    case 'content-create':
      return 'Tambah Content'

    case 'content-edit':
      return 'Edit Content'

    default:
      return 'Application'
  }
})
</script>