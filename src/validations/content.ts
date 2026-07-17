import * as yup from 'yup'

export const contentSchema = yup.object({

  title: yup
    .string()
    .required(),

  description: yup
    .string()
    .required(),

})