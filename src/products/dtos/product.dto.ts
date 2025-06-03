import { Expose, Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsEmail,
  Min,
  Max,
  ArrayMinSize,
  IsUrl,
  IsNotEmpty,
} from 'class-validator';

class DimensionsDto {
  @IsNumber()
  @IsNotEmpty()
  width: number;

  @IsNumber()
  @IsNotEmpty()
  height: number;

  @IsNumber()
  @IsNotEmpty()
  depth: number;
}

class ReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  reviewerName: string;

  @IsEmail()
  reviewerEmail: string;
}

class MetaDto {
  @IsString()
  @IsNotEmpty()
  createdAt: string;

  @IsString()
  @IsNotEmpty()
  updatedAt: string;

  @IsString()
  @IsNotEmpty()
  barcode: string;

  @IsString()
  @IsNotEmpty()
  qrCode: string;
}

export class ProductDto {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  category: string;

  @Expose()
  @IsNumber()
  @Min(0)
  price: number;

  @Expose()
  @IsNumber()
  @Min(0)
  @Max(100)
  discountPercentage: number;

  @Expose()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @Expose()
  @IsNumber()
  @Min(0)
  stock: number;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @Expose()
  @IsString()
  @IsNotEmpty()
  brand: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  sku: string;

  @Expose()
  @IsNumber()
  @Min(0)
  weight: number;

  @Expose()
  @ValidateNested()
  @Type(() => DimensionsDto)
  dimensions: DimensionsDto;

  @Expose()
  @IsString()
  @IsNotEmpty()
  warrantyInformation: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  shippingInformation: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  availabilityStatus: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReviewDto)
  reviews: ReviewDto[];

  @Expose()
  @IsString()
  @IsNotEmpty()
  returnPolicy: string;

  @Expose()
  @IsNumber()
  @Min(1)
  minimumOrderQuantity: number;

  @Expose()
  @ValidateNested()
  @Type(() => MetaDto)
  meta: MetaDto;

  @Expose()
  @IsArray()
  @IsUrl({}, { each: true })
  @ArrayMinSize(0)
  images: string[];

  @Expose()
  @IsUrl()
  thumbnail: string;
}
