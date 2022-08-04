import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
  exports: [ProductsService],
})
export class ProductsModule {}
