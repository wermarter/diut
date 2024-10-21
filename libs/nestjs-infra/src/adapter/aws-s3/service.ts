import {
  CompleteMultipartUploadCommand,
  CreateBucketCommand,
  CreateMultipartUploadCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadBucketCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  PutObjectCommand,
  S3Client,
  S3ClientConfigType,
  UploadPartCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { StringOrKeysOf } from '@diut/common'
import { Inject, Injectable } from '@nestjs/common'
import { Readable, Stream } from 'stream'

import { AbstractService } from '../abstract.service'
import { INSTANCE_ID_TOKEN, MODULE_OPTIONS_TOKEN } from './module-builder'

export type AwsS3ModuleOptions = S3ClientConfigType & {
  bucketName: string
}

export interface AwsS3Buckets {}
/**
  declare module '@diut/nestjs-infra' {
    interface AwsS3Buckets {
      ["bucket-name"]: true
    }
  }
 */

@Injectable()
export class AwsS3Service<
  TBucket extends string = StringOrKeysOf<AwsS3Buckets>,
> extends AbstractService {
  public client: S3Client

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: AwsS3ModuleOptions,
    @Inject(INSTANCE_ID_TOKEN)
    private readonly instanceId: string,
  ) {
    super({ instanceId })
  }

  async readyCheck() {
    await this.client.send(
      new HeadBucketCommand({ Bucket: this.options.bucketName }),
    )
  }

  async connect() {
    this.client = new S3Client(this.options)
  }

  close() {
    this.client.destroy()
  }

  async assertBucket(bucket: TBucket) {
    try {
      await this.client.send(new HeadBucketCommand({ Bucket: bucket }))
      return true
    } catch (e) {
      await this.client.send(new CreateBucketCommand({ Bucket: bucket }))
      return false
    }
  }

  async deleteKeysMatch(input: { prefix: string; bucket: TBucket }) {
    let deletedCount = 0

    for await (const object of this.listObjects(input)) {
      await this.deleteKey({ key: object.Key!, bucket: input.bucket })
      deletedCount++
    }

    return deletedCount
  }

  async *listObjects(input: {
    bucket: TBucket
    prefix?: string
    maxKeys?: number
  }) {
    let continuationToken: string | undefined = undefined

    do {
      const params: ListObjectsV2CommandInput = {
        Bucket: input.bucket,
        Prefix: input.prefix,
        MaxKeys: input.maxKeys,
        ContinuationToken: continuationToken,
      }

      const command = new ListObjectsV2Command(params)

      const response = await this.client.send(command)
      if (response.Contents) {
        for (const object of response.Contents) {
          yield object
        }
      }

      continuationToken = response.NextContinuationToken
    } while (continuationToken)
  }

  async deleteKey(input: { key: string; bucket: TBucket }) {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: input.bucket,
        Key: input.key,
      }),
    )
  }

  async upload(input: {
    bucket: TBucket
    key: string
    buffer: Buffer
    mimeType?: string
  }) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: input.bucket,
        Key: input.key,
        Body: input.buffer,
        ContentType: input.mimeType,
      }),
    )
  }

  async getPresignedUrl(input: {
    key: string
    bucket: TBucket
    expiresIn: number
  }) {
    return getSignedUrl(
      this.client,
      new PutObjectCommand({
        Bucket: input.bucket,
        Key: input.key,
      }),
      {
        expiresIn: input.expiresIn,
      },
    )
  }

  async createMultipartUpload(input: { key: string; bucket: TBucket }) {
    const { UploadId } = await this.client.send(
      new CreateMultipartUploadCommand({
        Bucket: input.bucket,
        Key: input.key,
      }),
    )

    return UploadId
  }

  async getMultipartPresignedUrls(input: {
    key: string
    bucket: TBucket
    expiresIn: number
    uploadId: string
    multipart: {
      totalSize: number
      chunkSize: number
    }
  }) {
    const numberOfParts = Math.ceil(
      input.multipart.totalSize / input.multipart.chunkSize,
    )

    const presignedUrls: string[] = []
    for (let i = 0; i < numberOfParts; i++) {
      const presignedUrl = await getSignedUrl(
        this.client,
        new UploadPartCommand({
          Bucket: input.bucket,
          Key: input.key,
          UploadId: input.uploadId,
          PartNumber: i + 1,
        }),
        {
          expiresIn: input.expiresIn,
        },
      )

      presignedUrls.push(presignedUrl)
    }

    return presignedUrls
  }

  async completeMultipartUpload(input: {
    key: string
    bucket: TBucket
    uploadId: string
    multiparts: {
      ETag: string
      partNo: number
    }[]
  }) {
    const completeMultipartUploadCommand = new CompleteMultipartUploadCommand({
      Key: input.key,
      Bucket: input.bucket,
      UploadId: input.uploadId,
      MultipartUpload: {
        Parts: input.multiparts.map((part) => {
          return { ETag: part.ETag, PartNumber: part.partNo }
        }),
      },
    })

    return this.client.send(completeMultipartUploadCommand)
  }

  async readToStream(input: { key: string; bucket: TBucket }) {
    const response = await this.client.send(
      new GetObjectCommand({
        Bucket: input.bucket,
        Key: input.key,
      }),
    )

    return {
      stream: response.Body as Readable,
      mimetype: response.ContentType,
      length: response.ContentLength,
    }
  }

  async readToBuffer(input: { key: string; bucket: TBucket }) {
    let mimeType: string | undefined

    const buffer = await new Promise<Buffer>((resolve, reject) => {
      const getObjectCommand = new GetObjectCommand({
        Bucket: input.bucket,
        Key: input.key,
      })

      this.client
        .send(getObjectCommand)
        .then((response) => {
          mimeType = response.ContentType

          const responseDataChunks: Buffer[] = []
          const responseStream = response.Body as Stream

          responseStream.once('error', (err) => reject(err))
          responseStream.on('data', (chunk) => responseDataChunks.push(chunk))
          responseStream.once('end', () =>
            resolve(Buffer.concat(responseDataChunks)),
          )
        })
        .catch((err) => {
          reject(err)
        })
    })

    return { buffer, mimeType }
  }
  async deleteByKey(input: { key: string; bucket: TBucket }) {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: input.bucket,
        Key: input.key,
      }),
    )
  }

  async checkIfKeyExists(input: {
    bucketName: string
    key: string
  }): Promise<boolean> {
    try {
      const command = new HeadObjectCommand({
        Bucket: input.bucketName,
        Key: input.key,
      })
      await this.client.send(command)

      return true
    } catch (error) {
      if (error.name === 'NotFound') {
        return false
      }

      throw error
    }
  }
}
