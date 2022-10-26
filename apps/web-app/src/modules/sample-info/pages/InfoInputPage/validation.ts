import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Gender } from '@diut/common'

const schema = z.object({
  externalId: z.string().optional(),
  name: z.string().min(1, 'Không được để trống'),
  gender: z.number(),
  birthYear: z.number().nonnegative('Năm sinh không hợp lệ'),
  address: z.string().min(1, 'Không được để trống'),
  phoneNumber: z.string().optional(),
  SSN: z.string().optional(),

  patientTypeId: z.string({ required_error: 'Không được để trống' }),
  indicationId: z.string({ required_error: 'Không được để trống' }),
  doctorId: z.string({ required_error: 'Không được để trống' }),
  sampleTypeIds: z.array(z.string()).nonempty('Phải chọn một loại mẫu'),
  testIds: z
    .array(z.object({ id: z.string(), bioProductName: z.string().optional() }))
    .nonempty('Phải chọn một xét nghiệm'),

  sampleId: z.string({ required_error: 'Không được để trống' }),
  sampledAt: z.date({ required_error: 'Không được để trống' }),
  infoAt: z.date({ required_error: 'Không được để trống' }),
})

export const formResolver = zodResolver(schema)

export type FormSchema = z.infer<typeof schema>

export const formDefaultValues: Partial<FormSchema> = {
  gender: Gender.Male,
  address: 'QUẬN 1 - HCM',
}
