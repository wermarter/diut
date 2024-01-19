import '@casl/mongoose'

export enum TestCategoryAction {
  Danger = 'Danger',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    TestCategory: true
  }
}
