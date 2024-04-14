import { Observable } from 'rxjs'

export const PdfServiceToken = Symbol('PdfServiceToken')

export interface IPdfService {
  mergePdf(pdf$: Observable<Buffer>): Promise<Buffer>
}
