import { Inject, Injectable } from '@nestjs/common'
import { SampleAction, AuthSubject } from '@diut/hcdc'

import {
  AUTH_CONTEXT_TOKEN,
  SAMPLE_REPO_TOKEN,
  IAuthContext,
  ISampleRepository,
  STORAGE_SERVICE_TOKEN,
  STORAGE_BUCKET_TOKEN,
  IStorageService,
  IStorageBucket,
  StorageBucket,
  StorageKeyFactory,
} from 'src/domain'
import { SampleAssertExistsUseCase } from './assert-exists'
import { assertPermission } from 'src/app/auth/common'

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
