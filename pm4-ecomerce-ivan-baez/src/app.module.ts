import { MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ConfigModule } from '@nestjs/config';
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
    // ❌ Se eliminó la configuración de TypeORM para no usar base de datos
    UsersModule,
    ProductsModule, 
    AuthModule,
    CategoriesModule, 
    OrdersModule,
    FileUploadModule,
    JwtModule.register({
      global: true,
      secret : environment.JWT_SECRET,
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

// MODULO : Unidad Organizativa Principal de NestJS
// Responsabilidades:
// 1. AGRUPAR: Reunir controladores, servicios, provedores y otros módulos que trabajan juntos.
// 2. ENCAPSULAR: Limitar el alcance de lo que se exporta, solo pone lo necesario a disposición de otros módulos.
// 3. IMPORTAR DEPENDENCIAS: Puede importar otros módulos para reutilizar sus servicios o controladores.
// 4. REGISTRAR PROVEEDORES: Define qué servicios (providers) están disponibles dentro del módulo.
