import '@casl/mongoose'

export enum BioProductAction {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    BioProduct: true
  }
}
