import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseMongoService } from 'src/clients/mongo'
import { SampleService } from '../samples/sample.service'
import { Patient } from './patient.schema'

@Injectable()
export class PatientService extends BaseMongoService<Patient> {
  constructor(
    @InjectModel(Patient.name) model: Model<Patient>,
    @Inject(forwardRef(() => SampleService))
    private readonly sampleService: SampleService
  ) {
    super(model, new Logger(PatientService.name))
  }

  public async deleteById(id: string) {
    await this.sampleService.deleteMany({
      patientId: id,
    })

    return super.deleteById(id)
  }
}
