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

@Injectable()
export class UsersService {
  constructor(
    private productService: ProductsService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(payload: CreateUserDto) {
    const user = await this.findOneByEmail(payload.email);
    console.log(user);
    if (user) throw new BadRequestException('The user already exist');
    const newUser = new this.userModel(payload);
    return newUser.save();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  update(id: string, payload: UpdateUserDto) {
    const user = this.userModel.findByIdAndUpdate(
      id,
      { $set: payload },
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
