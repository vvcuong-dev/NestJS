import { Injectable } from '@nestjs/common';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) // nghĩa là inject Product entity vào ProductService để sử dụng trong các phương thức của service
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: number): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }

  create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }
  async update(
    id: number,
    productData: Partial<Product>,
  ): Promise<Product | null> {
    await this.productRepository.update(id, productData);
    return this.productRepository.findOneBy({ id });
  }
  async delete(id: number) {
    const product = await this.productRepository.findOneBy({ id });

    await this.productRepository.delete(id);
    return product;
  }
}
