export const MinioConfigToken = Symbol('MinioConfig')

export interface IMinioConfig {
  MINIO_SAMPLE_IMAGES_BUCKET: string

  MINIO_PUBLIC_BUCKET: string
}
