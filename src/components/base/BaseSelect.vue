<template>
  <ion-searchbar
    v-model="keyword"
    :placeholder="placeholder"
    :debounce="debounce"
    show-clear-button="focus"
    @ionInput="onSearch"
    @keyup.enter="submit"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IonSearchbar } from '@ionic/vue'

interface Props {
  modelValue?: string
  placeholder?: string
  debounce?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Cari...',
  debounce: 500,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search', value: string): void
}>()

const keyword = computed({
  get: () => props.modelValue ?? '',
  set: (value: string) => {
    emit('update:modelValue', value)
  },
})

const onSearch = (event: CustomEvent) => {
  emit(
    'search',
    String(event.detail.value ?? '')
  )
}

const submit = () => {
  emit('search', keyword.value)
}
</script>