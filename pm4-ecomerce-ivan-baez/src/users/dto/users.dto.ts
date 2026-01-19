import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsNumber,
  IsNotEmpty,
  IsStrongPassword,
  IsEmpty,
  IsOptional,
  Validate,
} from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

export class CreateUserDto {
  /**
   * Debe tener un string entre 3 y 80 caracteres
   * @example 'Skiner'
   */
  @ApiProperty({ example: 'Skiner', description: 'Nombre completo del usuario' })
  @IsNotEmpty({ message: 'Nombre no puede estar vacío' })
  @IsString({ message: 'Nombre debe ser un string' })
  @MinLength(3, { message: 'Nombre de al menos 3 caracteres' })
  @MaxLength(80, { message: 'Nombre de máximo 80 caracteres' })
  name: string;

  /**
   * Debe ser un email válido
   * @example 'Skiner@gmail.com'
   */
  @ApiProperty({ example: 'Skiner@gmail.com', description: 'Correo electrónico válido' })
  @IsNotEmpty({ message: 'Email no puede estar vacío' })
  @IsEmail({}, { message: 'Debe ser un email válido' })
  email: string;

  /**
   * La contraseña debe tener una minúscula, una mayúscula, un número y un símbolo
   * @example 'aaBB33##'
   */
  @ApiProperty({
    example: 'aaBB33##',
    description:
      'Contraseña con al menos una minúscula, una mayúscula, un número y un símbolo',
  })
  @IsNotEmpty({ message: 'Contraseña no puede estar vacía' })
  @IsString({ message: 'Contraseña debe ser un string' })
  @IsStrongPassword(
    {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Contraseña debe tener una minúscula, una mayúscula, un número y un símbolo: !@#$%^&*',
    },
  )
  password: string;

  /**
   * Debe ser igual al password
   * @example 'aaBB33##'
   */
  @ApiProperty({ example: 'aaBB33##', description: 'Confirmación de la contraseña' })
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
   * Debe ser un número
   * @example 11112222
   */
  @ApiProperty({ example: 11112222, description: 'Teléfono del usuario' })
  @IsNotEmpty({ message: 'Teléfono no puede estar vacío' })
  @IsNumber()
  phone: number;

  /**
   * Dirección del usuario
   * @example 'New Street 1234'
   */
  @ApiProperty({ example: 'New Street 1234', description: 'Dirección del usuario' })
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * Ciudad del usuario
   * @example 'Springfield'
   */
  @ApiProperty({ example: 'Springfield', description: 'Ciudad del usuario' })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  /**
   * País del usuario
   * @example 'EEUU'
   */
  @ApiProperty({ example: 'Estados Unidos', description: 'País del usuario' })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  /**
   * Campo oculto. No debe ser modificado por el usuario.
   */
  @ApiHideProperty()
  @IsEmpty()
  isAdmin?: boolean;
}

export class UpdateUserDto {
  /**
   * Campo oculto. No debe ser modificado por el usuario.
   * @example 'skiner@gmail.com'
   */
  @ApiHideProperty()
  @IsEmpty()
  email: string;

  /**
   * Dirección actualizada del usuario. Debe tener entre 3 y 80 caracteres.
   * @example 'New Street 1234'
   */
  @ApiProperty({ example: 'New Street 1234', description: 'Dirección del usuario' })
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * Ciudad actualizada del usuario. Opcional.
   * @example 'Springfield'
   */
  @ApiProperty({ example: 'Springfield', description: 'Ciudad del usuario', required: false })
  @IsOptional()
  city: string;

  /**
   * País actualizado del usuario. Opcional.
   * @example 'EEUU'
   */
  @ApiProperty({ example: 'EEUU', description: 'País del usuario', required: false })
  @IsOptional()
  country: string;

  /**
   * Campo oculto. No debe ser modificado por el usuario.
   * @example false
   */
  @ApiHideProperty()
  @IsEmpty()
  isAdmin: boolean;
}

export class LoginUserDto extends PickType(CreateUserDto, ['email', 'password']) {
  /**
   * Email del usuario para iniciar sesión.
   * @example 'skiner@gmail.com'
   */
  @ApiProperty({ example: 'skiner@gmail.com', description: 'Email del usuario' })
  email: string;

  /**
   * Contraseña del usuario para iniciar sesión.
   * @example 'aaBB33##'
   */
  @ApiProperty({
    example: 'aaBB33##',
    description: 'Contraseña del usuario. Debe tener una minúscula, una mayúscula, un número y un símbolo.',
  })
  password: string;
}
