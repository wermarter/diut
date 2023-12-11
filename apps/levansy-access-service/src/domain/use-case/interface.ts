import { Observable } from 'rxjs'

export interface IUseCase<TInput, TOutput> {
  handle(input: TInput): TOutput | Promise<TOutput> | Observable<TOutput>
}
