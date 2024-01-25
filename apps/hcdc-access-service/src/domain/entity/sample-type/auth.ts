import '@casl/mongoose'

export enum SampleTypeAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    SampleType: true
  }
}
