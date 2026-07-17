<template>
  <ion-item>
    <ion-toggle
      :checked="modelValue"
      @ionChange="onChange"
    />

    <ion-label class="ion-margin-start">
      {{ label }}
    </ion-label>
  </ion-item>
</template>

<script setup lang="ts">
import {
  IonItem,
  IonToggle,
  IonLabel,
} from '@ionic/vue'

interface Props {
  modelValue: boolean
  label: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const onChange = (event: CustomEvent) => {
  emit(
    'update:modelValue',
    event.detail.checked
  )
}
</script>