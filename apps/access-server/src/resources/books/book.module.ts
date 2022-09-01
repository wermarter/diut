import { Module } from '@nestjs/common'
import { BookService } from './book.service'

@Module({
  imports: [],
  providers: [BookService],
  controllers: [],
  exports: [],
})
export class BookModule {}
