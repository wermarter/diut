import { Inject, Injectable } from '@nestjs/common'
import {
  Sample,
  SampleAction,
  AuthSubject,
  SampleInfo,
  EntityData,
} from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  SAMPLE_REPO_TOKEN,
  IAuthContext,
  ISampleRepository,
  EEntitySampleIdAlreadyExists,
} from 'src/domain'
import { SampleValidateUseCase } from './validate'
import { PatientGetCategoryUseCase } from 'src/app/patient/use-case/get-category'
import { SampleInitResultUseCase } from './init-result'
import { assertPermission } from 'src/app/auth/common'

@Injectable()
export class SampleCreateUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(SAMPLE_REPO_TOKEN)
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
    const { ability, user } = this.authContext.getDataInternal()
    assertPermission(ability, AuthSubject.Sample, SampleAction.Create, input)

    const existed = await this.sampleRepository.exists({
      sampleId: input.sampleId,
    })
    if (existed === true) {
      throw new EEntitySampleIdAlreadyExists(input.sampleId)
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
