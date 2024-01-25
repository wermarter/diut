import '@casl/mongoose'

export enum InstrumentAction {
  Create = 'Create',
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

declare module '@casl/mongoose' {
  interface RecordTypes {
    Instrument: true
  }
}
