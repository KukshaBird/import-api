import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ImportStatus } from '../dtos/import.dto';

@Entity('imports')
export class Import {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ImportStatus,
    default: ImportStatus.PENDING,
  })
  status: ImportStatus;

  @Column('varchar', { length: 100 })
  resource: string;

  @Column('simple-array', { default: [] })
  products: Array<number>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
