import '@casl/mongoose'

export enum PrintFormAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
  OverrideAuthor = 'OverrideAuthor',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    PrintForm: true
  }
}
