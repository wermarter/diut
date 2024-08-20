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
import { ObjectIdPipe } from '@diut/nestjs-infra'
import { Response } from 'express'
import { ApiBody, ApiConsumes } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthSubject, SampleAction } from '@diut/hcdc'

import { sampleRoutes } from './routes'
import {
  AUTH_CONTEXT_TOKEN,
  EEntityNotFound,
  IAuthContext,
  assertPermission,
} from 'src/domain'
import {
  SampleCreateUseCase,
  SampleDeleteUseCase,
  SampleSearchUseCase,
  SampleFindOneUseCase,
  SampleUpdateResultUseCase,
  SampleUpdateInfoUseCase,
  SamplePrintUseCase,
  SampleUploadResultImageUseCase,
  SampleDownloadResultImageUseCase,
} from 'src/app'
import { SampleCreateRequestDto } from './dto/create.dto'
import { SampleUpdateInfoRequestDto } from './dto/update-info.dto'
import { SampleSearchRequestDto } from './dto/search.dto'
import { HttpController, HttpRoute } from '../../common'
import { SampleUpdateResultRequestDto } from './dto/update-result.dto'
import { SamplePrintRequestDto } from './dto/print.dto'
import { SampleUploadImageRequestDto } from './dto/upload-image.dto'

@HttpController({
  basePath: 'v1/samples',
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
    assertPermission(ability, AuthSubject.Sample, SampleAction.ReadInfo, rv)

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
    assertPermission(ability, AuthSubject.Sample, SampleAction.ReadResult, rv)

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
}
