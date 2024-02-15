export const DATETIME_FORMAT = 'dd/MM/yyyy HH:mm'
export const DATEONLY_FORMAT = 'dd/MM/yyyy'

export const exampleMongoObjectId = {
  example: '634180269de1f07e47bbf494',
}

export const exampleMongoObjectIds = {
  example: ['634180269de1f07e47bbf494'],
  type: () => 'string',
  isArray: true,
}

export const exampleDate = {
  format: 'date-time',
  // example: '2018-03-20T09:12:28Z',
  example: new Date('2018-03-20T09:12:28Z'),
}
