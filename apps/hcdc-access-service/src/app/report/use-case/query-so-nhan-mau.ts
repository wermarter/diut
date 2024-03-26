import { accessibleBy } from '@casl/mongoose'
import { SampleAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { TestSearchUseCase } from 'src/app/test'
import {
  AuthContextToken,
  IAuthContext,
  ISampleRepository,
  SampleRepositoryToken,
} from 'src/domain'
import { COLLECTION } from 'src/infra'
import { PatientSchema } from 'src/infra/mongo/patient'
import { SampleSchema } from 'src/infra/mongo/sample'

@Injectable()
export class ReportQuerySoNhanMauUseCase {
  constructor(
    @Inject(SampleRepositoryToken)
    private readonly sampleRepository: ISampleRepository,
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    private readonly testSearchUseCase: TestSearchUseCase,
  ) {}

  async execute(input: {
    offset?: number
    limit?: number
    fromDate: Date
    toDate: Date
    branchId: string
    isNgoaiGio?: boolean
    patientTypeId?: string
    originId?: string
  }) {
    const { ability } = this.authContext.getData()
    const { items: tests } = await this.testSearchUseCase.execute({
      filter: {
        branchId: input.branchId,
      },
      projection: { _id: 1 },
    })

    const [{ total, isTraBuuDien, isNgoaiGio, items, ...restTest }] =
      await this.sampleRepository.aggregateIgnoreSoftDelete(
        [
          {
            $sort: { infoAt: -1, sampleId: -1 } satisfies Partial<
              Record<keyof SampleSchema, -1>
            >,
          },
          {
            $match: {
              $and: [
                {
                  isDeleted: false,
                  infoAt: {
                    $gte: new Date(input.fromDate),
                    $lte: new Date(input.toDate),
                  },
                  branchId: input.branchId,
                  ...(input.patientTypeId !== undefined && {
                    patientTypeId: input.patientTypeId,
                  }),
                  ...(input.originId !== undefined && {
                    originId: input.originId,
                  }),
                  ...(input.isNgoaiGio !== undefined && {
                    isNgoaiGio: input.isNgoaiGio,
                  }),
                } satisfies Partial<Record<keyof SampleSchema, unknown>>,
                accessibleBy(ability, SampleAction.Read).Sample,
              ],
            },
          },
          {
            $facet: {
              total: [
                {
                  $count: 'count',
                },
              ],
              isTraBuuDien: [
                {
                  $match: {
                    isTraBuuDien: true,
                  },
                },
                {
                  $count: 'count',
                },
              ],
              isNgoaiGio: [
                {
                  $match: {
                    isNgoaiGio: true,
                  },
                },
                {
                  $count: 'count',
                },
              ],
              items: [
                ...(input.offset !== undefined && input.limit !== undefined
                  ? [
                      {
                        $skip: input.offset * input.limit,
                      },
                      {
                        $limit: input.limit,
                      },
                    ]
                  : []),
                {
                  $lookup: {
                    from: COLLECTION.PATIENT,
                    let: {
                      patientId: {
                        $toObjectId:
                          '$patientId' satisfies `$${keyof SampleSchema}`,
                      },
                    },
                    as: 'patient',
                    pipeline: [
                      {
                        $match: {
                          $expr: { $eq: ['$_id', '$$patientId'] },
                        },
                      },
                      {
                        $project: {
                          name: 1,
                          birthYear: 1,
                          gender: 1,
                          address: 1,
                          phoneNumber: 1,
                        } satisfies Partial<Record<keyof PatientSchema, 1>>,
                      },
                    ],
                  },
                },
                {
                  $project: {
                    infoAt: 1,
                    sampleId: 1,
                    patientTypeId: 1,
                    results: {
                      testId: 1,
                    } satisfies Partial<
                      Record<keyof SampleSchema['results'][number], unknown>
                    >,
                    isTraBuuDien: 1,
                    isNgoaiGio: 1,
                    patient: { $first: '$patient' },
                  } satisfies Partial<Record<keyof SampleSchema, unknown>>,
                },
              ],
              ...Object.fromEntries(
                tests.map(({ _id }) => {
                  return [
                    _id,
                    [
                      {
                        $match: {
                          results: { $elemMatch: { testId: _id } },
                        },
                      },
                      {
                        $count: 'count',
                      },
                    ],
                  ]
                }),
              ),
            },
          },
        ],
        false,
      )

    const test = {}
    Object.entries(restTest).forEach(([key, value]) => {
      // @ts-ignore
      if (value[0]?.count) test[key] = value[0].count
    })

    return {
      total: total[0]?.count,
      offset: input.offset,
      limit: input.limit,
      items,
      summary: {
        test,
        isTraBuuDien: isTraBuuDien[0]?.count,
        isNgoaiGio: isNgoaiGio[0]?.count,
      },
    }
  }
}
