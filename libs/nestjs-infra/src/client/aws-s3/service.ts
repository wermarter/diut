import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ClientConfigType,
} from '@aws-sdk/client-s3'
import { Inject, Injectable } from '@nestjs/common'
import { Readable, Stream } from 'stream'
import { parseUrl } from '@smithy/url-parser'
import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner'
import { Hash } from '@smithy/hash-node'
import { HttpRequest } from '@smithy/protocol-http'
import { formatUrl } from '@aws-sdk/util-format-url'

import { AbstractClientService } from '../service'
import { MODULE_OPTIONS_TOKEN } from './module-builder'

export type AwsS3ClientOptions = S3ClientConfigType & {
  connectionId?: string
}

@Injectable()
export class AwsS3ClientService<
  TBuckets extends string = string,
> extends AbstractClientService {
  private client: S3Client

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly clientOptions: AwsS3ClientOptions,
  ) {
    super({
      name: AwsS3ClientService.name,
      connectionId: clientOptions.connectionId,
    })
  }

  initialize() {
    this.client = new S3Client(this.clientOptions)
  }

  terminate() {
    this.client.destroy()
  }

  async upload(input: { bucket: string; key: string; buffer: Buffer }) {
    await this.client.send(
      new PutObjectCommand({
        Bucket: input.bucket,
        Key: input.key,
        Body: input.buffer,
      }),
    )
  }

  async getPresignedUrl(key: string) {
    const credentials = this.clientOptions.credentials
    const region = this.clientOptions.region
    if (!credentials || !region) {
      throw new Error('Missing credentials or region required for signing URL')
    }

    const s3ObjectUrl = parseUrl(
      `https://${process.env.S3_BUCKET}.s3.${region}.amazonaws.com/${key}`,
    )

    const presigner = new S3RequestPresigner({
      credentials,
      region,
      sha256: Hash.bind(null, 'sha256'),
    })

    const url = await presigner.presign(new HttpRequest(s3ObjectUrl))

    return formatUrl(url)
  }

  async readToStream(input: { key: string; bucket: string }) {
    const response = await this.client.send(
      new GetObjectCommand({
        Bucket: input.bucket,
        Key: input.key,
      }),
    )

    return response.Body as Readable
  }

  async readToBuffer(key: string, bucket: string) {
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      const getObjectCommand = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      })

      this.client
        .send(getObjectCommand)
        .then((response) => {
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

    return buffer
  }

  async deleteByKey(input: { key: string; bucket: string }) {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: input.bucket,
        Key: input.key,
      }),
    )
  }
}
