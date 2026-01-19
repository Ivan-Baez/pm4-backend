import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from 'src/products/products.entity';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  getAllProducts(page: number, limit: number) {
    return this.productsRepository.getAllProducts(page, limit);
  }

  addProducts() {
    return this.productsRepository.addProducts();
  }

  getProductById(id: string) {
    return this.productsRepository.getProductById(id);
  }

  updateProduct(id: string, productNewData: Partial<Products>) {
    return this.productsRepository.updateProduct(id, productNewData);
  }

  deleteProduct(id: string) {
    return this.productsRepository.deleteProduct(id);
  }

  createProduct(productData: any) {
    return this.productsRepository.createProduct(productData);
  }
}