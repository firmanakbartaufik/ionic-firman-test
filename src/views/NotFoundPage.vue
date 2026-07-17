<template>
  <ion-page>
    <ion-content class="not-found-content">

      <div class="not-found-bg">
        <div class="bg-blob blob-1"></div>
        <div class="bg-blob blob-2"></div>
        <div class="bg-blob blob-3"></div>
      </div>

      <div class="not-found-container animate-fade-in-up">

        <div class="error-illustration">
          <span class="error-code">404</span>
          <div class="error-ghost animate-float">
            <ion-icon :icon="warningOutline" />
          </div>
        </div>

        <h1 class="error-title">Halaman Tidak Ditemukan</h1>
        <p class="error-subtitle">Sepertinya halaman yang Anda cari sudah dipindahkan atau tidak tersedia.</p>

        <button class="home-btn" @click="goHome">
          <ion-icon :icon="homeOutline" />
          <span>Kembali ke Beranda</span>
        </button>

      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonIcon,
  IonPage,
} from '@ionic/vue'

import {
  warningOutline,
  homeOutline,
} from 'ionicons/icons'

import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.replace('/home')
}
</script>

<style scoped>
.not-found-content {
  --background: linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 50%, #f5f0ff 100%);
}

.not-found-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
}

.bg-blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.3;
}

.blob-1 {
  width: 300px;
  height: 300px;
  top: -50px;
  right: -80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  filter: blur(60px);
}

.blob-2 {
  width: 200px;
  height: 200px;
  bottom: 20%;
  left: -50px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  filter: blur(50px);
}

.blob-3 {
  width: 150px;
  height: 150px;
  top: 30%;
  left: 50%;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  filter: blur(40px);
}

.not-found-container {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
  text-align: center;
}

.error-illustration {
  position: relative;
  margin-bottom: 32px;
}

.error-code {
  font-size: 120px;
  font-weight: 900;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  letter-spacing: -4px;
}

.error-ghost {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  background: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

.error-ghost ion-icon {
  font-size: 32px;
  color: #f59e0b;
}

.error-title {
  font-size: 24px;
  font-weight: 800;
  color: #1f2937;
  margin: 0 0 12px;
}

.error-subtitle {
  font-size: 15px;
  color: #6b7280;
  margin: 0 0 32px;
  max-width: 320px;
  line-height: 1.6;
}

.home-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
}

.home-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.5);
}

.home-btn:active {
  transform: translateY(0);
}

.home-btn ion-icon {
  font-size: 20px;
}

@media (min-width: 768px) {
  .error-code {
    font-size: 180px;
  }
}
</style>
