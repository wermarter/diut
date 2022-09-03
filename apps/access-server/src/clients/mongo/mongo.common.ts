import { SchemaOptions } from '@nestjs/mongoose'

export const baseSchemaOptions: SchemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
}
