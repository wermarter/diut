import { ClassConstructor } from 'class-transformer'
import { ISamplePrintStrategy } from './common'
import { SamplePrintFormChungStrategy } from './form-chung'
import { SamplePrintFormHIVStrategy } from './form-hiv'
import { SamplePrintFormHIV2Strategy } from './form-hiv2'
import { SamplePrintFormPapStrategy } from './form-pap'
import { SamplePrintFormSoiNhuomStrategy } from './form-soi-nhuom'
import { SamplePrintFormTDStrategy } from './form-td'
import { SamplePrintFormThinprepStrategy } from './form-thinprep'

export const printFormStrategies = [
  SamplePrintFormHIVStrategy,
  SamplePrintFormHIV2Strategy,
  SamplePrintFormChungStrategy,
  SamplePrintFormSoiNhuomStrategy,
  SamplePrintFormTDStrategy,
  SamplePrintFormPapStrategy,
  SamplePrintFormThinprepStrategy,
] satisfies ClassConstructor<ISamplePrintStrategy>[]
