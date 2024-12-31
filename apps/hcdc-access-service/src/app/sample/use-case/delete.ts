import { AuthSubject, Sample, SampleAction } from '@diut/hcdc'
import { Inject, Injectable } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
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
import { SampleSearchUseCase } from './search'

@Injectable()
export class SampleDeleteUseCase {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    @Inject(SAMPLE_REPO_TOKEN)
    private readonly sampleRepository: ISampleRepository,
    private readonly sampleSearchUseCase: SampleSearchUseCase,
    @Inject(STORAGE_SERVICE_TOKEN)
    private readonly storageService: IStorageService,
    @Inject(STORAGE_BUCKET_TOKEN)
    private readonly storageBucket: IStorageBucket,
  ) {}

  async execute(input: FilterQuery<Sample>) {
    const { ability } = this.authContext.getData()
    const { items: samples } = await this.sampleSearchUseCase.execute({
      filter: input,
    })

    for (const sample of samples) {
      assertPermission(ability, AuthSubject.Sample, SampleAction.Delete, sample)

      await this.storageService.deleteKeysMatch({
        bucket: this.storageBucket.get(StorageBucket.SAMPLE_IMAGES),
        prefix: StorageKeyFactory[StorageBucket.SAMPLE_IMAGES].resultImage({
          sampleId: sample._id,
        }),
      })
      await this.sampleRepository.deleteById(sample._id)
    }
  }
}
