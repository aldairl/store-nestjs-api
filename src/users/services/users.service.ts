import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';

@Injectable()
export class UsersService {
  create(payload: CreateUserDto) {
    return payload;
  }

  findOneByEmail(email: string) {
    return email;
  }

  update(id: string, payload: UpdateUserDto) {
    return payload;
  }
}
