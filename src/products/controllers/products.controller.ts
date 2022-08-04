import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import {
  CreateProductDto,
  QueryProductDto,
  UpdateProductDto,
} from '../dtos/products.dto';
import { ProductsService } from '../services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'create product' })
  create(@Body() payload: QueryProductDto, @Req() req) {
    const { userId } = req.user;
    const product: CreateProductDto = {
      ...payload,
      owner: userId,
    };
    return this.productService.create(product);
  }

  @Get()
  @ApiOperation({ summary: 'list products' })
  getAll() {
    return this.productService.getAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'update product' })
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
    @Req() req,
  ) {
    const { userId } = req.user;
    return await this.productService.update(id, payload, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete product' })
  delete(@Param('id', MongoIdPipe) id: string, @Req() req) {
    const { userId } = req.user;
    return this.productService.delete(id, userId);
  }
}
