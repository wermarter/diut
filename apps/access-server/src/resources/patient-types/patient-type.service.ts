import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseMongoService } from 'src/clients/mongo'
import { PatientType } from './patient-type.schema'

@Injectable()
export class PatientTypeService
  extends BaseMongoService<PatientType>
  implements OnModuleInit
{
  constructor(@InjectModel(PatientType.name) model: Model<PatientType>) {
    super(model, new Logger(PatientTypeService.name))
  }
  async onModuleInit() {
    // this.logger.debug({ intent: 'database seeding' }, 'seeding 3 patient types')
    // await this.model.deleteMany()
    // await this.create({
    //   name: 'Dịch vụ',
    // })
    // await this.create({ name: ' })
    // await this.create({ name: 'inazuma' })
  }
}
