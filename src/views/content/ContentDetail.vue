<template>
  <ion-page>

    <ion-content class="detail-content">

      <div class="detail-page">

        <div class="page-header animate-fade-in-up">
          <button class="back-btn" @click="goBack">
            <ion-icon :icon="arrowBackOutline" />
          </button>
          <div class="header-text">
            <h1 class="page-title">Detail Content</h1>
            <p class="page-subtitle">Lihat informasi content</p>
          </div>
          <button
            class="edit-btn"
            v-if="store.item"
            @click="editContent"
          >
            <ion-icon :icon="createOutline" />
            Edit
          </button>
        </div>

        <div class="loading-state" v-if="store.loading">
          <div class="spinner-large"></div>
          <p>Memuat data...</p>
        </div>

        <div class="error-state" v-else-if="errorMsg">
          <div class="error-icon">
            <ion-icon :icon="alertCircleOutline" />
          </div>
          <h3>Gagal Memuat Data</h3>
          <p>{{ errorMsg }}</p>
          <button class="retry-btn" @click="loadData">
            <ion-icon :icon="refreshOutline" />
            Coba Lagi
          </button>
        </div>

        <div class="detail-card animate-fade-in-up stagger-2" v-else-if="store.item">
          <div class="detail-header">
            <div class="detail-icon">
              <ion-icon :icon="documentTextOutline" />
            </div>
            <div class="detail-meta">
              <span class="detail-id">#{{ store.item.id }}</span>
              <span class="detail-date">{{ formatDate(store.item.created_at) }}</span>
            </div>
          </div>

          <div class="detail-body">
            <div class="detail-field">
              <label class="field-label">Judul</label>
              <p class="field-value field-title">{{ store.item.title }}</p>
            </div>

            <div class="detail-field">
              <label class="field-label">Deskripsi</label>
              <p class="field-value">{{ store.item.description || '-' }}</p>
            </div>

            <div class="detail-field" v-if="store.item.updated_at">
              <label class="field-label">Terakhir Diperbarui</label>
              <p class="field-value">{{ formatDate(store.item.updated_at) }}</p>
            </div>
          </div>
        </div>

      </div>

    </ion-content>

  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import {
  IonContent,
  IonIcon,
  IonPage,
} from '@ionic/vue'

import {
  arrowBackOutline,
  createOutline,
  documentTextOutline,
  alertCircleOutline,
  refreshOutline,
} from 'ionicons/icons'

import { useContentStore } from '@/stores/content'

const route = useRoute()
const router = useRouter()
const store = useContentStore()
const errorMsg = ref('')

const loadData = async () => {
  errorMsg.value = ''
  try {
    await store.show(Number(route.params.id))
  } catch (e: any) {
    errorMsg.value = e.response?.data?.message || 'Gagal memuat data content'
  }
}

const editContent = () => {
  router.push(`/app/contents/${route.params.id}/edit`)
}

const goBack = () => {
  router.back()
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

onMounted(loadData)

onUnmounted(() => {
  store.resetItem()
})
</script>

<style scoped>
.detail-content {
  --background: #f0f2f9;
}

.detail-page {
  padding: 20px 16px;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}

.back-btn {
  width: 44px;
  height: 44px;
  background: white;
  border: 1.5px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.back-btn:hover {
  background: #6366f1;
  border-color: #6366f1;
}

.back-btn ion-icon {
  font-size: 20px;
  color: #374151;
}

.back-btn:hover ion-icon {
  color: white;
}

.header-text {
  flex: 1;
}

.page-title {
  font-size: 22px;
  font-weight: 800;
  color: #1f2937;
  margin: 0;
}

.page-subtitle {
  font-size: 14px;
  color: #9ca3af;
  margin: 4px 0 0;
}

.edit-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.edit-btn:hover {
  transform: translateY(-2px);
}

.edit-btn ion-icon {
  font-size: 16px;
}

.loading-state {
  text-align: center;
  padding: 60px 24px;
  color: #6b7280;
}

.spinner-large {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state {
  text-align: center;
  padding: 60px 24px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.error-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 16px;
  background: #fef2f2;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-icon ion-icon {
  font-size: 36px;
  color: #ef4444;
}

.error-state h3 {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px;
}

.error-state p {
  font-size: 14px;
  color: #9ca3af;
  margin: 0 0 20px;
}

.retry-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-btn:hover {
  transform: translateY(-2px);
}

.retry-btn ion-icon {
  font-size: 16px;
}

.detail-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.detail-icon {
  width: 52px;
  height: 52px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-icon ion-icon {
  font-size: 26px;
  color: white;
}

.detail-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-id {
  font-size: 13px;
  font-weight: 700;
  opacity: 0.8;
}

.detail-date {
  font-size: 12px;
  opacity: 0.6;
}

.detail-body {
  padding: 24px;
}

.detail-field {
  margin-bottom: 20px;
}

.detail-field:last-child {
  margin-bottom: 0;
}

.field-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
}

.field-value {
  font-size: 15px;
  color: #1f2937;
  line-height: 1.6;
  margin: 0;
}

.field-title {
  font-size: 20px;
  font-weight: 700;
}
</style>
