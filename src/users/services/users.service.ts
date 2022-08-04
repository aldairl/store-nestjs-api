import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from 'src/products/services/products.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private productService: ProductsService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(payload: CreateUserDto) {
    const user = await this.findOneByEmail(payload.email);

    if (user) throw new BadRequestException('The user already exist');
    const userData = {
      ...payload,
      password: await bcrypt.hash(payload.password, 10),
    };
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  async update(id: string, payload: UpdateUserDto) {
    const dataToUp = { ...payload };

    if (payload.password) {
      dataToUp.password = await bcrypt.hash(payload.password, 10);
    }

    const user = this.userModel.findByIdAndUpdate(
      id,
      { $set: dataToUp },
      { new: true },
    );
    if (!user) throw new NotFoundException(`Product #${id} not found`);
    return user;
  }

  delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async getProductsByUser(userId: string) {
    const user = await this.findOne(userId);
    return {
      user,
      products: await this.productService.getProductByUser(userId),
    };
  }
}
