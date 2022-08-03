import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { LoginDto } from '../dtos/auth.dto';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === pass) {
      delete user.password;
      return user;
    }
    return null;
  }
}
