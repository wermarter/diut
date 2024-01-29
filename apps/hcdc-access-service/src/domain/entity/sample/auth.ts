import '@casl/mongoose'

export enum SampleAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  UpdateInfo = 'UpdateInfo',
  UpdateResult = 'UpdateResult',
  Delete = 'Delete',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    Sample: true
  }
}
