import { alertController } from '@ionic/vue'

export async function showAlert(
  header: string,
  message: string
) {
  const alert = await alertController.create({
    header,
    message,
    buttons: ['OK'],
  })

  await alert.present()
}