import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { MongoRepository } from '@diut/server-core'
import { SampleService } from '../samples/sample.service'
import { Patient } from './patient.schema'

@Injectable()
export class PatientService extends MongoRepository<Patient> {
  constructor(
    @InjectModel(Patient.name) model: Model<Patient>,
    @Inject(forwardRef(() => SampleService))
    private readonly sampleService: SampleService,
  ) {
    super(model)
  }

  public async deleteById(id: string) {
    await this.sampleService.deleteMany({
      patientId: id,
    })

    return super.deleteById(id)
  }
}
