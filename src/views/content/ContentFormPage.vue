<template>
  <ion-page>

    <ion-content class="form-content">

      <div class="form-page">

        <div class="page-header animate-fade-in-up">
          <button class="back-btn" @click="goBack">
            <ion-icon :icon="arrowBackOutline" />
          </button>
          <div class="header-text">
            <h1 class="page-title">{{ isEdit ? 'Edit Content' : 'Buat Content Baru' }}</h1>
            <p class="page-subtitle">{{ isEdit ? 'Perbarui informasi content' : 'Isi formulir untuk menambah content' }}</p>
          </div>
        </div>

        <div class="form-card animate-fade-in-up stagger-2">

          <div class="form-icon">
            <ion-icon :icon="isEdit ? createOutline : documentTextOutline" />
          </div>

          <div class="error-banner" v-if="errorMsg">
            <ion-icon :icon="alertCircleOutline" />
            <span>{{ errorMsg }}</span>
          </div>

          <form @submit.prevent="save">

            <div class="input-group">
              <label class="input-label">Judul Content</label>
              <div class="input-wrapper">
                <ion-icon :icon="textOutline" class="input-icon" />
                <input
                  v-model="form.title"
                  type="text"
                  placeholder="Masukkan judul content"
                  class="custom-input"
                />
              </div>
            </div>

            <div class="input-group">
              <label class="input-label">Deskripsi</label>
              <div class="textarea-wrapper">
                <ion-icon :icon="documentOutline" class="input-icon textarea-icon" />
                <textarea
                  v-model="form.description"
                  placeholder="Masukkan deskripsi content"
                  class="custom-textarea"
                  rows="5"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              class="save-btn"
              :class="{ loading: saving }"
              :disabled="saving"
            >
              <span v-if="!saving">
                <ion-icon :icon="saveOutline" />
                {{ isEdit ? 'Perbarui' : 'Simpan' }}
              </span>
              <span v-else class="spinner"></span>
            </button>

          </form>

        </div>

      </div>

    </ion-content>

  </ion-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
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
  textOutline,
  documentOutline,
  saveOutline,
  alertCircleOutline,
} from 'ionicons/icons'

import { useContentStore } from '@/stores/content'

const router = useRouter()
const route = useRoute()
const store = useContentStore()
const saving = ref(false)
const errorMsg = ref('')

const form = reactive({
  title: '',
  description: '',
})

const isEdit = computed(() => !!route.params.id)

const load = async () => {
  if (!isEdit.value) return

  try {
    const content = await store.show(Number(route.params.id))
    if (content) {
      form.title = content.title
      form.description = content.description
    }
  } catch (e: any) {
    errorMsg.value = e.response?.data?.message || 'Gagal memuat data content'
  }
}

const save = async () => {
  saving.value = true
  errorMsg.value = ''

  try {
    if (isEdit.value) {
      await store.update(Number(route.params.id), {
        title: form.title,
        description: form.description,
      })
    } else {
      await store.create({
        title: form.title,
        description: form.description,
      })
    }

    router.replace('/app/contents')
  } catch (e: any) {
    const status = e.response?.status
    const message = e.response?.data?.message || 'Gagal menyimpan content'

    if (status === 403) {
      errorMsg.value = `[${status}] ${message} — Periksa ContentPolicy di backend (method create/update).`
    } else if (status === 422) {
      const errors = e.response?.data?.errors
      if (errors) {
        const firstError = Object.values(errors).flat().join(', ')
        errorMsg.value = `[${status}] Validasi gagal: ${firstError}`
      } else {
        errorMsg.value = `[${status}] ${message}`
      }
    } else {
      errorMsg.value = `[${status || '??'}] ${message}`
    }
  } finally {
    saving.value = false
  }
}

const goBack = () => {
  router.back()
}

onMounted(load)

onUnmounted(() => {
  store.resetItem()
})
</script>

<style scoped>
.form-content {
  --background: #f0f2f9;
}

.form-page {
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
  color: white;
}

.back-btn ion-icon {
  font-size: 20px;
  color: #374151;
}

.back-btn:hover ion-icon {
  color: white;
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

.form-card {
  background: white;
  border-radius: 20px;
  padding: 32px 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.form-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
}

.form-icon ion-icon {
  font-size: 30px;
  color: white;
}

.input-group {
  margin-bottom: 20px;
}

.input-label {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: #374151;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  background: #f8f9fc;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 0 16px;
  transition: all 0.3s ease;
}

.input-wrapper:focus-within {
  border-color: #6366f1;
  background: white;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.input-icon {
  font-size: 20px;
  color: #9ca3af;
  margin-right: 12px;
  flex-shrink: 0;
}

.custom-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  padding: 14px 0;
  color: #1f2937;
  outline: none;
  width: 100%;
  font-family: inherit;
}

.custom-input::placeholder {
  color: #9ca3af;
}

.textarea-wrapper {
  display: flex;
  background: #f8f9fc;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px 16px;
  transition: all 0.3s ease;
}

.textarea-wrapper:focus-within {
  border-color: #6366f1;
  background: white;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.textarea-icon {
  margin-top: 2px;
}

.custom-textarea {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  color: #1f2937;
  outline: none;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  line-height: 1.6;
}

.custom-textarea::placeholder {
  color: #9ca3af;
}

.save-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
  margin-top: 8px;
}

.save-btn:hover:not(.loading) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.5);
}

.save-btn:active:not(.loading) {
  transform: translateY(0);
}

.save-btn.loading {
  opacity: 0.7;
  cursor: not-allowed;
}

.save-btn span {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.save-btn ion-icon {
  font-size: 20px;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-banner {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  background: #fef2f2;
  border: 1.5px solid #fecaca;
  border-radius: 12px;
  color: #dc2626;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
}

.error-banner ion-icon {
  font-size: 20px;
  flex-shrink: 0;
}
</style>
