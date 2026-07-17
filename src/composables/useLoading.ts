import { loadingController } from '@ionic/vue'

let loading: HTMLIonLoadingElement

export async function openLoading(
  message = 'Loading...'
) {
  loading = await loadingController.create({
    message,
  })

  await loading.present()
}

export async function closeLoading() {
  if (loading) {
    await loading.dismiss()
  }
}