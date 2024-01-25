import '@casl/mongoose'

export enum PatientTypeAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    PatientType: true
  }
}
