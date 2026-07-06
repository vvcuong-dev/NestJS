import { IsString, IsNumber, IsNotEmpty, Validate } from 'class-validator';
import { IsUpperCaseConstraint } from '../../../common/validators/product.validators';

export default class CreateProductDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @Validate(IsUpperCaseConstraint)
  name?: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @IsNotEmpty({ message: 'Price is required' })
  price?: number;

  @IsString({ message: 'Description must be a string' })
  description?: string;
}
