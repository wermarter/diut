import { Body, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiCreatedResponse } from '@nestjs/swagger'

import { AppController } from 'src/common'
import { BookService } from './book.service'
import {
  CreateBookRequestDto,
  CreateBookResponseDto,
  UpdateBookDto,
} from './dtos'

@AppController({ baseName: 'books' })
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  getAllBook() {
    return this.bookService.find()
  }

  @Post()
  @ApiCreatedResponse({ type: CreateBookResponseDto })
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
