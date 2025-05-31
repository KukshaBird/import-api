import { Type } from 'class-transformer';
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
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  discountPercentage: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @Min(0)
  weight: number;

  @ValidateNested()
  @Type(() => DimensionsDto)
  dimensions: DimensionsDto;

  @IsString()
  @IsNotEmpty()
  warrantyInformation: string;

  @IsString()
  @IsNotEmpty()
  shippingInformation: string;

  @IsString()
  @IsNotEmpty()
  availabilityStatus: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReviewDto)
  reviews: ReviewDto[];

  @IsString()
  @IsNotEmpty()
  returnPolicy: string;

  @IsNumber()
  @Min(1)
  minimumOrderQuantity: number;

  @ValidateNested()
  @Type(() => MetaDto)
  meta: MetaDto;

  @IsArray()
  @IsUrl({}, { each: true })
  @ArrayMinSize(0)
  images: string[];

  @IsUrl()
  thumbnail: string;
}
