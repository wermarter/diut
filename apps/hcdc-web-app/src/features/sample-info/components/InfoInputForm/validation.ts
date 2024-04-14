import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PatientGender } from '@diut/hcdc'

export const GENDER_PREGNANT_VALUE = 'pregnant_value'

const schema = z.object({
  externalId: z.string(),
  name: z
    .string({ required_error: 'Không được để trống' })
    .min(2, 'Không được để trống'),
  gender: z.enum([
    PatientGender.Male,
    PatientGender.Female,
    GENDER_PREGNANT_VALUE,
  ]),

  birthYear: z.preprocess(
    (value) => parseInt(value as string, 10),
    z
      .number({ required_error: 'Không được để trống' })
      .gt(1900, 'Số quá nhỏ')
      .lte(new Date().getFullYear(), 'Số quá lớn'),
  ),
  address: z.string(),
  phoneNumber: z.string(),
  SSN: z.string(),

  patientTypeId: z.string(),
  diagnosisId: z.string(),
  originId: z.string(),
  doctorId: z.string(),

  sampleTypeIds: z.array(z.string()),
  testIds: z.array(z.string()),

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
  gender: PatientGender.Female,
  birthYear: 2000,
  address: '',
  phoneNumber: '',
  SSN: '',

  sampleTypeIds: [],
  testIds: [],

  sampleId: '',
  infoAt: new Date(),
  sampledAt: new Date(),

  isTraBuuDien: false,
  isNgoaiGio: false,
  note: '',
}
