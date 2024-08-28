import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  testIds: z.array(z.string()).nonempty('ít nhất 1 XN'),
  printFormId: z.string().min(1, 'chọn form in'),
  sampleTypeIds: z.array(z.string()),
  authorTitle: z.string(),
  authorName: z.string(),
})

export const formResolver = zodResolver(schema)
export type FormSchema = z.infer<typeof schema>

export const formDefaultValues: DefaultValues<FormSchema> = {
  authorName: '',
  authorTitle: '',
  printFormId: '',
  testIds: [],
  sampleTypeIds: [],
}
