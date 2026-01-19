
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Products } from '../../products/products.entity';
import { Orders } from './orders.entity';

@Entity({
  name: 'ORDERDETAILS',
})
export class OrderDetails {

  @ApiProperty({
    description: 'Identificador único del detalle de la orden',
    example: 'c1a1f3c9-8d7e-4a2b-bf89-123456789abc',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Precio total del detalle de la orden',
    example: 199.99,
    type: Number,
  })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  price: number;

  @ApiHideProperty()
  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  @ApiHideProperty()
  @ManyToMany(() => Products, (product) => product.orderDetails)
  @JoinTable({
    name: 'ORDERDETAILS_PRODUCTS',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'orderdetails_id',
      referencedColumnName: 'id',
    },
  })
  products: Products[];
}


