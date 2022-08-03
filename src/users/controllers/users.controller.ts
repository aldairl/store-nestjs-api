import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'create user' })
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Get(':userId/products')
  @ApiOperation({ summary: 'list user products' })
  getProducts(@Param('userId') userId: string) {
    return this.userService.getProductsByUser(userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update product' })
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.userService.update(id, payload);
  }
}
