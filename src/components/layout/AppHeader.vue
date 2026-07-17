<template>
  <ion-header class="app-header">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button class="menu-btn" />
      </ion-buttons>

      <ion-title class="header-title">{{ title }}</ion-title>

      <ion-buttons slot="end">
        <div class="header-avatar" v-if="userName">
          {{ initials }}
        </div>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'

import { useAuthStore } from '@/stores/auth'

interface Props {
  title: string
}

defineProps<Props>()

const auth = useAuthStore()

const userName = computed(() => auth.user?.name ?? '')

const initials = computed(() => {
  return userName.value
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
})
</script>

<style scoped>
.app-header ion-toolbar {
  --background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --color: white;
  --border-width: 0;
  --min-height: 56px;
}

.header-title {
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.3px;
}

.menu-btn {
  color: white;
  font-size: 24px;
}

.header-avatar {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  margin-right: 4px;
}
</style>
