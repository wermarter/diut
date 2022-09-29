import { PartialType } from '@nestjs/swagger'

import { CreateBookRequestDto } from './create-book.request.dto'

export class UpdateBookDto extends PartialType(CreateBookRequestDto) {}
