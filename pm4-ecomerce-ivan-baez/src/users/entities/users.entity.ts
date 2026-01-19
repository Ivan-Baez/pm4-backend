
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Orders } from '../../orders/entities/orders.entity';

@Entity({
  name: 'USERS',
})
export class Users {

  @ApiProperty({
    description: 'Identificador único del usuario',
    example: 'a3f1c2d4-9b8e-4f21-9a3b-123456789abc',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez',
    maxLength: 50,
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario (único)',
    example: 'juan.perez@email.com',
    maxLength: 50,
  })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @ApiHideProperty()
  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
  })
  password: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario',
    example: 1123456789,
  })
  @Column({
    type: 'int',
  })
  phone: number;

  @ApiProperty({
    description: 'País de residencia del usuario',
    example: 'Argentina',
    maxLength: 50,
  })
  @Column({
    type: 'varchar',
    length: 50,
  })
  country: string;

  @ApiProperty({
    description: 'Dirección del usuario',
    example: 'Av. Siempre Viva 742',
  })
  @Column({
    type: 'varchar',
  })
  address: string;

  @ApiProperty({
    description: 'Ciudad de residencia del usuario',
    example: 'Buenos Aires',
    maxLength: 50,
  })
  @Column({
    type: 'varchar',
    length: 50,
  })
  city: string;

  @ApiProperty({
    description: 'Indica si el usuario tiene permisos de administrador',
    example: false,
    default: false,
  })
  @Column({
    default: false,
  })
  isAdmin: boolean;

  @ApiHideProperty()
  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders: Orders[];
}
