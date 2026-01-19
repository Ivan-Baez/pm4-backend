import { MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesService } from './categories/categories.service';
import { ProductsService } from './products/products.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';
import { environment } from 'src/config/environment';



@Module({
  imports: [
    ConfigModule.forRoot({ 
    isGlobal:true,  
    envFilePath: '.env.development',
    }),
    //cargar archivos de tyoeorm.ts
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    //coneccion
    //configService
    TypeOrmModule.forRootAsync({
     inject: [ConfigService], 
     useFactory: (configService: ConfigService) =>
       configService.get('typeorm')!,
    }),
     UsersModule,
     ProductsModule, 
     AuthModule,
     CategoriesModule, 
     OrdersModule,
     FileUploadModule,
     JwtModule.register({
      global: true,
      secret :environment.JWT_SECRET,
      signOptions: {expiresIn: '60m'},
     })
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule, OnApplicationBootstrap {

 constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  
) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

 async onApplicationBootstrap() {
    await this.categoriesService.addCategories();
    console.log('Categorías agregadas...');
    await this.productsService.addProducts();
    console.log('Productos agregados...');
  }
}


//MODULO :Unidad Organizativa Principal  de   Nest JS
//Responsabilidades:
//1.AGRUPAR: Reunir controladores,servicios ,provedores y otros modulos que trabajan juntos.
//2.ENCAPSULAR: Limitar el  alcance  de  lo que se  exporta,solopone lo necesario a disposicion de otros modulos.
//3.IMPORTAR DEPENDECNCIAS: Puede importar otros modulos para reutilizar sus servicios o controladores.
//4.REGISTRAR PROVEDORES:Define queservicios(providers) estan disponibles dentro del modulo.