<template>
  <ion-searchbar
    :model-value="modelValue"
    :placeholder="placeholder"
    :debounce="debounce"
    show-clear-button="focus"
    @ionInput="onInput"
  />
</template>

<script setup lang="ts">
import { IonSearchbar } from '@ionic/vue'
import type { SearchbarCustomEvent } from '@ionic/core'

interface Props {
  modelValue: string
  placeholder?: string
  debounce?: number
}

withDefaults(defineProps<Props>(), {
  placeholder: 'Search...',
  debounce: 500,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search', value: string): void
}>()

const onInput = (event: SearchbarCustomEvent) => {
  const value = event.detail.value ?? ''

  emit('update:modelValue', value)
  emit('search', value)
}
</script>