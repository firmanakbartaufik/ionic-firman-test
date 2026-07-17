<template>
  <ion-page>
    <ion-content class="register-content">

      <div class="register-bg">
        <div class="bg-circle bg-circle-1"></div>
        <div class="bg-circle bg-circle-2"></div>
        <div class="bg-circle bg-circle-3"></div>
      </div>

      <div class="register-container animate-fade-in-up">

        <div class="brand-section">
          <div class="brand-icon animate-float">
            <ion-icon :icon="personAddOutline" />
          </div>
          <h1 class="brand-title">Buat Akun</h1>
          <p class="brand-subtitle">Daftar untuk memulai menggunakan aplikasi</p>
        </div>

        <div class="form-card animate-fade-in-up stagger-2">

          <form @submit.prevent="onSubmit">

            <div class="input-group animate-fade-in-up stagger-3">
              <label class="input-label">Nama Lengkap</label>
              <div class="input-wrapper" :class="{ 'has-error': errors.name }">
                <ion-icon :icon="personOutline" class="input-icon" />
                <input
                  v-model="name"
                  type="text"
                  placeholder="Masukkan nama Anda"
                  class="custom-input"
                />
              </div>
              <span v-if="errors.name" class="error-text">{{ errors.name }}</span>
            </div>

            <div class="input-group animate-fade-in-up stagger-3">
              <label class="input-label">Email</label>
              <div class="input-wrapper" :class="{ 'has-error': errors.email }">
                <ion-icon :icon="mailOutline" class="input-icon" />
                <input
                  v-model="email"
                  type="email"
                  placeholder="Masukkan email Anda"
                  class="custom-input"
                />
              </div>
              <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
            </div>

            <div class="input-group animate-fade-in-up stagger-4">
              <label class="input-label">Password</label>
              <div class="input-wrapper" :class="{ 'has-error': errors.password }">
                <ion-icon :icon="lockClosedOutline" class="input-icon" />
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Buat password baru"
                  class="custom-input"
                />
                <button
                  type="button"
                  class="toggle-password"
                  @click="showPassword = !showPassword"
                >
                  <ion-icon :icon="showPassword ? eyeOutline : eyeOffOutline" />
                </button>
              </div>
              <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
            </div>

            <div class="input-group animate-fade-in-up stagger-4">
              <label class="input-label">Konfirmasi Password</label>
              <div class="input-wrapper" :class="{ 'has-error': errors.password_confirmation }">
                <ion-icon :icon="shieldCheckmarkOutline" class="input-icon" />
                <input
                  v-model="password_confirmation"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Ulangi password Anda"
                  class="custom-input"
                />
                <button
                  type="button"
                  class="toggle-password"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <ion-icon :icon="showConfirmPassword ? eyeOutline : eyeOffOutline" />
                </button>
              </div>
              <span v-if="errors.password_confirmation" class="error-text">{{ errors.password_confirmation }}</span>
            </div>

            <button
              type="submit"
              class="register-btn animate-fade-in-up stagger-5"
              :class="{ loading: auth.loading }"
              :disabled="auth.loading"
            >
              <span v-if="!auth.loading">Daftar Sekarang</span>
              <span v-else class="spinner"></span>
            </button>

          </form>

          <div class="divider">
            <span>atau</span>
          </div>

          <router-link to="/login" class="login-link">
            Sudah punya akun? <strong>Masuk</strong>
          </router-link>

        </div>

      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IonContent,
  IonIcon,
  IonPage,
} from '@ionic/vue'

import {
  personAddOutline,
  personOutline,
  mailOutline,
  lockClosedOutline,
  shieldCheckmarkOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons'

import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'

import { registerSchema } from '@/validations/auth'
import { useAuthStore } from '@/stores/auth'
import type { RegisterRequest } from '@/types/auth'

const router = useRouter()
const auth = useAuthStore()
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const { errors, defineField, handleSubmit } =
  useForm<RegisterRequest>({
    validationSchema: registerSchema,
  })

const [name] = defineField('name')
const [email] = defineField('email')
const [password] = defineField('password')
const [password_confirmation] = defineField('password_confirmation')

const onSubmit = handleSubmit(async (values) => {
  await auth.register(values)
  router.replace('/login')
})
</script>

<style scoped>
.register-content {
  --background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  --color: white;
}

.register-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.08;
  background: white;
}

.bg-circle-1 {
  width: 400px;
  height: 400px;
  top: -120px;
  right: -100px;
  animation: float 6s ease-in-out infinite;
}

.bg-circle-2 {
  width: 250px;
  height: 250px;
  bottom: 10%;
  left: -80px;
  animation: float 8s ease-in-out infinite reverse;
}

.bg-circle-3 {
  width: 180px;
  height: 180px;
  top: 50%;
  right: 5%;
  animation: float 5s ease-in-out infinite 1s;
}

.register-container {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
}

.brand-section {
  text-align: center;
  margin-bottom: 28px;
}

.brand-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.4);
}

.brand-icon ion-icon {
  font-size: 36px;
  color: white;
}

.brand-title {
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 8px;
  color: white;
}

.brand-subtitle {
  font-size: 15px;
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
}

.form-card {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 24px;
  padding: 32px 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.input-group {
  margin-bottom: 18px;
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

.input-wrapper.has-error {
  border-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
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

.toggle-password {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #9ca3af;
  font-size: 20px;
  display: flex;
  align-items: center;
  transition: color 0.2s;
}

.toggle-password:hover {
  color: #6366f1;
}

.error-text {
  display: block;
  font-size: 12px;
  color: #ef4444;
  margin-top: 6px;
  padding-left: 4px;
}

.register-btn {
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

.register-btn:hover:not(.loading) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.5);
}

.register-btn:active:not(.loading) {
  transform: translateY(0);
}

.register-btn.loading {
  opacity: 0.7;
  cursor: not-allowed;
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

.divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
  color: #9ca3af;
  font-size: 13px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e5e7eb;
}

.divider span {
  padding: 0 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
}

.login-link {
  display: block;
  text-align: center;
  color: #6366f1;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}

.login-link:hover {
  color: #4f46e5;
}

.login-link strong {
  font-weight: 700;
}

@media (min-width: 768px) {
  .form-card {
    padding: 40px 36px;
  }

  .brand-title {
    font-size: 36px;
  }
}
</style>
