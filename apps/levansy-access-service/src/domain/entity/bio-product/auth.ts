import '@casl/mongoose'

export enum BioProductAction {
  Manage = 'manage',
  Read = 'read',
  Update = 'update',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    BioProduct: true
  }
}
