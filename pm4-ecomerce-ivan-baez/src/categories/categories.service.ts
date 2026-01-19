import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository'

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  getAllCategories() {
    return this.categoriesRepository.getAllCategories();
  }

  addCategories() {
    return this.categoriesRepository.addCategories();
  }

  getCategoryById(id: string) {
    return this.categoriesRepository.getCategoryById(id);
  }
}
