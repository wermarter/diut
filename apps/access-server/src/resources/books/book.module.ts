import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BookController } from './book.controller'
import { Book, bookSchema } from './book.schema'
import { BookService } from './book.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: bookSchema }]),
  ],
  providers: [BookService],
  controllers: [BookController],
  exports: [BookService],
})
export class BookModule {}
