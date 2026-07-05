import { IsString, IsNumber } from 'class-validator';

export default class UpdateProductDto {
  @IsString({ message: 'Name must be a string' })
  name?: string;
  @IsNumber({}, { message: 'Price must be a number' })
  price?: number;
  @IsString({ message: 'Description must be a string' })
  description?: string;
}
