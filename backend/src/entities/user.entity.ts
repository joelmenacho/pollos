import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order.entity';
export type Role = 'USER'|'ADMIN';
@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;
  @Column({ unique: true }) email: string;
  @Column() password: string;
  @Column() name: string;
  @Column({ type: 'varchar', default: 'USER' }) role: Role;
  @OneToMany(()=>Order,(o)=>o.user) orders: Order[];
  @Column({ type: 'timestamptz', default: () => 'now()' }) createdAt: Date;
}
