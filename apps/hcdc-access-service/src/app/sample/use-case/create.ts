import {
  AuthSubject,
  EntityData,
  Sample,
  SampleAction,
  SampleInfo,
} from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { assertPermission } from 'src/app/auth/common'
import { PatientGetCategoryUseCase } from 'src/app/patient/use-case/get-category'
import {
  AUTH_CONTEXT_TOKEN,
  EEntitySampleIdAlreadyExists,
  IAuthContext,
  ISampleRepository,
  SAMPLE_REPO_TOKEN,
} from 'src/domain'
import { SampleInitResultUseCase } from './init-result'
import { SampleValidateUseCase } from './validate'

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
