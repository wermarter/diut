import '@casl/mongoose'

export enum BioProductAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    BioProduct: true
  }
}
