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
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('products')
@UseGuards(JwtAuthGuard) // Sử dụng JwtAuthGuard để bảo vệ tất cả các route trong ProductsController, chỉ cho phép truy cập khi người dùng đã được xác thực bằng JWT
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
