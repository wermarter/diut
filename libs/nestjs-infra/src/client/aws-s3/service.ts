import {
  CreateBucketCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadBucketCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  ListObjectsV2CommandOutput,
  PutObjectCommand,
  S3Client,
  S3ClientConfigType,
  S3ServiceException,
} from '@aws-sdk/client-s3'
import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner'
import { formatUrl } from '@aws-sdk/util-format-url'
import { StringOrKeysOf } from '@diut/common'
import { Inject, Injectable } from '@nestjs/common'
import { Hash } from '@smithy/hash-node'
import { HttpRequest } from '@smithy/protocol-http'
import { parseUrl } from '@smithy/url-parser'
import { Readable, Stream } from 'stream'

import { AbstractClientService } from '../abstract-service'
import {
  CONNECTION_ID_TOKEN,
  DEFAULT_CONNECTION_ID,
  MODULE_OPTIONS_TOKEN,
} from './module-builder'

export type AwsS3ClientOptions = S3ClientConfigType & {}

export interface AwsS3Buckets {}
/**
  declare module '@diut/nestjs-infra' {
    interface AwsS3Buckets {
      ["bucket-name"]: true
    }
  }
 */

@Injectable()
export class AwsS3ClientService<
  TBucket extends string = StringOrKeysOf<AwsS3Buckets>,
> extends AbstractClientService {
  private client: S3Client

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly clientOptions: AwsS3ClientOptions,
    @Inject(CONNECTION_ID_TOKEN)
    connectionId?: string,
  ) {
    connectionId = connectionId ?? DEFAULT_CONNECTION_ID

    super({ connectionId })
  }

  async readyCheck() {
    try {
      await this.client.send(new HeadBucketCommand({ Bucket: 'bucket-name' }))
    } catch (e) {
      if (!(e instanceof S3ServiceException)) {
        throw e
      }
    }
  }

  async connect() {
    this.client = new S3Client(this.clientOptions)
    await this.readyCheck()
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

  async deleteKeys(input: { prefix: string; bucket: TBucket }) {
    const response = await this.client.send(
      new ListObjectsV2Command({
        Bucket: input.bucket,
        Prefix: input.prefix,
      }),
    )

    const keys = response.Contents?.map((item) => item.Key!)
    if (!keys) {
      return 0
    }

    for (const key of keys) {
      await this.deleteKey({ key, bucket: input.bucket })
    }

    return keys.length
  }

  async *listKeysIterator(input: {
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
      let response: ListObjectsV2CommandOutput

      response = await this.client.send(command)
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

  async getPresignedUrl(input: { key: string }) {
    const credentials = this.clientOptions.credentials
    const region = this.clientOptions.region
    if (!credentials || !region) {
      throw new Error('Missing credentials or region required for signing URL')
    }

    const s3ObjectUrl = parseUrl(
      `https://${process.env.S3_BUCKET}.s3.${region}.amazonaws.com/${input.key}`,
    )

    const presigner = new S3RequestPresigner({
      credentials,
      region,
      sha256: Hash.bind(null, 'sha256'),
    })

    const url = await presigner.presign(new HttpRequest(s3ObjectUrl))

    return formatUrl(url)
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

          // Store all of data chunks returned from the response data stream
          // into an array then use Array#join() to use the returned contents as a String
          const responseDataChunks: any[] = []
          const responseStream = response.Body as Stream

          // Handle an error while streaming the response body
          responseStream.once('error', (err) => reject(err))

          // Attach a 'data' listener to add the chunks of data to our array
          // Each chunk is a Buffer instance
          responseStream.on('data', (chunk) => responseDataChunks.push(chunk))

          // Once the stream has no more data, join the chunks into a Buffer
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
}
