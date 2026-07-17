<template>
  <ion-button
    :type="type"
    :expand="expand"
    :fill="fill"
    :color="color"
    :disabled="disabled || loading"
  >
    <ion-spinner
      v-if="loading"
      slot="start"
      name="crescent"
    />

    {{ text }}
  </ion-button>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonSpinner,
} from '@ionic/vue'

interface Props {
  text: string
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit'
  expand?: 'block' | 'full'
  fill?: 'solid' | 'outline' | 'clear'
  color?: string
}

withDefaults(defineProps<Props>(), {
  loading: false,
  disabled: false,
  type: 'button',
  expand: 'block',
  fill: 'solid',
  color: 'primary',
})
</script>