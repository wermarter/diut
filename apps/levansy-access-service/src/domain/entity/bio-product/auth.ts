import '@casl/mongoose'

export enum BioProductAction {
  Manage = 'manage',
  Read = 'read',
  Delete = 'delete',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    BioProduct: true
  }
}
