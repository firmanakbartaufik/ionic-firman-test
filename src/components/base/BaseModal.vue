<template>
  <ion-modal
    :is-open="isOpen"
    @didDismiss="$emit('close')"
  >
    <ion-header>
      <ion-toolbar>
        <ion-title>
          {{ title }}
        </ion-title>

        <ion-buttons slot="end">
          <ion-button @click="$emit('close')">
            Close
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <slot />
    </ion-content>
  </ion-modal>
</template>

<script setup lang="ts">
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
} from '@ionic/vue'

defineProps<{
  isOpen: boolean
  title: string
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>