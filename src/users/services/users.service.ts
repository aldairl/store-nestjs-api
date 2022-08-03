import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';

@Injectable()
export class UsersService {
  constructor(private productService: ProductsService) {}

  create(payload: CreateUserDto) {
    return payload;
  }

  findOne(id: string) {
    return id;
  }

  findOneByEmail(email: string) {
    return email;
  }

  update(id: string, payload: UpdateUserDto) {
    return payload;
  }

  getProductsByUser(userId: string) {
    const user = this.findOne(userId);
    return {
      user,
      products: this.productService.getProductByUser(userId),
    };
  }
}
