import { Inject, Injectable } from '@nestjs/common'
import { SampleAction, AuthSubject } from '@diut/hcdc'

import {
  AuthContextToken,
  SampleRepositoryToken,
  IAuthContext,
  ISampleRepository,
  assertPermission,
  StorageServiceToken,
  StorageBucketToken,
  IStorageService,
  IStorageBucket,
  StorageBucket,
  StorageKeyFactory,
} from 'src/domain'
import { SampleAssertExistsUseCase } from './assert-exists'

@Injectable()
export class SampleDeleteUseCase {
  constructor(
    @Inject(AuthContextToken)
    private readonly authContext: IAuthContext,
    @Inject(SampleRepositoryToken)
    private readonly sampleRepository: ISampleRepository,
    private readonly sampleAssertExistsUseCase: SampleAssertExistsUseCase,
    @Inject(StorageServiceToken)
    private readonly storageService: IStorageService,
    @Inject(StorageBucketToken)
    private readonly storageBucket: IStorageBucket,
  ) {}

  async execute(input: { id: string }) {
    const entity = await this.sampleAssertExistsUseCase.execute({
      _id: input.id,
    })
    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Sample, SampleAction.Delete, entity)

    await this.storageService.deleteKeys({
      bucket: this.storageBucket.get(StorageBucket.SAMPLE_IMAGES),
      prefix: StorageKeyFactory[StorageBucket.SAMPLE_IMAGES].resultImage({
        sampleId: input.id,
      }),
    })
    await this.sampleRepository.deleteById(input.id)

    return entity
  }
}
