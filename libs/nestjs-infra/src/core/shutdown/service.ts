import { Logger } from '@nestjs/common'
import { Subject } from 'rxjs'

export class ShutdownService {
  private shutdownListener$: Subject<void> = new Subject()
  private logger = new Logger(this.constructor.name)

  subscribeToShutdown(shutdownFn: () => void): void {
    this.shutdownListener$.subscribe(() => shutdownFn())
  }

  shutdown() {
    this.logger.log('Manually shutting down app...')
    this.shutdownListener$.next()
  }
}
