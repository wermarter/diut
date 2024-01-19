import '@casl/mongoose'

export enum BranchAction {
  Manage = 'Manage',
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    Branch: true
  }
}
