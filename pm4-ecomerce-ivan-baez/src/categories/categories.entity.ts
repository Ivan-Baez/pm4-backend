import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Products } from '../products/products.entity';

@Entity({
  name: 'CATEGORIES',
})
export class Categories {

  @ApiProperty({
    description: 'Identificador único de la categoría',
    example: 'b12c34de-5678-4f9a-8cde-123456789abc',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre de la categoría de productos',
    example: 'Electrónica',
    maxLength: 50,
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  @ApiHideProperty()
  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn()
  products: Products[];
}
