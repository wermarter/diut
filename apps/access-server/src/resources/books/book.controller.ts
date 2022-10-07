import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  RequestMethod,
} from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'

import { AppController, AppRoute } from 'src/common'
import { BookService } from './book.service'
import {
  CreateBookRequestDto,
  CreateBookResponseDto,
  UpdateBookDto,
} from './dtos'

@AppController({ basePath: 'books' })
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  getAllBook() {
    return this.bookService.find()
  }

  // @Post()
  // @ApiCreatedResponse({ type: CreateBookResponseDto })
  @AppRoute({
    method: RequestMethod.POST,
    responses: [{ type: CreateBookResponseDto }],
  })
  createBook(@Body() dto: CreateBookRequestDto) {
    return this.bookService.create(dto)
  }

  @Patch(':id')
  updateBookById(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.bookService.updateById(id, dto)
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.bookService.findById(id)
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.bookService.deleteById(id)
  }
}
