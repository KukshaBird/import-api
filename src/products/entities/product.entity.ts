import { Column, Entity, PrimaryColumn } from 'typeorm';

export interface IDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface IReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface IMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

@Entity('products')
export class Product {
  @PrimaryColumn('int')
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  category: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('decimal', { precision: 5, scale: 2 })
  discountPercentage: number;

  @Column('decimal', { precision: 3, scale: 2 })
  rating: number;

  @Column('int')
  stock: number;

  @Column('simple-array')
  tags: string[];

  @Column()
  brand: string;

  @Column()
  sku: string;

  @Column('int')
  weight: number;

  @Column('json')
  dimensions: IDimensions;

  @Column()
  warrantyInformation: string;

  @Column()
  shippingInformation: string;

  @Column()
  availabilityStatus: string;

  @Column('json')
  reviews: Array<IReview>;

  @Column()
  returnPolicy: string;

  @Column('int')
  minimumOrderQuantity: number;

  @Column('json')
  meta: IMeta;

  @Column('simple-array')
  images: string[];

  @Column()
  thumbnail: string;
}
