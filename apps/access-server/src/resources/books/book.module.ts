import { Module } from '@nestjs/common'

import { importCollection } from 'src/clients/mongo'
import { BookController } from './book.controller'
import { Book } from './book.schema'
import { BookService } from './book.service'

@Module({
  imports: [importCollection(Book)],
  providers: [BookService],
  controllers: [BookController],
  exports: [BookService],
})
export class BookModule {}
