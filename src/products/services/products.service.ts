import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  create(payload: CreateProductDto) {
    return payload;
  }

  getAll() {
    return 'all products';
  }

  getProductByUser(userId: string) {
    return userId;
  }

  update(id: string, payload: UpdateProductDto) {
    return { id, payload };
  }

  delete(id: string) {
    return id;
  }
}
