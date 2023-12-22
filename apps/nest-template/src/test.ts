import {
  Observable,
  concat,
  firstValueFrom,
  from,
  lastValueFrom,
  mergeMap,
  of,
  reduce,
} from 'rxjs'
import { setTimeout } from 'timers/promises'

function makeWork<TReturn>(
  targetFunction: () => Promise<TReturn>,
  abortController?: AbortController,
) {
  return new Observable<TReturn>((subscriber) => {
    if (abortController && abortController?.signal?.aborted) {
      subscriber.complete()
      return
    }

    targetFunction()
      .then((value) => {
        subscriber.next(value)
      })
      .catch(subscriber.error.bind(subscriber))
      .finally(() => subscriber.complete())

    return () => {}
  })
}

function doAdditionalWork(workObservable: Observable<number>) {
  return workObservable.pipe(
    reduce((acc, value) => {
      console.log(`${acc}+${value}=${acc + value}`)
      return acc + value
    }, 0),
  )
}

;(async function main() {
  console.log('LOADED')
  let counter = 1
  const abortController = new AbortController()

  const work$ = concat(
    makeWork(() => setTimeout(1000, counter++)),
    makeWork(() => setTimeout(1000, counter++)),
    makeWork(() => setTimeout(1000, counter++)),
    makeWork(() => setTimeout(1000, counter++)),
    makeWork(() => setTimeout(1000, counter++), abortController),
  )

  console.log('START')
  const subscription = work$.pipe(doAdditionalWork).subscribe({
    complete: () => console.log('DONE'),
  })
  console.log('AFTER_START')

  setTimeout(3000).then(() => abortController.abort())
})()
