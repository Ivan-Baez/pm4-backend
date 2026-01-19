import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.getAllCategories();
  }

  @Get('seeder')
  seedCategories() {
    return this.categoriesService.addCategories();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.categoriesService.getCategoryById(id);
  }
}