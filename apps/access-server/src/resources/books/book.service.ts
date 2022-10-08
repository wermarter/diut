import { BookGenre } from '@diut/common'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BaseMongoService } from 'src/clients/mongo'
import { Book } from './book.schema'

@Injectable()
export class BookService
  extends BaseMongoService<Book>
  implements OnModuleInit
{
  constructor(@InjectModel(Book.name) model: Model<Book>) {
    super(model, new Logger(BookService.name))
  }

  async onModuleInit() {
    this.logger.debug({ intent: 'database seeding' }, 'seeding 3 books')
    await this.model.deleteMany()
    await this.create({
      name: 'monstaldt',
      genre: BookGenre.Classic,
      stock: 1,
    })
    await this.create({ name: 'liyue', genre: BookGenre.Fiction, stock: 2 })
    await this.create({ name: 'inazuma', genre: BookGenre.Romance, stock: 3 })
  }
}
