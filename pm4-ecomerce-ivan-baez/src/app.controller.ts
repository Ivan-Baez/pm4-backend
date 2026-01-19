import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

//* CONTROLADOR: Se encarga de interactuar con el exterior(cliente) y eventualmente de hacer validaciones.
//* Responsabilidades:
//* 1. Recibir solicitudes: Escucha rutas y métodos HTTP definidos.
//* 2. Validar y transformar datos (Opcionalmente) usa pipes o DTOs para asegurar que la entrada sea correcta.
//* 3. Llamar a los servicios: Deriva la lógica del negocio al servicio correspondiente.
//* 4. Devolver respuestas: Retorna el resultado al cliente (normalmente JSON).