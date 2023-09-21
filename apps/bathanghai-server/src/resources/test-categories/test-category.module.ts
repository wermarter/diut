import { Module } from '@nestjs/common'

import { MongoModule } from '@diut/server-core'
import { TestCategoryController } from './test-category.controller'
import { TestCategory } from './test-category.schema'
import { TestCategoryService } from './test-category.service'

@Module({
  imports: [MongoModule.forFeature([TestCategory])],
  providers: [TestCategoryService],
  controllers: [TestCategoryController],
  exports: [TestCategoryService],
})
export class TestCategoryModule {}
