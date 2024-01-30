import { Inject, Injectable } from '@nestjs/common'

import {
  AuthContextToken,
  SampleRepositoryToken,
  IAuthContext,
  ISampleRepository,
} from 'src/domain/interface'
import { Sample, SampleAction, EntityData, SampleInfo } from 'src/domain/entity'
import { AuthSubject, assertPermission } from 'src/domain/auth'
import { SampleValidateUseCase } from './validate'
import { PatientGetCategoryUseCase } from '../patient/get-category'
import { EEntitySampleIdAlreadyExists } from 'src/domain/exception'
import { SampleInitResultUseCase } from './init-result'

@Injectable()
export class SampleCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(SampleRepositoryToken)
    private readonly sampleRepository: ISampleRepository,
    private readonly sampleValidateUseCase: SampleValidateUseCase,
    private readonly sampleInitResultUseCase: SampleInitResultUseCase,
    private readonly patientGetCategoryUseCase: PatientGetCategoryUseCase,
  ) {}

  async execute(
    input: EntityData<SampleInfo> & {
      testIds: string[]
    },
  ) {
    const { ability, user } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Sample, SampleAction.Create, input)

    const existed = await this.sampleRepository.exists({
      sampleId: input.sampleId,
    })
    if (existed === true) {
      throw new EEntitySampleIdAlreadyExists('cannot create duplicate samples')
    }

    const patientCategory = await this.patientGetCategoryUseCase.execute({
      patientId: input.patientId,
    })
    const entityData = {
      ...input,
      results: await this.sampleInitResultUseCase.execute({
        testIds: input.testIds,
        patientCategory,
      }),
    } satisfies Partial<EntityData<Sample>>

    await this.sampleValidateUseCase.execute(entityData)

    const entity = await this.sampleRepository.create({
      ...entityData,
      isConfirmed: false,
      sampleCompleted: false,
      infoById: user._id,
    })

    return entity
  }
}
