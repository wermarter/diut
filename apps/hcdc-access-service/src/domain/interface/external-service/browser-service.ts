import { PrintPageReply, PrintPageRequest } from '@diut/services'
import { Observable } from 'rxjs'

export const BROWSER_SERVICE_TOKEN = Symbol('BROWSER_SERVICE_TOKEN')
export interface IBrowserService {
  printMultiplePage(
    request: Observable<PrintPageRequest>,
  ): Promise<PrintPageReply>
}
