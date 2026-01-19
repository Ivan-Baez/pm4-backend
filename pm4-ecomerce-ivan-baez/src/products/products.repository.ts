import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/auth/categories.entity';
import { Products } from 'src/products/products.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/data.json';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private ormProductsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private ormCategoriesRepository: Repository<Categories>,
  ) {}

  async getAllProducts(page: number, limit: number): Promise<Products[]> {
    const skip = (page - 1) * limit;
    const products = await this.ormProductsRepository.find({
      relations: { category: true },
      skip: skip,
      take: limit,
    });
    return products;
  }

  async addProducts(): Promise<string> {
    const categories = await this.ormCategoriesRepository.find();
    await Promise.all(
      data.map(async (element) => {
        const category = categories.find(
          (category) => category.name === element.category,
        );
        if (!category) throw new Error(`Categoría ${element.category} no existe`);

        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.stock = element.stock;
        product.category = category;

        await this.ormProductsRepository
          .createQueryBuilder()
          .insert()
          .into(Products)
          .values(product)
          .orUpdate(['description', 'price', 'imgUrl', 'stock'], ['name'])
          .execute();
      }),
    );
    return 'productos agregados';
  }

  async getProductById(id: string): Promise<Products | string> {
    const product = await this.ormProductsRepository.findOneBy({ id });
    if (!product) {
      return `Producto con id ${id} no encontrado`;
    }
    return product;
  }

  async updateProduct(id: string, productNewData: Partial<Products>): Promise<Products | null> {
    const product = await this.ormProductsRepository.findOneBy({ id });
    if (!product) return null;

    Object.assign(product, productNewData);
    return await this.ormProductsRepository.save(product);
  }

  async deleteProduct(id: string): Promise<string | null> {
    const product = await this.ormProductsRepository.findOneBy({ id });
    if (!product) return null;
    await this.ormProductsRepository.delete(id);
    return product.id;
  }

async createProduct(productData: any): Promise<Products | Products[]> {
  const newProduct = this.ormProductsRepository.create(productData);
  return await this.ormProductsRepository.save(newProduct);
}

}