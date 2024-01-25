import '@casl/mongoose'

export enum TestCategoryAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    TestCategory: true
  }
}
