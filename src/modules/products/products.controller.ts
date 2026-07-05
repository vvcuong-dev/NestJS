import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get() // GET /products
  findAll() {
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
  create(@Body(new ValidationPipe()) productData: CreateProductDto) {
    return this.productsService.create(productData);
  }

  @Patch('/:id') // PATCH /products/:id
  update(
    @Body(new ValidationPipe()) productData: UpdateProductDto,
    @Param('id') id: string,
  ) {
    const productId = Number(id);
    return this.productsService.update(productId, productData);
  }

  @Delete('/:id') // DELETE /products/:id
  async delete(@Param('id') id: string) {
    const productId = Number(id);
    const product = await this.productsService.findOne(productId);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return this.productsService.delete(productId);
  }
}
