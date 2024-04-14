import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z
  .object({
    password: z.string().min(1, 'Không được để trống'),
    confirmPassword: z.string().min(1, 'Không được để trống'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword'],
      })
    }
  })

export const formResolver = zodResolver(schema)

export type FormSchema = z.infer<typeof schema>

export const formDefaultValues: Partial<FormSchema> = {
  password: '',
  confirmPassword: '',
}
