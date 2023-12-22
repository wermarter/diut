import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'
// import { setTimeout } from 'timers/promises'

import { ExampleService } from './service'

function setTimeoutPromise(waitMS: number) {
  return new Promise((resolve) => {
    console.log('start')
    const startMS = performance.now()
    while (performance.now() - startMS < waitMS) {}
    resolve(true)
  })
}

@Controller('example')
export class ExampleController {
  constructor(private service: ExampleService) {}

  @Get()
  async test(@Res() res: Response) {
    console.log(performance.now())
    // setTimeout(() => res.json({ res: 11111 }).end(), 10000)

    // await Promise.all([
    //   setTimeoutPromise(2000),
    //   setTimeoutPromise(2000),
    //   setTimeoutPromise(2000),
    //   setTimeoutPromise(2000),
    //   setTimeoutPromise(2000),
    // ])

    setTimeout(() => {
      console.log(performance.now())
      res.json({ res: 11111 }).end()
    }, 10000)
  }

  @Get('micro')
  async micro(@Res() res: Response) {
    console.log('started2')
    Promise.resolve().then(() => res.json({ res: 22222 }).end())
  }
}
