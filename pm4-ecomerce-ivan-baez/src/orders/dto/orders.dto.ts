
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { Products } from 'src/products/products.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  /**
   * Identificador único del usuario que realiza el pedido.
   * Debe ser un UUID v4 válido.
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  @ApiProperty({
    description: 'UUID v4 del usuario que realiza el pedido',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID(4, { message: 'Debe ser un uuid v4' })
  userId: string;

  /**
   * Lista de productos incluidos en el pedido.
   * Debe contener al menos un producto.
   * @example [{ "id": "123e4567-e89b-12d3-a456-426614174000", "quantity": 2 }]
   */
  @ApiProperty({
    description: 'Array de productos que forman parte del pedido',
    example: [
      { id: '123e4567-e89b-12d3-a456-426614174000', quantity: 2 },
      { id: '987e6543-e21b-12d3-a456-426614174999', quantity: 1 },
    ],
    type: [Products],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'Al menos un producto' })
  products: Partial<Products>[];
}


