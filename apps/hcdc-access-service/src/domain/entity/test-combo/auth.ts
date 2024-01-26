import '@casl/mongoose'

export enum TestComboAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    TestCombo: true
  }
}
