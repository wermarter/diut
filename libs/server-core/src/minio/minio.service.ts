import { Injectable } from '@nestjs/common'
import { Client } from 'minio'
import { MinioService as NestMinioService } from 'nestjs-minio-client'

@Injectable()
export class MinioService {
  constructor(private readonly minio: NestMinioService) {}

  public get client(): Client {
    return this.minio.client
  }
}
