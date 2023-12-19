import { Observable } from 'rxjs'

export interface IUseCase<TInput, TOutput> {
  execute(input: TInput): TOutput | Promise<TOutput> | Observable<TOutput>
}
