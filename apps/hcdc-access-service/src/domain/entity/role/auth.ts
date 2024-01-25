import '@casl/mongoose'

export enum RoleAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
  AssignToUser = 'AssignToUser',
  AssignUserInline = 'AssignUserInline',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    Role: true
  }
}
