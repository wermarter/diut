import '@casl/mongoose'

export enum PrintFormAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    PrintForm: true
  }
}
