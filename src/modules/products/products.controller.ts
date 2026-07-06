import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpException,
  HttpStatus,
  Req,
  // PipeTransform,
  // Inject,
  // BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
// import { REQUEST } from '@nestjs/core/router/request/request-constants';

// interface ProductInput {
//   id?: number;
//   name: string;
//   price: number;
//   description?: string;
// }

// export class ValidationPipe implements PipeTransform {
//   constructor(@Inject(REQUEST) private readonly request: Request) {}
//   transform(value: ProductInput) {
//     const id = this.request['params'].id;
//     const { name } = value;

//     if (name === 'iphone updated') {
//       throw new BadRequestException('Name cannot be "iphone updated"');
//     }
//     return { ...value, id: Number(id) };
//   }
// }

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get() // GET /products
  findAll(@Req() req: Request & { user: string }) {
    console.log('req.user:', req.user); // Log the user property added by the middleware
    return this.productsService.findAll();
  }

  @Get('/:id') // GET /products/:id
  async findOne(@Param('id') id: string) {
    const productId = Number(id);
    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  @Post() // POST /products
  create(@Body() productData: CreateProductDto) {
    return this.productsService.create(productData);
  }

  @Patch('/:id') // PATCH /products/:id
  update(@Body() productData: UpdateProductDto, @Param('id') id: number) {
    const productId = id;
    return this.productsService.update(productId, productData);
  }

  @Delete('/:id') // DELETE /products/:id
  async delete(@Param('id') id: number) {
    const productId = id;
    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return this.productsService.delete(productId);
  }
}
