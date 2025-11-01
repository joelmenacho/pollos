import { Injectable } from '@nestjs/common'; import { InjectRepository } from '@nestjs/typeorm'; import { In, Repository } from 'typeorm';
import { Order } from '../entities/order.entity'; import { OrderItem } from '../entities/order-item.entity'; import { Product } from '../entities/product.entity';
@Injectable() export class OrdersService {
  constructor(
    @InjectRepository(Order) private orders: Repository<Order>,
    @InjectRepository(OrderItem) private items: Repository<OrderItem>,
    @InjectRepository(Product) private products: Repository<Product>,
  ) {}
  async create(userId: number, items: { productId: number; qty: number }[]){
    const ids = items.map(i=>i.productId); const prods = await this.products.findBy({ id: In(ids) });
    const map = new Map(prods.map(p=>[p.id, p])); let subtotal = 0;
    const order = await this.orders.save(this.orders.create({ userId, subtotal: 0 }));
    const toCreate = items.map(i=>{ const p = map.get(i.productId)!; const price = Number(p.price); subtotal += price * i.qty; return this.items.create({ orderId: order.id, productId: p.id, qty: i.qty, price }); });
    await this.items.save(toCreate); order.subtotal = subtotal; return this.orders.save(order);
  }
  my(userId: number){ return this.orders.find({ where: { userId }, order: { createdAt: 'DESC' } }); }
}
