import '@casl/mongoose'

export enum TestCategoryAction {
  Create = 'Create',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    TestCategory: true
  }
}
