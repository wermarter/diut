export const STORAGE_BUCKET_TOKEN = Symbol('STORAGE_BUCKET_TOKEN')

export enum StorageBucket {
  APP = 'APP',
  PUBLIC = 'PUBLIC',
  SAMPLE_IMAGES = 'SAMPLE_IMAGES',
}

export interface IStorageBucket {
  get(key: StorageBucket): string
}

export const StorageKeyFactory = {
  [StorageBucket.PUBLIC]: {},
  [StorageBucket.APP]: {
    printFormTemplate(input: { templatePath: string }) {
      return `print-template/${input.templatePath}`
    },
  },
  [StorageBucket.SAMPLE_IMAGES]: {
    resultImage(input: { sampleId: string; elementId?: string }) {
      if (input.elementId === undefined) {
        return `${input.sampleId}`
      }

      return `${input.sampleId}/${input.elementId}/image`
    },
  },
} satisfies Record<
  StorageBucket,
  { [factoryFn: string]: (...args: unknown[]) => string }
>
