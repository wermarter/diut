import { Observable, concat, from, mergeMap, of, reduce } from 'rxjs'

let workCount = 0
function doWork() {
  const result = ++workCount

  return new Observable<number>((subscriber) => {
    setTimeout(() => {
      subscriber.next(result)
      subscriber.complete()
    }, 1000)
  })
}

async function doAdditionalWork(workObservable: Observable<number>) {
  let sum = 0

  await workObservable.forEach((value) => {
    sum += value
    console.log(`+${value}=${sum}`)
  })

  return sum
}

;(async function main() {
  console.log('LOADED')
  const workObservable = concat(
    doWork(),
    doWork(),
    doWork(),
    doWork(),
    doWork(),
  )

  console.log('START')
  doAdditionalWork(workObservable)
})()
