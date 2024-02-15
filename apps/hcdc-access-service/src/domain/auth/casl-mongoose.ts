import '@casl/mongoose'

declare module '@casl/mongoose' {
  interface RecordTypes {
    BioProduct: true
    Branch: true
    Diagnosis: true
    Doctor: true
    Instrument: true
    Patient: true
    PatientType: true
    PrintForm: true
    Role: true
    Sample: true
    SampleType: true
    Test: true
    TestCategory: true
    TestCombo: true
    TestElement: true
    User: true
  }
}
