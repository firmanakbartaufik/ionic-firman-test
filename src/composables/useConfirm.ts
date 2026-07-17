import { alertController } from '@ionic/vue'

export async function showConfirm(
  message: string
): Promise<boolean> {

  return new Promise(async (resolve) => {

    const alert = await alertController.create({

      header: 'Confirmation',

      message,

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => resolve(false),
        },
        {
          text: 'OK',
          handler: () => resolve(true),
        },
      ],
    })

    await alert.present()

  })
}