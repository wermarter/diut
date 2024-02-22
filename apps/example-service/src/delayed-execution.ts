#!/usr/bin/env -S pnpm exec ts-node -r tsconfig-paths/register

import {
  bufferCount,
  interval,
  concatMap,
  reduce,
  map,
  Observable,
  tap,
  from,
} from 'rxjs'
import { setTimeout } from 'timers/promises'

async function* generator() {
  for (let i = 0; i < 1000; i++) {
    await setTimeout(10)

    console.log('generator: ', i)

    yield i
  }
}

// const source$ = new Observable((subscriber) => {
//   for (let i = 0; i < 1000; i++) {
//     subscriber.next(i)
//   }
//   subscriber.complete()
// })

const source$ = from(generator())

// const source$ = interval(100)

const pipeline$ = source$
  .pipe(
    map(() => {
      return 123
    }),
  )
  .pipe(
    bufferCount(10),
    tap({
      next() {
        console.log('tap: next')
      },
      complete() {
        console.log('tap: complete')
      },
    }),
    concatMap(async (data) => {
      console.log(Date.now(), '1')

      await setTimeout(1000)

      return data
    }),
    // concatMap(async (data) => {
    //   console.log(Date.now(), '2')

    //   await setTimeout(200)

    //   return data
    // }),
    // concatMap(async (data) => {
    //   console.log(Date.now(), '3')

    //   await setTimeout(300)

    //   return data
    // }),
    reduce((acc, cur) => {
      console.log({ acc }, '\n')

      return acc + cur.length
    }, 0),
  )

pipeline$.subscribe()
