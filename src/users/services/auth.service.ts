import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/auth.dtos';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  login(payload: LoginDto) {
    const { password, email } = payload;
    const user = this.userService.findOneByEmail(email);
    console.log(password);
    return user;
  }
}
