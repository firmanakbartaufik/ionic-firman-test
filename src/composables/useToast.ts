import { toastController } from '@ionic/vue'

export async function showToast(
  message: string,
  color = 'success'
) {
  const toast = await toastController.create({
    message,
    duration: 2000,
    color,
    position: 'top',
  })

  await toast.present()
}