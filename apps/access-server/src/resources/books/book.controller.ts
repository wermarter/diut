import { Body, Delete, Get, Param, Patch } from '@nestjs/common'

import { AppController, AppRoute } from 'src/core'
import { bookRoutes } from './book.routes'
import { BookService } from './book.service'
import { CreateBookRequestDto, UpdateBookDto } from './dtos'

@AppController(bookRoutes.controller)
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  getAllBook() {
    return this.bookService.search()
  }

  @AppRoute(bookRoutes.createBook)
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
