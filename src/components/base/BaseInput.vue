<template>
  <ion-item>
    <ion-input
      :model-value="modelValue ?? ''"
      :type="type"
      :label="label"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :clear-input="clearInput"
      label-placement="stacked"
      @ionInput="onInput"
      @ionBlur="$emit('blur')"
    />
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
import {
  IonInput,
  IonItem,
  IonText,
} from '@ionic/vue'

import type { TextFieldTypes } from '@ionic/core'

interface Props {
  modelValue?: string
  label: string
  placeholder?: string
  type?: TextFieldTypes
  error?: string
  disabled?: boolean
  readonly?: boolean
  clearInput?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  clearInput: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'blur'): void
}>()

const onInput = (event: CustomEvent) => {
  emit(
    'update:modelValue',
    String(event.detail.value ?? '')
  )
}
</script>