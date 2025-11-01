import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ColumnNumericTransformer } from './column-numeric.transformer';
import { OrderItem } from './order-item.entity';
@Entity()
export class Product {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column({ type: 'numeric', precision: 10, scale: 2, transformer: new ColumnNumericTransformer() }) price: number;
  @Column({ nullable: true }) description?: string;
  @Column({ nullable: true }) image?: string;
  @OneToMany(()=>OrderItem,(i)=>i.product) items: OrderItem[];
  @Column({ type: 'timestamptz', default: () => 'now()' }) createdAt: Date;
}
