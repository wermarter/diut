import { Logger, OnApplicationBootstrap, OnModuleDestroy } from '@nestjs/common'
import { HealthCheckError, HealthIndicator } from '@nestjs/terminus'
import { setTimeout } from 'timers/promises'

export abstract class AbstractLoopService
  extends HealthIndicator
  implements OnApplicationBootstrap, OnModuleDestroy
{
  protected logger: Logger
  private shouldEnd = false
  private isLoopEnded = false
  private isLoopStepCrashing = false
  private loopStepStartTime: number
  private loopLastActiveTime: number

  constructor(
    private readonly minLoopDurationMS: number,
    private readonly idleStopDurationMS?: number,
  ) {
    super()
    this.logger = new Logger(this.constructor.name)
  }

  public healthcheck() {
    let isHealthy = true
    let message: string | undefined

    if (this.isLoopEnded) {
      isHealthy = false
      message = 'loop ended'
    }

    if (this.isLoopStepCrashing) {
      isHealthy = false
      message = 'loop step crashing'
    }

    const currentStepDurationMS = performance.now() - this.loopStepStartTime
    if (currentStepDurationMS > this.minLoopDurationMS * 10) {
      isHealthy = false
      message = `loop step is running for ${
        currentStepDurationMS / 1000
      } seconds`
    }

    const result = this.getStatus(this.constructor.name, isHealthy, { message })
    if (isHealthy) {
      return result
    }

    throw new HealthCheckError('down', result)
  }

  async onModuleDestroy() {
    if (this.isLoopEnded === false && this.shouldEnd === false) {
      this.logger.log('Loop ending...')
      this.shouldEnd = true
    }

    while (this.isLoopEnded === false) {
      await setTimeout(1000)
    }
  }

  async onApplicationBootstrap() {
    this.loop()
  }

  async checkShouldEnd() {
    if (this.shouldEnd === true) {
      return true
    }

    const loopElapsedTimeMS = performance.now() - this.loopStepStartTime
    const timeToWait = this.minLoopDurationMS - loopElapsedTimeMS

    if (timeToWait > 0) {
      await setTimeout(timeToWait)
    }

    this.loopStepStartTime = performance.now()
    return false
  }

  async loop() {
    this.logger.log('Loop started')
    this.loopLastActiveTime = performance.now()

    try {
      while (!(await this.checkShouldEnd())) {
        try {
          const isIdle = !(await this.loopStep())
          this.isLoopStepCrashing = false

          const now = performance.now()
          if (isIdle && this.idleStopDurationMS) {
            if (now - this.loopLastActiveTime > this.idleStopDurationMS) {
              this.onModuleDestroy()
            }
          } else {
            this.loopLastActiveTime = now
          }
        } catch (e) {
          this.isLoopStepCrashing = true
          this.logger.error('Loop step crashed', e.stack)
        }
      }
    } catch (e) {
      this.logger.error('Loop crashed', e.stack)
    } finally {
      this.isLoopEnded = true
      this.logger.log('Loop ended')
    }
  }

  abstract loopStep(): Promise<boolean>
}
