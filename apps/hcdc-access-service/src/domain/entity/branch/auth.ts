import '@casl/mongoose'

export enum BranchAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
  AssignToSubject = 'AssignToSubject',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    Branch: true
  }
}
