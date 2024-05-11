import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coffe } from './coffe.entity';

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToMany(() => Coffe, (coffe) => coffe.flavors)
  coffes: Coffe[];
}
