import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/auth/categories.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private ormCategoriesRepository: Repository<Categories>,
  ) {}

  async getAllCategories(): Promise<Categories[]> {
    return await this.ormCategoriesRepository.find();
  }

  async addCategories(): Promise<string> {
    // Creamos un array de promesas
    const insertPromises = data.map((element) =>
      this.ormCategoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({ name: element.category })
        .orIgnore()
        .execute(),
    );

    // Esperamos a que todas terminen antes de seguir:
    await Promise.all(insertPromises);

    return 'Categorías agregadas';
  }

  async getCategoryById(id: string): Promise<Categories | null> {
    return await this.ormCategoriesRepository.findOne({ where: { id } });
  }
}