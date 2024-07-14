import { Inject } from '@nestjs/common'
import { DataSourceOptions } from 'typeorm'

export type TypeormModuleOptions = DataSourceOptions
export const TypeormDatasourceToken = Symbol('TypeormDatasource')

export const InjectTypeormDatasource = Inject(TypeormDatasourceToken)
