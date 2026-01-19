import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Categories } from '../categories/categories.entity';
import { OrderDetails } from '../orders/entities/orderdetails.entity';

@Entity({
  name: 'PRODUCTS',
})
export class Products {

  @ApiProperty({
    description: 'Identificador único del producto',
    example: 'e3a1b2c4-9d8f-4a21-8b7c-123456789abc',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Auriculares Bluetooth',
    maxLength: 50,
  })
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Auriculares inalámbricos con cancelación de ruido',
  })
  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 149.99,
    type: Number,
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  price: number;

  @ApiProperty({
    description: 'Cantidad de unidades disponibles en stock',
    example: 25,
  })
  @Column({
    type: 'int',
    nullable: false,
  })
  stock: number;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    example:
      'https://www.shutterstock.com/image-vector/illustration-product-box-exclamation-mark-600nw-2519003775.jpg',
  })
  @Column({
    type: 'text',
    default:
      'https://www.shutterstock.com/image-vector/illustration-product-box-exclamation-mark-600nw-2519003775.jpg',
  })
  imgUrl: string;

  @ApiHideProperty()
  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  //* Products N:N OrderDetails
  @ApiHideProperty()
  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];
}
