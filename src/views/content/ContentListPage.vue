<template>
  <ion-page>

    <ion-content class="list-content">

      <div class="content-list">

        <div class="page-header animate-fade-in-up">
          <div class="header-text">
            <h1 class="page-title">Content Management</h1>
            <p class="page-subtitle">Kelola semua data content Anda</p>
          </div>
          <button class="add-btn" @click="create">
            <ion-icon :icon="addOutline" />
            <span>Tambah</span>
          </button>
        </div>

        <div class="search-section animate-fade-in-up stagger-2">
          <div class="search-wrapper">
            <ion-icon :icon="searchOutline" class="search-icon" />
            <input
              v-model="store.search"
              type="text"
              placeholder="Cari content..."
              class="search-input"
              @keyup.enter="loadData"
            />
            <button
              v-if="store.search"
              class="clear-btn"
              @click="clearSearch"
            >
              <ion-icon :icon="closeCircleOutline" />
            </button>
          </div>
        </div>

        <div class="table-section animate-fade-in-up stagger-3">

          <div class="table-card" v-if="store.items && store.items.length > 0">

            <div class="table-header">
              <div class="th" style="flex: 0 0 60px;">ID</div>
              <div class="th" style="flex: 1;">Title</div>
              <div class="th hide-mobile" style="flex: 2;">Description</div>
              <div class="th" style="flex: 0 0 140px; text-align: center;">Aksi</div>
            </div>

            <div
              v-for="(row, index) in (store.items || [])"
              :key="row.id"
              class="table-row"
              :style="{ animationDelay: `${index * 0.05}s` }"
            >
              <div class="td" style="flex: 0 0 60px;">
                <span class="id-badge">{{ row.id }}</span>
              </div>
              <div class="td" style="flex: 1;">
                <span class="td-title">{{ row.title }}</span>
              </div>
              <div class="td hide-mobile" style="flex: 2;">
                <span class="td-desc">{{ row.description || '-' }}</span>
              </div>
              <div class="td" style="flex: 0 0 140px; text-align: center;">
                <div class="action-btns">
                  <button class="btn-edit" @click="edit(row as Content)">
                    <ion-icon :icon="createOutline" />
                    Edit
                  </button>
                  <button class="btn-delete" @click="remove(row as Content)">
                    <ion-icon :icon="trashOutline" />
                    Hapus
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div class="empty-state" v-else>
            <div class="empty-icon">
              <ion-icon :icon="documentTextOutline" />
            </div>
            <h3 class="empty-title">Tidak ada data</h3>
            <p class="empty-desc">Belum ada content yang tersedia. Silakan tambah content baru.</p>
            <button class="add-btn-sm" @click="create">
              <ion-icon :icon="addOutline" />
              Tambah Content
            </button>
          </div>

        </div>

        <div class="pagination-section animate-fade-in-up stagger-4" v-if="store.lastPage > 1">
          <button
            class="page-btn"
            :disabled="store.page <= 1"
            @click="changePage(store.page - 1)"
          >
            <ion-icon :icon="chevronBackOutline" />
            Sebelumnya
          </button>
          <span class="page-info">Halaman {{ store.page }} dari {{ store.lastPage }}</span>
          <button
            class="page-btn"
            :disabled="store.page >= store.lastPage"
            @click="changePage(store.page + 1)"
          >
            Selanjutnya
            <ion-icon :icon="chevronForwardOutline" />
          </button>
        </div>

      </div>

    </ion-content>

  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonIcon,
  IonPage,
  onIonViewWillEnter,
} from '@ionic/vue'

import {
  addOutline,
  searchOutline,
  closeCircleOutline,
  createOutline,
  trashOutline,
  documentTextOutline,
  chevronBackOutline,
  chevronForwardOutline,
} from 'ionicons/icons'

import { useRouter } from 'vue-router'

import { useContentStore } from '@/stores/content'
import { showAlert } from '@/composables/useAlert'
import { showConfirm } from '@/composables/useConfirm'

