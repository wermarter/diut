import '@casl/mongoose'

export enum TestCategoryAction {
  Create = 'create',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    TestCategory: true
  }
}
