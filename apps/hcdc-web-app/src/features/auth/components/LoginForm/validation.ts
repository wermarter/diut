import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  username: z.string().min(1, 'Không được để trống'),
  password: z.string().min(1, 'Không được để trống'),
})

export const formResolver = zodResolver(schema)

export type FormSchema = z.infer<typeof schema>

export const formDefaultValues: Partial<FormSchema> = {
  username: '',
  password: '',
}
