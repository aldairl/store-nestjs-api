import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private producModel: Model<Product>) {}

  create(payload: CreateProductDto) {
    const newProd = new this.producModel(payload);
    return newProd.save();
  }

  getAll() {
    return this.producModel.find();
  }

  async getProductByUser(userId: string) {
    const products = await this.producModel.find({ owner: userId });
    return products;
  }

  update(id: string, payload: UpdateProductDto) {
    return { id, payload };
  }

  delete(id: string) {
    return id;
  }
}
