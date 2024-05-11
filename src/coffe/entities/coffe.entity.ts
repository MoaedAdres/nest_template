import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity()
export class Coffe {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column()
  brand: string;
  @Column({ default: 0 })
  recomendation: number;
  @JoinTable({ name: 'coffes_flavors' })
  @ManyToMany(() => Flavor, (flavor) => flavor.coffes, { cascade: true })
  flavors: Flavor[];
}
