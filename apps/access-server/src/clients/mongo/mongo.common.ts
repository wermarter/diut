import { MongooseModule, SchemaFactory, SchemaOptions } from '@nestjs/mongoose'
import { ClassConstructor } from 'class-transformer'

export const baseSchemaOptions: SchemaOptions = {
  timestamps: true,
}

export class BaseSchema {
  createdAt: Date
  updatedAt: Date
}

export function importCollection(SchemaClass: ClassConstructor<unknown>) {
  return MongooseModule.forFeature([
    { name: SchemaClass.name, schema: SchemaFactory.createForClass(SchemaClass) },
  ])
}
