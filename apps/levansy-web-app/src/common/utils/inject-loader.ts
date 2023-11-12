import { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom'

export type InjectorFunction<InjectorFunctionArgs> = (
  args: LoaderFunctionArgs,
  injectedArgs: InjectorFunctionArgs,
) => ReturnType<LoaderFunction>

export const injectLoader =
  <InjectorFunctionArgs>(
    loader: LoaderFunction,
    injector: InjectorFunction<InjectorFunctionArgs>,
    injectorArgs: InjectorFunctionArgs,
  ): LoaderFunction =>
  (args: LoaderFunctionArgs) => {
    injector(args, injectorArgs)

    return loader(args)
  }

type RouteInjector<T> = {
  injector: InjectorFunction<T>
  args: T
}

export function makeInjector<ArgType>(
  injector: InjectorFunction<ArgType>,
  args: ArgType,
): RouteInjector<ArgType> {
  return {
    injector,
    args,
  }
}

export type RouteInjectors = RouteInjector<any>[]

export const combineInjectors = (
  loader: LoaderFunction,
  injectors: RouteInjectors,
) =>
  injectors.reverse().reduce((cumloader, { injector, args }) => {
    return injectLoader(cumloader, injector, args)
  }, loader)
