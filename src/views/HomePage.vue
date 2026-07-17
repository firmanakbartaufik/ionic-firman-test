<template>
  <ion-page>
    <ion-content>

      <div class="dashboard">
        <div class="welcome-banner animate-fade-in-up">
          <div class="banner-bg">
            <div class="banner-circle banner-circle-1"></div>
            <div class="banner-circle banner-circle-2"></div>
          </div>
          <div class="banner-content">
            <div class="greeting-icon animate-float">
              <ion-icon :icon="handRightOutline" />
            </div>
            <div class="greeting-text">
              <h1 class="greeting-title">Selamat Datang!</h1>
              <p class="greeting-name">{{ auth.user?.name ?? 'User' }}</p>
            </div>
            <div class="user-avatar">
              {{ initials }}
            </div>
          </div>
        </div>

        <div class="info-section animate-fade-in-up stagger-2">
          <div class="info-card">
            <div class="info-icon" style="background: linear-gradient(135deg, #6366f1, #8b5cf6);">
              <ion-icon :icon="personOutline" />
            </div>
            <div class="info-details">
              <span class="info-label">Nama</span>
              <span class="info-value">{{ auth.user?.name ?? '-' }}</span>
            </div>
          </div>
          <div class="info-card">
            <div class="info-icon" style="background: linear-gradient(135deg, #06b6d4, #22d3ee);">
              <ion-icon :icon="mailOutline" />
            </div>
            <div class="info-details">
              <span class="info-label">Email</span>
              <span class="info-value">{{ auth.user?.email ?? '-' }}</span>
            </div>
          </div>
        </div>

        <div class="actions-section animate-fade-in-up stagger-3">
          <h2 class="section-title">Menu Utama</h2>

          <div class="action-grid">
            <button class="action-card" @click="goContents">
              <div class="action-icon" style="background: linear-gradient(135deg, #10b981, #34d399);">
                <ion-icon :icon="documentTextOutline" />
              </div>
              <span class="action-title">Content Management</span>
              <span class="action-desc">Kelola data content</span>
              <ion-icon :icon="chevronForwardOutline" class="action-arrow" />
            </button>

            <button class="action-card action-danger" @click="logout">
              <div class="action-icon" style="background: linear-gradient(135deg, #ef4444, #f87171);">
                <ion-icon :icon="logOutOutline" />
              </div>
              <span class="action-title">Logout</span>
              <span class="action-desc">Keluar dari aplikasi</span>
              <ion-icon :icon="chevronForwardOutline" class="action-arrow" />
            </button>
          </div>
        </div>

      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  IonContent,
  IonIcon,
  IonPage,
} from '@ionic/vue'

import {
  personOutline,
  mailOutline,
  documentTextOutline,
  logOutOutline,
  chevronForwardOutline,
  handRightOutline,
} from 'ionicons/icons'

import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const initials = computed(() => {
  const name = auth.user?.name ?? ''
  return name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const goContents = () => {
  router.push('/app/contents')
}

const logout = async () => {
  await auth.logout()
  router.replace('/login')
}
</script>

<style scoped>
.dashboard {
  padding: 20px 16px;
  min-height: 100%;
}

.welcome-banner {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 28px 24px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.35);
}

.banner-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.banner-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
}

.banner-circle-1 {
  width: 150px;
  height: 150px;
  top: -40px;
  right: -20px;
}

.banner-circle-2 {
  width: 100px;
  height: 100px;
  bottom: -30px;
  left: 20px;
}

.banner-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 16px;
}

.greeting-icon {
  width: 52px;
  height: 52px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.greeting-icon ion-icon {
  font-size: 28px;
  color: white;
}

.greeting-text {
  flex: 1;
}

.greeting-title {
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 4px;
}

.greeting-name {
  font-size: 24px;
  font-weight: 800;
  color: white;
  margin: 0;
  line-height: 1.2;
}

.user-avatar {
  width: 52px;
  height: 52px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: white;
  border-radius: 16px;
  padding: 16px 18px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.info-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-icon ion-icon {
  font-size: 22px;
  color: white;
}

.info-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-label {
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
}

.actions-section {
  margin-top: 28px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px;
}

.action-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: white;
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.action-card:active {
  transform: translateY(0);
}

.action-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.action-icon ion-icon {
  font-size: 24px;
  color: white;
}

.action-title {
  flex: 1;
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  display: block;
}

.action-desc {
  font-size: 13px;
  color: #9ca3af;
  display: block;
  margin-top: 2px;
}

.action-arrow {
  font-size: 20px;
  color: #d1d5db;
  flex-shrink: 0;
}

.action-danger .action-title {
  color: #ef4444;
}

@media (min-width: 768px) {
  .info-section {
    flex-direction: row;
  }

  .info-card {
    flex: 1;
  }

  .action-grid {
    flex-direction: row;
  }

  .action-card {
    flex: 1;
    flex-direction: column;
    text-align: center;
    padding: 24px;
  }

  .action-arrow {
    display: none;
  }
}
</style>
