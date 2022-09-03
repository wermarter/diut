import { CreateBookDto, UpdateBookDto } from '@diut/common'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { BookService } from './book.service'

@ApiTags('Book')
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  getAllBook() {
    return this.bookService.find()
  }

  @Post()
  createBook(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto)
  }

  @Put(':id')
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
