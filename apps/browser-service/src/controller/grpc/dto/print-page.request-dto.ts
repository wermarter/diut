import { PageFormat, PageOrientation } from '@diut/services'
import { Transform } from 'class-transformer'
import { IsEnum, IsString } from 'class-validator'
import { PaperFormat } from 'puppeteer-core'

import { Orientation } from 'src/app/puppeteer/use-case/create-pdf'

export class PrintPageRequestDto {
  @IsString()
  htmlContent: string

  @IsEnum(PageFormat)
  @Transform(({ value }) => PageFormat[value])
  pageFormat: PaperFormat

  @IsEnum(Orientation)
  @Transform(({ value }) => PageOrientation[value])
  pageOrientation: Orientation
}
