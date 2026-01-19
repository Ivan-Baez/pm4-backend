import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetails } from 'src/orders/entities/orderdetails.entity';
import { Orders } from 'src/orders/entities/orders.entity';
import { Products } from 'src/products/products.entity';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/orders.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private ormOrdersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private ormOrderDetailRepository: Repository<OrderDetails>,
    @InjectRepository(Users)
    private ormUsersRepository: Repository<Users>,
    @InjectRepository(Products)
    private ormProductsRepository: Repository<Products>,
  ) {}

  async getOrderById(id: string): Promise<Orders | string> {
    const order = await this.ormOrdersRepository.findOne({
      where: { id },
      relations: {
        orderDetails: true, // relación definida en Orders
        user: true,         // si quieres traer el usuario también
      },
    });

    if (!order) {
      return `Orden con id ${id} no encontrada`;
    }

    return order;
  }

  async addOrder(newOrderData: CreateOrderDto): Promise<Orders[] | string> {
    // 1. Desestructuramos la información recibida:
    const { userId, products } = newOrderData;

    // 2. Verificamos que exista el Usuario:
    const user = await this.ormUsersRepository.findOneBy({ id: userId });
    if (!user) {
      return `Usuario con id ${userId} no encontrado`;
    }

    // 3. Creamos la Orden:
    const order = new Orders();
    order.date = new Date();
    order.user = user;
    const newOrder = await this.ormOrdersRepository.save(order);

    // 4. Asociamos cada "id" recibido con el "Producto":
    const productsArray: Products[] = await Promise.all(
      products.map(async (element) => {
        const product = await this.ormProductsRepository.findOneBy({
          id: element.id,
        });

        if (!product) {
          throw new Error(`Producto con id ${element.id} no encontrado`);
        }

        // 5. Actualizamos el stock:
        await this.ormProductsRepository.update(
          { id: element.id },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    // 6. Calculamos el total de forma segura:
    const total = productsArray.reduce(
      (sum, product) => sum + Number(product.price),
      0,
    );

    // 7. Creamos "OrderDetail" y la insertamos en BBDD:
    const orderDetail = new OrderDetails();
    orderDetail.price = Number(total.toFixed(2));
    orderDetail.products = productsArray;
    orderDetail.order = newOrder;
    await this.ormOrderDetailRepository.save(orderDetail);

    // 8. Enviamos al cliente la compra con la info de productos:
    return await this.ormOrdersRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetails: true,
      },
    });
  }
}

