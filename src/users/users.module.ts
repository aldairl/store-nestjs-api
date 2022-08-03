import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService],
  imports: [ProductsModule],
})
export class UsersModule {}