import type { Content } from '@/types/content'

const router = useRouter()
const store = useContentStore()

const loadData = async () => {
  try {
    await store.fetch()
  } catch (e: any) {
    showAlert('Error', e.response?.data?.message || 'Gagal memuat data content')
  }
}

const clearSearch = () => {
  store.search = ''
  loadData()
}

const changePage = async (page: number) => {
  store.page = page
  await loadData()
}

const create = () => {
  router.push('/app/contents/create')
}

const edit = (row: Content) => {
  router.push(`/app/contents/${row.id}/edit`)
}

const remove = async (row: Content) => {
  const confirmed = await showConfirm(
    `Hapus "${row.title}"? Tindakan ini tidak dapat dibatalkan.`
  )

  if (!confirmed) return

  try {
    await store.delete(row.id)
  } catch (e: any) {
    showAlert('Error', e.response?.data?.message || 'Gagal menghapus content')
  }
}

onIonViewWillEnter(async () => {
  await loadData()
})
</script>

<style scoped>
.content-list {
  padding: 20px 16px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  font-size: 24px;
  font-weight: 800;
  color: #1f2937;
  margin: 0;
}

.page-subtitle {
  font-size: 14px;
  color: #9ca3af;
  margin: 4px 0 0;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
  white-space: nowrap;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
}

.add-btn ion-icon {
  font-size: 18px;
}

.search-section {
  margin-bottom: 20px;
}

.search-wrapper {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 14px;
  padding: 0 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1.5px solid rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.search-wrapper:focus-within {
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.08);
}

.search-icon {
  font-size: 20px;
  color: #9ca3af;
  margin-right: 12px;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  padding: 14px 0;
  color: #1f2937;
  outline: none;
  font-family: inherit;
}

.search-input::placeholder {
  color: #9ca3af;
}

.clear-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #d1d5db;
  font-size: 22px;
  display: flex;
  transition: color 0.2s;
}

.clear-btn:hover {
  color: #ef4444;
}

.table-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.table-header {
  display: flex;
  padding: 14px 18px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.th {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.table-row {
  display: flex;
  align-items: center;
  padding: 14px 18px;
  border-bottom: 1px solid #f3f4f6;
  transition: background 0.2s ease;
  animation: fadeInUp 0.3s ease forwards;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: #f8f9fc;
}

.td {
  font-size: 14px;
  color: #374151;
}

.id-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #eef2ff, #e0e7ff);
  color: #6366f1;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
}

.td-title {
  font-weight: 600;
  color: #1f2937;
}

.td-desc {
  color: #6b7280;
  font-size: 13px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.action-btns {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.btn-edit, .btn-delete {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-edit {
  background: #eef2ff;
  color: #6366f1;
}

.btn-edit:hover {
  background: #6366f1;
  color: white;
}

.btn-delete {
  background: #fef2f2;
  color: #ef4444;
}

.btn-delete:hover {
  background: #ef4444;
  color: white;
}

.btn-edit ion-icon, .btn-delete ion-icon {
  font-size: 14px;
}

.empty-state {
  text-align: center;
  padding: 60px 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, #eef2ff, #e0e7ff);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-icon ion-icon {
  font-size: 36px;
  color: #6366f1;
}

.empty-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px;
}

.empty-desc {
  font-size: 14px;
  color: #9ca3af;
  margin: 0 0 20px;
}

.add-btn-sm {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-btn-sm:hover {
  transform: translateY(-2px);
}

.add-btn-sm ion-icon {
  font-size: 16px;
}

.pagination-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
}

.page-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  background: white;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  border-color: #6366f1;
  color: #6366f1;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-btn ion-icon {
  font-size: 16px;
}

.page-info {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
}

.hide-mobile {}

@media (max-width: 768px) {
  .hide-mobile {
    display: none !important;
  }

  .table-header {
    display: none;
  }

  .table-row {
    flex-wrap: wrap;
    gap: 8px;
    padding: 16px;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .add-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
