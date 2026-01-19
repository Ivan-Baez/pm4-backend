import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { environment } from './config/environment';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalPipes(new ValidationPipe({
   whitelist : true
  })
);

const config = new DocumentBuilder()
    .setTitle('Proyecto integrador M4-Back')
    .setDescription('Aplicacion desarrollada con  NestJS')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const PORT = environment.PORT; 
  const HOST = environment.HOST;

await app.listen(PORT);
console.log(`Servidor escuchando en http://${HOST}:${PORT}`);

}
bootstrap();
