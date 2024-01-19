import '@casl/mongoose'

export enum RoleAction {
  Manage = 'Manage',
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    Role: true
  }
}
