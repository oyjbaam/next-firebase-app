import * as z from 'zod'

export const MypageSettingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    data => {
      if (data.password && !data.newPassword) {
        return false
      }

      return true
    },
    { message: 'New password is required!', path: ['newPassword'] }
  )
  .refine(
    data => {
      if (data.newPassword && !data.password) {
        return false
      }
      return true
    },
    { message: 'password is required!', path: ['password'] }
  )
export type MypageSettingsInputsValues = z.infer<typeof MypageSettingsSchema>
