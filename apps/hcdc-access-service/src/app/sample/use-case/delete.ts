import { AuthSubject, SampleAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'

import { assertPermission } from 'src/app/auth/common'
import {
  AUTH_CONTEXT_TOKEN,
  IAuthContext,
  ISampleRepository,
  IStorageBucket,
  IStorageService,
  SAMPLE_REPO_TOKEN,
  STORAGE_BUCKET_TOKEN,
  STORAGE_SERVICE_TOKEN,
  StorageBucket,
  StorageKeyFactory,
} from 'src/domain'
import { SampleAssertExistsUseCase } from './assert-exists'

@Injectable()
export class SampleDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(SAMPLE_REPO_TOKEN)
    private readonly sampleRepository: ISampleRepository,
    private readonly sampleAssertExistsUseCase: SampleAssertExistsUseCase,
    @Inject(STORAGE_SERVICE_TOKEN)
    private readonly storageService: IStorageService,
    @Inject(STORAGE_BUCKET_TOKEN)
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
