import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.producModel.find().populate('owner', 'name email id');
  }

  async getProductByUser(userId: string) {
    const products = await this.producModel.find({ owner: userId });
    return products;
  }

  async update(id: string, payload: UpdateProductDto, ownerId: string) {
    const product = await this.producModel.findOne({ _id: id, owner: ownerId });

    if (!product) throw new NotFoundException(`Product ${id} not found`);

    const prodUpdate = await this.producModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );

    return prodUpdate.id;
  }

  async delete(id: string, ownerId: string) {
    const product = await this.producModel.findOne({ _id: id, owner: ownerId });
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    const prodDel = await this.producModel.findByIdAndDelete(id);
    return `Prodcut ${prodDel.id} delete successfully`;
  }
}
