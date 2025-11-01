import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity'; import { Product } from './product.entity';
import { ColumnNumericTransformer } from './column-numeric.transformer';
@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn() id: number;
  @ManyToOne(()=>Order,(o)=>o.items) @JoinColumn({ name:'orderId' }) order: Order;
  @Column() orderId: number;
  @ManyToOne(()=>Product,(p)=>p.items,{ eager:true }) @JoinColumn({ name:'productId' }) product: Product;
  @Column() productId: number;
  @Column('int') qty: number;
  @Column({ type:'numeric', precision:10, scale:2, transformer:new ColumnNumericTransformer() }) price: number;
}
