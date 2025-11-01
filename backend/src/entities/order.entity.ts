import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './user.entity'; import { OrderItem } from './order-item.entity';
import { ColumnNumericTransformer } from './column-numeric.transformer';
@Entity()
export class Order {
  @PrimaryGeneratedColumn() id: number;
  @ManyToOne(()=>User,(u)=>u.orders,{ eager:true }) @JoinColumn({ name:'userId' }) user: User;
  @Column() userId: number;
  @OneToMany(()=>OrderItem,(i)=>i.order,{ cascade:true, eager:true }) items: OrderItem[];
  @Column({ type:'numeric', precision:10, scale:2, transformer:new ColumnNumericTransformer() }) subtotal: number;
  @Column({ type: 'timestamptz', default: () => 'now()' }) createdAt: Date;
}
