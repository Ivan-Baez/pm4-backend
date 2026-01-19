import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from '../../users/entities/users.entity';
import { OrderDetails } from './orderdetails.entity';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

@Entity({
  name: 'ORDERS',
})
export class Orders {

  @ApiProperty({
    description: 'Identificador único del pedido (UUID v4 generado automáticamente)',
    example: 'f1a2b3c4-9d8e-4f21-8a7b-123456789abc',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Fecha en la que se realizó el pedido',
    example: '2023-12-25',
    type: String,
  })
  @Column()
  date: Date;

  /**
   * Relación uno a uno con los detalles del pedido.
   * Contiene productos asociados y precios.
   * Se oculta en Swagger para evitar referencias circulares.
   */
  @ApiHideProperty()
  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails;

  /**
   * Relación muchos a uno con el usuario.
   * Indica qué usuario realizó el pedido.
   * No se expone directamente en Swagger.
   */
  @ApiHideProperty()
  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}

