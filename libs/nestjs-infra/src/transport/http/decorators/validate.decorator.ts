import { ValidateIf } from 'class-validator'

export const IsNullable = () => ValidateIf((object, value) => value !== null)
