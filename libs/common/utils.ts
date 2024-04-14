export const paramTypeEnhancer: ParamDecoratorEnhancer = (
  target: Record<string, unknown>,
  propertyKey: string,
  parameterIndex: number,
): void => {
  const paramTypes = Reflect.getOwnMetadata(
    'design:paramtypes',
    target,
    propertyKey,
  )
  const metatype = paramTypes[parameterIndex]
  Reflect.defineMetadata(METADATA_PARAM_TYPE, metatype, target[propertyKey])
}

export const SortQuery = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()

    const metatype = Reflect.getOwnMetadata(
      METADATA_PARAM_TYPE,
      ctx.getHandler(),
    )

    if (
      (request.query.sort && !request.query.order) ||
      (!request.query.sort && request.query.order)
    )
      throw new BadRequestException(NOT_ENOUGH_SORT_PARAMS)

    const sortParams = plainToInstance(metatype, request.query)

    const errors = validateSync(sortParams)

    if (errors.length != 0) {
      throw new BadRequestException(Object.values(errors[0].constraints)[0])
    }

    return sortParams
  },
  [paramTypeEnhancer],
)
