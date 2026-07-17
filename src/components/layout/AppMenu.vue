<template>
  <ion-menu content-id="main-content">

    <ion-content class="menu-content">

      <div class="menu-brand">
        <div class="brand-logo">
          <ion-icon :icon="rocketOutline" />
        </div>
        <h2 class="brand-name">Firman App</h2>
        <p class="brand-tagline">Fullstack Management</p>
      </div>

      <div class="menu-nav">
        <ion-menu-toggle :auto-hide="true">
          <button
            class="menu-item"
            :class="{ active: isActive('/app/dashboard') }"
            @click="navigate('/app/dashboard')"
          >
            <div class="menu-item-icon">
              <ion-icon :icon="homeOutline" />
            </div>
            <span class="menu-item-label">Dashboard</span>
            <ion-icon :icon="chevronForwardOutline" class="menu-item-arrow" />
          </button>
        </ion-menu-toggle>

        <ion-menu-toggle :auto-hide="true">
          <button
            class="menu-item"
            :class="{ active: isActive('/app/contents') }"
            @click="navigate('/app/contents')"
          >
            <div class="menu-item-icon" style="background: linear-gradient(135deg, #10b981, #34d399);">
              <ion-icon :icon="documentTextOutline" />
            </div>
            <span class="menu-item-label">Contents</span>
            <ion-icon :icon="chevronForwardOutline" class="menu-item-arrow" />
          </button>
        </ion-menu-toggle>
      </div>

      <div class="menu-footer">
        <button class="menu-item menu-item-danger" @click="logout">
          <div class="menu-item-icon" style="background: linear-gradient(135deg, #ef4444, #f87171);">
            <ion-icon :icon="logOutOutline" />
          </div>
          <span class="menu-item-label">Logout</span>
        </button>
      </div>

    </ion-content>

  </ion-menu>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonIcon,
  IonMenu,
  IonMenuToggle,
} from '@ionic/vue'

import {
  rocketOutline,
  homeOutline,
  documentTextOutline,
  logOutOutline,
  chevronForwardOutline,
} from 'ionicons/icons'

import { useRouter, useRoute } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const isActive = (path: string) => {
  return route.path.startsWith(path)
}

const navigate = (path: string) => {
  router.push(path)
}

const logout = async () => {
  await auth.logout()
  router.replace('/login')
}
</script>

<style scoped>
.menu-content {
  --background: linear-gradient(180deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%);
  --color: white;
  display: flex;
  flex-direction: column;
}

.menu-brand {
  padding: 32px 24px 24px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.brand-logo {
  width: 64px;
  height: 64px;
  margin: 0 auto 12px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
}

.brand-logo ion-icon {
  font-size: 32px;
  color: white;
}

.brand-name {
  font-size: 20px;
  font-weight: 800;
  color: white;
  margin: 0 0 4px;
}

.brand-tagline {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.menu-nav {
  flex: 1;
  padding: 16px 12px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 14px 16px;
  background: transparent;
  border: none;
  border-radius: 14px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 6px;
  text-align: left;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

.menu-item.active {
  background: rgba(99, 102, 241, 0.25);
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.menu-item-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  flex-shrink: 0;
}

.menu-item-icon ion-icon {
  font-size: 20px;
  color: white;
}

.menu-item-label {
  flex: 1;
  font-size: 15px;
  font-weight: 600;
}

.menu-item-arrow {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.3);
  transition: transform 0.2s ease;
}

.menu-item:hover .menu-item-arrow {
  transform: translateX(2px);
  color: rgba(255, 255, 255, 0.6);
}

.menu-footer {
  padding: 16px 12px 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.menu-item-danger {
  color: rgba(239, 68, 68, 0.8);
}

.menu-item-danger:hover {
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
}

.menu-item-danger .menu-item-arrow {
  display: none;
}
</style>
