import { AuthSubject, SampleAction } from '@diut/hcdc'
import { ObjectIdPipe } from '@diut/nestjs-infra'
import {
  Body,
  FileTypeValidator,
  Inject,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Query,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes } from '@nestjs/swagger'
import { Response } from 'express'
import { assertPermission } from 'src/app/auth/common'
import { SampleCreateUseCase } from 'src/app/sample/use-case/create'
import { SampleDeleteUseCase } from 'src/app/sample/use-case/delete'
import { SampleDownloadResultImageUseCase } from 'src/app/sample/use-case/download-result-image'
import { SampleFindOneUseCase } from 'src/app/sample/use-case/find-one'
import { SampleGeneratePrintUrlUseCase } from 'src/app/sample/use-case/generate-print-url'
import { SampleLockUseCase } from 'src/app/sample/use-case/lock'
import { SamplePrintUseCase } from 'src/app/sample/use-case/print'
import { SamplePrintReminderUseCase } from 'src/app/sample/use-case/print-reminder'
import { SampleSearchUseCase } from 'src/app/sample/use-case/search'
import { SampleUnlockUseCase } from 'src/app/sample/use-case/unlock'
import { SampleUpdateInfoUseCase } from 'src/app/sample/use-case/update-info'
import { SampleUpdateResultUseCase } from 'src/app/sample/use-case/update-result'
import { SampleUploadResultImageUseCase } from 'src/app/sample/use-case/upload-result-image'
import { AUTH_CONTEXT_TOKEN, EEntityNotFound, IAuthContext } from 'src/domain'
import { HttpController, HttpRoute } from '../../shared'
import { SampleCreateRequestDto } from './dto/create'
import { SamplePrintRequestDto } from './dto/print'
import { SampleSearchRequestDto } from './dto/search'
import { SampleUpdateInfoRequestDto } from './dto/update-info'
import { SampleUpdateResultRequestDto } from './dto/update-result'
import { SampleUploadImageRequestDto } from './dto/upload-image'
import { sampleRoutes } from './routes'

@HttpController({
  basePath: 'samples',
})
export class SampleController {
  constructor(
    @Inject(AUTH_CONTEXT_TOKEN)
    private readonly authContext: IAuthContext,
    private readonly sampleCreateUseCase: SampleCreateUseCase,
    private readonly sampleUpdateInfoUseCase: SampleUpdateInfoUseCase,
    private readonly sampleUpdateResultUseCase: SampleUpdateResultUseCase,
    private readonly sampleDeleteUseCase: SampleDeleteUseCase,
    private readonly sampleSearchUseCase: SampleSearchUseCase,
    private readonly sampleFindOneUseCase: SampleFindOneUseCase,
    private readonly samplePrintUseCase: SamplePrintUseCase,
    private readonly sampleUploadResultImageUseCase: SampleUploadResultImageUseCase,
    private readonly sampleDownloadResultImageUseCase: SampleDownloadResultImageUseCase,
    private readonly sampleGeneratePrintUrlUseCase: SampleGeneratePrintUrlUseCase,
    private readonly sampleLockUseCase: SampleLockUseCase,
    private readonly sampleUnlockUseCase: SampleUnlockUseCase,
    private readonly samplePrintReminderUseCase: SamplePrintReminderUseCase,
  ) {}

