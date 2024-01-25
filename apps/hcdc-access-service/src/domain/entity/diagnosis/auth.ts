import '@casl/mongoose'

export enum DiagnosisAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    Diagnosis: true
  }
}
