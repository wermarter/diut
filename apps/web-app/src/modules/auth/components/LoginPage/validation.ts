import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  username: z.string().min(1, 'Không được để trống'),
  password: z.string().min(1, 'Không được để trống'),
})

export const formResolver = zodResolver(schema)

export type FormSchema = z.infer<typeof schema>

export const formDefaultValues: FormSchema = {
  username: '',
  password: '',
}
