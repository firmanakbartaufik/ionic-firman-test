<template>
  <ion-item>

    <ion-textarea
      :label="label"
      label-placement="stacked"
      :model-value="modelValue"
      @ionInput="updateValue"
    />

  </ion-item>

  <ion-text
    v-if="error"
    color="danger"
    class="ion-padding-start"
  >
    <small>{{ error }}</small>
  </ion-text>
</template>

<script setup lang="ts">
import {
  IonItem,
  IonTextarea,
  IonText,
} from '@ionic/vue'

import type { TextareaCustomEvent } from '@ionic/core'

interface Props {
  label: string
  modelValue: string
  error?: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const updateValue = (
  event: TextareaCustomEvent
) => {
  emit(
    'update:modelValue',
    event.detail.value ?? ''
  )
}
</script>