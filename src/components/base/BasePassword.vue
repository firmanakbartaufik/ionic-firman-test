<template>
  <ion-item>
    <ion-input
      :model-value="modelValue ?? ''"
      :type="showPassword ? 'text' : 'password'"
      :label="label"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :clear-input="clearInput"
      label-placement="stacked"
      @ionInput="onInput"
      @ionBlur="$emit('blur')"
    />

    <ion-button
      slot="end"
      fill="clear"
      @click="togglePassword"
    >
      <ion-icon :icon="showPassword ? eyeOffOutline : eyeOutline" />
    </ion-button>
  </ion-item>

  <ion-text
    v-if="error"
    color="danger"
    class="ion-padding-start ion-padding-top"
  >
    <small>{{ error }}</small>
  </ion-text>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import {
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonText,
} from '@ionic/vue'

import {
  eyeOutline,
  eyeOffOutline,
} from 'ionicons/icons'

interface Props {
  modelValue?: string
  label: string
  placeholder?: string
  error?: string
  disabled?: boolean
  readonly?: boolean
  clearInput?: boolean
}

withDefaults(defineProps<Props>(), {
  placeholder: '',
  disabled: false,
  readonly: false,
  clearInput: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
}>()

const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const onInput = (event: CustomEvent) => {
  emit(
    'update:modelValue',
    String(event.detail.value ?? '')
  )
}
</script>