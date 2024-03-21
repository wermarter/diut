export const StorageBucketToken = Symbol('StorageBucketToken')

export enum StorageBucket {
  APP = 'APP',
  PUBLIC = 'PUBLIC',
  SAMPLE_IMAGES = 'SAMPLE_IMAGES',
}

export interface IStorageBucket {
  get(key: StorageBucket): string
}

export const BucketKeyFactory = {
  [StorageBucket.PUBLIC]: {},
  [StorageBucket.APP]: {
    printFormTemplate(input: { templatePath: string }) {
      return `print-form-template/${input.templatePath}`
    },
  },
  [StorageBucket.SAMPLE_IMAGES]: {
    resultImage(input: { sampleId: string; elementId: string }) {
      return `${input.sampleId}/${input.elementId}/image`
    },
  },
} satisfies Record<
  StorageBucket,
  { [factoryFn: string]: (...args: unknown[]) => string }
>
