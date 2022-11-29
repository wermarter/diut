import { Injectable, Logger } from '@nestjs/common'
import { MinioService } from 'nestjs-minio-client'

@Injectable()
export class StorageService {
  private readonly logger: Logger

  constructor(private readonly minio: MinioService) {
    this.logger = new Logger(StorageService.name)
  }

  public get client() {
    return this.minio.client
  }
}
