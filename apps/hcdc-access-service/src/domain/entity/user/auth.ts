import '@casl/mongoose'

export enum UserAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
  ChangePassword = 'ChangePassword',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    User: true
  }
}
