import { Module } from '@nestjs/common'

import { importCollection } from 'src/clients/mongo'
import { TestCategoryController } from './test-category.controller'
import { TestCategory } from './test-category.schema'
import { TestCategoryService } from './test-category.service'

@Module({
  imports: [importCollection(TestCategory)],
  providers: [TestCategoryService],
  controllers: [TestCategoryController],
  exports: [TestCategoryService],
})
export class TestCategoryModule {}
