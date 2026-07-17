<template>
  <ion-page>
    <ion-content class="login-content">

      <div class="login-bg">
        <div class="bg-circle bg-circle-1"></div>
        <div class="bg-circle bg-circle-2"></div>
        <div class="bg-circle bg-circle-3"></div>
      </div>

      <div class="login-container animate-fade-in-up">

        <div class="brand-section">
          <div class="brand-icon animate-float">
            <ion-icon :icon="rocketOutline" />
          </div>
          <h1 class="brand-title">Selamat Datang</h1>
          <p class="brand-subtitle">Masuk ke akun Anda untuk melanjutkan</p>
        </div>

        <div class="form-card animate-fade-in-up stagger-2">

          <form @submit.prevent="onSubmit">

            <div class="input-group animate-fade-in-up stagger-3">
              <label class="input-label">Email</label>
              <div class="input-wrapper" :class="{ 'has-error': emailError }">
                <ion-icon :icon="mailOutline" class="input-icon" />
                <input
                  v-model="email"
                  type="email"
                  placeholder="Masukkan email Anda"
                  class="custom-input"
                />
              </div>
              <span v-if="emailError" class="error-text">{{ emailError }}</span>
            </div>

            <div class="input-group animate-fade-in-up stagger-4">
              <label class="input-label">Password</label>
              <div class="input-wrapper" :class="{ 'has-error': passwordError }">
                <ion-icon :icon="lockClosedOutline" class="input-icon" />
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Masukkan password Anda"
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
              <span v-if="passwordError" class="error-text">{{ passwordError }}</span>
            </div>

            <button
              type="submit"
              class="login-btn animate-fade-in-up stagger-5"
              :class="{ loading: auth.loading }"
              :disabled="auth.loading"
            >
              <span v-if="!auth.loading">Masuk</span>
              <span v-else class="spinner"></span>
            </button>

          </form>

          <div class="divider">
            <span>atau</span>
          </div>

          <router-link to="/register" class="register-link">
            Belum punya akun? <strong>Daftar Sekarang</strong>
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
  rocketOutline,
  mailOutline,
  lockClosedOutline,
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons'

import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'

import { loginSchema } from '@/validations/auth'
import type { LoginRequest } from '@/types/auth'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const showPassword = ref(false)

const { handleSubmit } = useForm<LoginRequest>({
  validationSchema: toTypedSchema(loginSchema),
})

const {
  value: email,
  errorMessage: emailError,
} = useField<string>('email')

const {
  value: password,
  errorMessage: passwordError,
} = useField<string>('password')

const onSubmit = handleSubmit(async (values) => {
  await auth.login(values)
  router.replace('/home')
})
</script>

<style scoped>
.login-content {
  --background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --color: white;
}

.login-bg {
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
  opacity: 0.1;
  background: white;
}

.bg-circle-1 {
  width: 300px;
  height: 300px;
  top: -80px;
  right: -60px;
  animation: float 6s ease-in-out infinite;
}

.bg-circle-2 {
  width: 200px;
  height: 200px;
  bottom: 20%;
  left: -50px;
  animation: float 8s ease-in-out infinite reverse;
}

.bg-circle-3 {
  width: 150px;
  height: 150px;
  top: 40%;
  right: 10%;
  animation: float 5s ease-in-out infinite 1s;
}

.login-container {
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
  margin-bottom: 32px;
}

.brand-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
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
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.brand-subtitle {
  font-size: 15px;
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
}

.form-card {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 24px;
  padding: 32px 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
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

.login-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
  margin-top: 8px;
}

.login-btn:hover:not(.loading) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.5);
}

.login-btn:active:not(.loading) {
  transform: translateY(0);
}

.login-btn.loading {
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

.register-link {
  display: block;
  text-align: center;
  color: #6366f1;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}

.register-link:hover {
  color: #4f46e5;
}

.register-link strong {
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
