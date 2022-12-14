import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Gender } from '@diut/common'

const schema = z.object({
  externalId: z.string().optional(),
  name: z
    .string({ required_error: 'Không được để trống' })
    .min(2, 'Không được để trống'),
  gender: z.preprocess(
    (value) => parseInt(value as string, 10),
    z.nativeEnum(Gender)
  ),

  birthYear: z.preprocess(
    (value) => parseInt(value as string, 10),
    z
      .number({ required_error: 'Không được để trống' })
      .gt(1900, 'Năm sinh quá nhỏ')
      .lte(new Date().getFullYear(), 'Năm sinh quá lớn')
  ),
  address: z.string().min(1, 'Không được để trống'),
  phoneNumber: z.string().optional(),
  SSN: z.string().optional(),

  patientTypeId: z.string(),
  indicationId: z.string(),
  doctorId: z.string(),

  sampleTypeIds: z.array(z.string()).nonempty('Phải chọn một loại mẫu'),
  tests: z.array(
    z.object({
      id: z.string(),
      bioProductName: z.string().nullable().optional(),
    })
  ),

  sampleId: z.string().length(10, 'Phải đúng 10 kí tự'),
  sampledAt: z.date({ invalid_type_error: 'Không được để trống' }),
  infoAt: z.date({ invalid_type_error: 'Không được để trống' }),

  isTraBuuDien: z.boolean(),
  isNgoaiGio: z.boolean(),
  note: z.string().optional(),
})

export const formResolver = zodResolver(schema)

export type FormSchema = z.infer<typeof schema>

export const formDefaultValues: Partial<FormSchema> = {
  externalId: '',
  name: '',
  gender: Gender.Female,
  birthYear: 1900,
  address: '',
  phoneNumber: '',
  SSN: '',

  patientTypeId: '',
  indicationId: '',
  doctorId: '',
  sampleTypeIds: [] as any,
  tests: [] as any,

  sampleId: '',
  infoAt: new Date(),
  sampledAt: new Date(),

  isTraBuuDien: false,
  isNgoaiGio: false,
  note: '',
}
