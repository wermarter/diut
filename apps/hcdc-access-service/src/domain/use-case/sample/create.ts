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
import { TestSearchUseCase } from '../test/search'
import { TestElementSearchUseCase } from '../test-element/search'
import { PatientGetCategoryUseCase } from '../patient/get-category'
import { EEntitySampleIdAlreadyExists } from 'src/domain/exception'

@Injectable()
export class SampleCreateUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(SampleRepositoryToken)
    private readonly sampleRepository: ISampleRepository,
    private readonly sampleValidateUseCase: SampleValidateUseCase,
    private readonly testSearchUseCase: TestSearchUseCase,
    private readonly testElementSearchUseCase: TestElementSearchUseCase,
    private readonly patientGetCategoryUseCase: PatientGetCategoryUseCase,
  ) {}

  async execute(input: EntityData<SampleInfo>) {
    const { ability, user } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Sample, SampleAction.Create, input)

    const existed = await this.sampleRepository.exists({
      sampleId: input.sampleId,
    })
    if (existed === true) {
      throw new EEntitySampleIdAlreadyExists('cannot create duplicate samples')
    }

    const tests = (
      await this.testSearchUseCase.execute({
        filter: { _id: { $in: input.testIds } },
        populates: [{ path: 'bioProduct' }, { path: 'instrument' }],
      })
    ).items

    const testElements = await Promise.all(
      tests.map((test) =>
        this.testElementSearchUseCase
          .execute({
            filter: { testId: test._id },
            projection: { _id: 1, normalRules: 1 },
          })
          .then((data) => data.items),
      ),
    )

    const patientCategory = await this.patientGetCategoryUseCase.execute({
      patientId: input.patientId,
    })

    const entityData = {
      ...input,
      results: tests.map((test, index) => ({
        testId: test._id,
        isLocked: false,
        bioProductName: test.bioProduct?.name,
        instrumentName: test.instrument?.name,
        elements: testElements[index].map((element) => ({
          testElementId: element._id,
          value: '',
          isAbnormal:
            element.normalRules.find(
              ({ category }) => category === patientCategory,
            )?.defaultChecked ?? false,
        })),
      })),
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
