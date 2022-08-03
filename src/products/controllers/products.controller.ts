import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { ProductsService } from '../services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'create product' })
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Get()
  @ApiOperation({ summary: 'list products' })
  getAll() {
    return this.productService.getAll();
  }

  @Put()
  @ApiOperation({ summary: 'update product' })
  update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return this.productService.update(id, payload);
  }

  @Delete()
  @ApiOperation({ summary: 'delete product' })
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