  @HttpRoute(sampleRoutes.uploadResultImage)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: SampleUploadImageRequestDto,
  })
  async uploadResultImage(
    @Query('sampleId', ObjectIdPipe) sampleId: string,
    @Query('testElementId', ObjectIdPipe) testElementId: string,
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
    const storageKey = await this.sampleUploadResultImageUseCase.execute({
      sampleId,
      testElementId,
      imageBuffer: file.buffer,
      mimeType: file.mimetype,
    })

    return { storageKey }
  }

  @HttpRoute(sampleRoutes.search)
  search(@Body() body: SampleSearchRequestDto) {
    return this.sampleSearchUseCase.execute(body)
  }

  @HttpRoute(sampleRoutes.create)
  create(@Body() body: SampleCreateRequestDto) {
    return this.sampleCreateUseCase.execute(body)
  }

  @HttpRoute(sampleRoutes.downloadResultImage)
  async downloadResultImage(
    @Query('sampleId', ObjectIdPipe) sampleId: string,
    @Query('testElementId', ObjectIdPipe) testElementId: string,
  ) {
    const { stream, mimetype, length } =
      await this.sampleDownloadResultImageUseCase.execute({
        sampleId,
        testElementId,
      })

    return new StreamableFile(stream, { type: mimetype, length })
  }

  @HttpRoute(sampleRoutes.findInfoById)
  async findInfoById(@Param('id', ObjectIdPipe) id: string) {
    const rv = await this.sampleFindOneUseCase.execute({
      filter: { _id: id },
      populates: [{ path: 'infoBy' }, { path: 'patient' }, { path: 'branch' }],
    })

    if (rv === null) {
      throw new EEntityNotFound(`Sample id=${id}`)
    }

    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Sample, SampleAction.Read, rv)

    return rv
  }

  @HttpRoute(sampleRoutes.findById)
  async findById(@Param('id', ObjectIdPipe) id: string) {
    const rv = await this.sampleFindOneUseCase.execute({
      filter: { _id: id },
      populates: [
        { path: 'results.test' },
        { path: 'results.resultBy' },
        { path: 'results.elements.testElement' },
        { path: 'infoBy' },
        { path: 'patient' },
      ],
    })

    if (rv === null) {
      throw new EEntityNotFound(`Sample id=${id}`)
    }

    const { ability } = this.authContext.getData()
    assertPermission(ability, AuthSubject.Sample, SampleAction.Read, rv)

    return rv
  }

  @HttpRoute(sampleRoutes.updateInfoById)
  updateInfoById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: SampleUpdateInfoRequestDto,
  ) {
    return this.sampleUpdateInfoUseCase.execute({
      filter: { _id: id },
      data: body,
    })
  }

  @HttpRoute(sampleRoutes.updateResultById)
  updateResultById(
    @Param('id', ObjectIdPipe) id: string,
    @Body() body: SampleUpdateResultRequestDto,
  ) {
    return this.sampleUpdateResultUseCase.execute({
      filter: { _id: id },
      data: body,
    })
  }

  @HttpRoute(sampleRoutes.deleteById)
  deleteById(@Param('id', ObjectIdPipe) id: string) {
    return this.sampleDeleteUseCase.execute({ id })
  }

  @HttpRoute(sampleRoutes.lock)
  lock(@Param('id', ObjectIdPipe) id: string) {
    return this.sampleLockUseCase.execute({ _id: id })
  }

  @HttpRoute(sampleRoutes.unlock)
  unlock(@Param('id', ObjectIdPipe) id: string) {
    return this.sampleUnlockUseCase.execute({ _id: id })
  }

  @HttpRoute(sampleRoutes.print)
  async print(
    @Res({ passthrough: true }) res: Response,
    @Body() body: SamplePrintRequestDto,
  ) {
    const buffer = await this.samplePrintUseCase.execute(body.requests)

    res.set({
      'Content-Type': 'application/pdf',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    })

    return new StreamableFile(buffer)
  }

  @HttpRoute(sampleRoutes.getPrintPath)
  async getPrintPath(@Body() body: SamplePrintRequestDto) {
    const path = await this.sampleGeneratePrintUrlUseCase.execute({
      printOptions: body.requests,
    })

    return { path }
  }

  @HttpRoute(sampleRoutes.printReminder)
  async printReminder(
    @Res({ passthrough: true }) res: Response,
    @Param('id') sampleId: string,
    @Query('timestamp') timestamp: Date,
  ) {
    const buffer = await this.samplePrintReminderUseCase.execute(
      sampleId,
      new Date(timestamp),
    )

    res.set({
      'Content-Type': 'application/pdf',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    })

    return new StreamableFile(buffer)
  }
}
