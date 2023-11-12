import {
  BadRequestException,
  Body,
  FileTypeValidator,
  Logger,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'
import { PrintForm } from '../../../../../libs/levansy-common/src'
import { NodeEnv } from '@diut/common'
import { AppController, ObjectIdPipe } from '@diut/server-core'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes } from '@nestjs/swagger'

import { AppRoute } from 'src/common/route.decorator'
import { CreateSampleRequestDto } from './dtos/create-sample.request-dto'
import { SearchSampleRequestDto } from './dtos/search-sample.request-dto'
import { UpdateSampleRequestDto } from './dtos/update-sample.request-dto'
import { sampleRoutes } from './sample.routes'
import { SampleService } from './sample.service'
import { AuthTokenPayload, ReqUser } from 'src/auth'
import { PrintSampleRequestDto } from './dtos/print-sample.request-dto'
import { SampleUploadRequestDto } from './dtos/sample-upload.request-dto'
import { SampleDownloadRequestDto } from './dtos/sample-download.request-dto'

@AppController(sampleRoutes.controller)
export class SampleController {
  private logger: Logger

  constructor(
    private sampleService: SampleService,
    private configService: ConfigService,
  ) {
    this.logger = new Logger(SampleController.name)
  }

  @AppRoute(sampleRoutes.search)
  search(@Body() body: SearchSampleRequestDto) {
    return this.sampleService.search(body)
  }

  @AppRoute(sampleRoutes.create)
  create(
    @Body() body: CreateSampleRequestDto,
    @ReqUser() user: AuthTokenPayload,
  ) {
    return this.sampleService.create({
      ...body,
      infoBy: user.sub,
      results: body.tests.map((test) => ({
        testId: test.id,
        testCompleted: false,
        bioProductName: test.bioProductName,
        elements: [],
      })),
      resultBy: [],
      sampleCompleted: false,
      infoCompleted: false,
    })
  }

  @AppRoute(sampleRoutes.updateById)
  async updateById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: UpdateSampleRequestDto,
    @ReqUser() user: AuthTokenPayload,
  ) {
    if (body.tests !== undefined || body.infoCompleted !== undefined) {
      return this.sampleService.updateSampleInfo(id, body, user)
    } else {
      return this.sampleService.updateSampleResults(id, body, user)
    }
  }

  @AppRoute(sampleRoutes.findById)
  findById(@Param('id', ObjectIdPipe) id: string) {
    return this.sampleService.findById(id)
  }

  @AppRoute(sampleRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.sampleService.deleteById(id)
  }

  @AppRoute(sampleRoutes.print)
  async print(
    @Body() body: PrintSampleRequestDto,
    @Res() res: Response,
    @ReqUser() user: AuthTokenPayload,
  ) {
    const buffer = await this.sampleService.print(body.samples, user)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Length': buffer.length,

      // prevent cache
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    })

    res.end(buffer)
  }

  @AppRoute({ path: 'preview/:id/:printForm', isPublic: true })
  preview(
    @Param('id', ObjectIdPipe) id: string,
    @Param('printForm') printForm: PrintForm,
  ) {
    if (this.configService.get('env') !== NodeEnv.Development) {
      return
    }
    return this.sampleService.prepareSampleContent({ sampleId: id, printForm })
  }

  @AppRoute(sampleRoutes.uploadFile)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: SampleUploadRequestDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1000 * 1000 }), // 10 MB
          new FileTypeValidator({ fileType: 'image' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.sampleService.uploadFile(file)
  }

  @AppRoute(sampleRoutes.downloadFile)
  async downloadFile(@Body() body: SampleDownloadRequestDto) {
    try {
      const fileStream = await this.sampleService.downloadFile(body)
      return new StreamableFile(fileStream)
    } catch {
      throw new BadRequestException()
    }
  }
}
