import {
  Container,
  GenericFactory,
  buildMongoQueryMatcher,
  createMongoAbility,
} from '@casl/ability'
import { AnyObject } from '@casl/ability/dist/types/types'
import { MergeUnion } from '@diut/common'
import {
  $or,
  BuildMongoQuery,
  DefaultOperators,
  MongoQueryTopLevelOperators,
  or,
} from '@ucast/mongo2js'
import { PermissionRule } from '../entity'

const conditionsMatcher = buildMongoQueryMatcher({ $or }, { or })

declare const defaultInstructions: {
  $eq: import('@ucast/mongo2js').FieldInstruction<
    unknown,
    import('@ucast/mongo2js').FieldParsingContext
  >
  $ne: import('@ucast/mongo2js').FieldInstruction<
    unknown,
    import('@ucast/mongo2js').FieldParsingContext
  >
  $lt: import('@ucast/mongo2js').FieldInstruction<
    string | number | Date,
    import('@ucast/mongo2js').FieldParsingContext
  >
  $lte: import('@ucast/mongo2js').FieldInstruction<
    string | number | Date,
    import('@ucast/mongo2js').FieldParsingContext
  >
  $gt: import('@ucast/mongo2js').FieldInstruction<
    string | number | Date,
    import('@ucast/mongo2js').FieldParsingContext
  >
  $gte: import('@ucast/mongo2js').FieldInstruction<
    import('@ucast/mongo2js').Comparable,
    import('@ucast/mongo2js').FieldParsingContext
  >
  $in: import('@ucast/mongo2js').FieldInstruction<
    unknown[],
    import('@ucast/mongo2js').FieldParsingContext
  >
  $nin: import('@ucast/mongo2js').FieldInstruction<
    unknown[],
    import('@ucast/mongo2js').FieldParsingContext
  >
  $all: import('@ucast/mongo2js').FieldInstruction<
    unknown[],
    import('@ucast/mongo2js').FieldParsingContext
  >
  $size: import('@ucast/mongo2js').FieldInstruction<
    number,
    import('@ucast/mongo2js').FieldParsingContext
  >
  $regex: import('@ucast/mongo2js').FieldInstruction<
    string | RegExp,
    import('@ucast/mongo2js').RegExpFieldContext
  >
  $options: import('@ucast/mongo2js').FieldInstruction<
    unknown,
    import('@ucast/mongo2js').FieldParsingContext
  >
  $elemMatch: import('@ucast/mongo2js').FieldInstruction<
    | (import('@ucast/mongo2js').MongoQueryFieldOperators<any> &
        import('@ucast/mongo2js').MongoQueryTopLevelOperators<any>)
    | ({
        [x: string]: any
      } & import('@ucast/mongo2js').MongoQueryTopLevelOperators<any>),
    import('@ucast/mongo2js').ObjectQueryFieldParsingContext
  >
  $exists: import('@ucast/mongo2js').FieldInstruction<
    boolean,
    import('@ucast/mongo2js').FieldParsingContext
  >
}

interface MongoQueryFactory extends GenericFactory {
  produce: MongoQuery<this[0]>
}

export type MongoQuery<T = AnyObject> = BuildMongoQuery<
  MergeUnion<T>,
  {
    toplevel: Pick<MongoQueryTopLevelOperators<T>, '$or'>
    field: Pick<
      DefaultOperators<MergeUnion<T>>['field'],
      keyof typeof defaultInstructions
    >
  }
> &
  Container<MongoQueryFactory>

export function createAbility(permissionRules: PermissionRule[]) {
  return createMongoAbility(permissionRules, { conditionsMatcher })
}
